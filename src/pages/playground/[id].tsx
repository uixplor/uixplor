"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import PageSEO from "@/components/seo/PageSEO";
import type { SandpackFile } from "@codesandbox/sandpack-react";
import PageBackground from "@/components/ui/PageBackground";

// ─── Sandpack dynamic imports ─────────────────────────────────────────────────

const SandpackProvider = dynamic(
  () => import("@codesandbox/sandpack-react").then((m) => m.SandpackProvider),
  { ssr: false },
);
const SandpackLayout = dynamic(
  () => import("@codesandbox/sandpack-react").then((m) => m.SandpackLayout),
  { ssr: false },
);
const SandpackCodeEditor = dynamic(
  () => import("@codesandbox/sandpack-react").then((m) => m.SandpackCodeEditor),
  { ssr: false },
);
const SandpackPreview = dynamic(
  () => import("@codesandbox/sandpack-react").then((m) => m.SandpackPreview),
  { ssr: false },
);

// ─── Framework conversion helpers ────────────────────────────────────────────

function extractClassName(css: string): string {
  const match = css.match(/^\s*\.([a-zA-Z0-9_-]+)/m);
  return match ? match[1] : "component";
}

function buildHtmlElement(className: string, name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("button") || lower.includes("btn"))
    return `<button class="${className}">${name}</button>`;
  if (lower.includes("input"))
    return `<input class="${className}" placeholder="Enter text..." />`;
  if (lower.includes("badge") || lower.includes("tag"))
    return `<span class="${className}">${name}</span>`;
  if (lower.includes("card"))
    return `<div class="${className}">\n  <h3>Card Title</h3>\n  <p>Card content goes here.</p>\n</div>`;
  if (lower.includes("loader") || lower.includes("spinner"))
    return `<div class="${className}"></div>`;
  return `<div class="${className}">${name}</div>`;
}

function buildHtmlFile(css: string, className: string, name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${name}</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  ${buildHtmlElement(className, name)}
</body>
</html>`;
}

function buildReactFile(css: string, className: string, name: string): string {
  const pascal = name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  const el = buildHtmlElement(className, name).replace(/class=/g, "className=");
  return `import React from 'react';
import './styles.css';

export function ${pascal}() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0D0D0D' }}>
      ${el}
    </div>
  );
}

export default ${pascal};`;
}

function buildNextjsFile(css: string, className: string, name: string): string {
  const pascal = name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  const el = buildHtmlElement(className, name).replace(
    new RegExp(`class="${className}"`, "g"),
    `className={styles.${className}}`,
  );
  return `'use client';
import styles from './Component.module.css';

export default function ${pascal}() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0D0D0D' }}>
      ${el}
    </div>
  );
}`;
}

// ─── Framework selector ───────────────────────────────────────────────────────

type Framework = "html" | "react" | "nextjs";

const FRAMEWORKS: {
  key: Framework;
  label: string;
  color: string;
  template: "static" | "react";
}[] = [
  { key: "html", label: "HTML + CSS", color: "#f97316", template: "static" },
  { key: "react", label: "React", color: "#38bdf8", template: "react" },
  { key: "nextjs", label: "Next.js", color: "#e5e5e5", template: "react" },
];

// ─── Sandpack theme ───────────────────────────────────────────────────────────

const SANDPACK_THEME = {
  colors: {
    surface1: "#0f0f15",
    surface2: "#16161e",
    surface3: "#1c1c26",
    clickable: "rgba(255,255,255,0.4)",
    base: "rgba(255,255,255,0.8)",
    disabled: "rgba(255,255,255,0.2)",
    hover: "rgba(108,99,255,0.15)",
    accent: "#6C63FF",
    error: "#ff5555",
    errorSurface: "rgba(255,85,85,0.1)",
  },
  syntax: {
    plain: "#e2e8f0",
    comment: { color: "#718096", fontStyle: "italic" as const },
    keyword: "#a78bfa",
    tag: "#f472b6",
    punctuation: "#64748b",
    definition: "#60a5fa",
    property: "#34d399",
    static: "#fbbf24",
    string: "#f59e0b",
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "JetBrains Mono", monospace',
    size: "13px",
    lineHeight: "1.65",
  },
};

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComponentPlayground() {
  const router = useRouter();
  const {
    collection,
    id,
    name: rawName,
    css: rawCss,
  } = router.query as Record<string, string | undefined>;

  const [activeFramework, setActiveFramework] = useState<Framework>("html");
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [componentName, setComponentName] = useState<string>("Component");
  const [componentCss, setComponentCss] = useState<string>(
    "/* Add your CSS here */",
  );
  const [sandpackKey, setSandpackKey] = useState(0);

  // Parse component data from URL query params or load from JSON
  useEffect(() => {
    const loadFromParams = async () => {
      // URL se ID aur Collection milne par JSON se data uthayega
      if (id && collection) {
        try {
          const data = await import(`../../../data/${collection}.json`);
          const items = Array.isArray(data.default)
            ? data.default
            : data.default.components || [];
          const found = items.find((c: any) => String(c.id) === String(id));

          if (found) {
            setComponentName(found.name);
            setComponentCss(found.css);
          }
        } catch (err) {
          console.error("Playground fetch error:", err);
        } finally {
          setIsLoaded(true);
        }
      } else {
        // Agar ID nahi hai toh purane params check karega
        if (rawName) setComponentName(rawName);
        if (rawCss) setComponentCss(rawCss);
        setIsLoaded(true);
      }
    };

    if (router.isReady) loadFromParams();
  }, [router.isReady, id, collection, rawName, rawCss]);

  // Reset Sandpack on framework change
  useEffect(() => {
    setSandpackKey((k) => k + 1);
  }, [activeFramework, componentCss]);

  const className = extractClassName(componentCss);

  const buildFiles = useCallback(
    (fw: Framework): Record<string, SandpackFile> => {
      switch (fw) {
        case "html":
          return {
            "/index.html": {
              code: buildHtmlFile(componentCss, className, componentName),
              active: false,
            },
            "/styles.css": { code: componentCss, active: true },
          };
        case "react":
          return {
            "/App.js": {
              code: buildReactFile(componentCss, className, componentName),
              active: true,
            },
            "/styles.css": { code: componentCss, active: false },
          };
        case "nextjs":
          return {
            "/App.js": {
              code: buildNextjsFile(componentCss, className, componentName),
              active: true,
            },
            "/Component.module.css": { code: componentCss, active: false },
          };
        default:
          return { "/styles.css": { code: componentCss, active: true } };
      }
    },
    [componentCss, className, componentName],
  );

  const getFullCode = useCallback(() => {
    const files = buildFiles(activeFramework);
    return Object.entries(files)
      .map(([path, f]) => `/* ${path} */\n${f.code}`)
      .join("\n\n");
  }, [buildFiles, activeFramework]);

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([getFullCode()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${componentName.replace(/\s+/g, "_")}_${activeFramework}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Playground link copied to clipboard!");
    });
  };

  const sandpackTemplate =
    FRAMEWORKS.find((f) => f.key === activeFramework)?.template ?? "static";
  const files = buildFiles(activeFramework);

  const detailHref =
    id && collection
      ? `/component/${id}?collection=${collection}`
      : "/collections";

  return (
    <>
      <PageSEO
        title={`${componentName} Playground — UIXplor`}
        description={`Edit ${componentName} live in the browser. Switch between HTML, React, and Next.js. Copy, download or share your code.`}
        path="/playground"
        keywords={[
          "component playground",
          "live CSS editor",
          "React playground",
          componentName,
        ]}
      />

      <main className="min-h-screen relative" style={{ background: "#0D0D0D" }}>
        <PageBackground accentColor="108,99,255" />
        {/* Header */}
        <div className="border-b pt-20" style={{ borderColor: "#2A2A2A" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Left: breadcrumb + title */}
            <div>
              <nav className="flex items-center gap-1.5 text-[10px] text-white/30 mb-1">
                <Link
                  href="/collections"
                  className="hover:text-white/50 transition-colors"
                >
                  Collections
                </Link>
                <span>/</span>
                {id && collection && (
                  <>
                    <Link
                      href={detailHref}
                      className="hover:text-white/50 transition-colors"
                    >
                      {componentName}
                    </Link>
                    <span>/</span>
                  </>
                )}
                <span className="text-[#6C63FF]">Playground</span>
              </nav>
              <h1 className="text-base font-bold text-white flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="text-[#6C63FF]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                {componentName}
                <span className="text-white/25 font-normal text-xs">
                  — Playground
                </span>
              </h1>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border"
                style={{
                  background: copied
                    ? "rgba(108,99,255,0.15)"
                    : "rgba(255,255,255,0.05)",
                  borderColor: copied ? "#6C63FF" : "#2A2A2A",
                  color: copied ? "#a78bfa" : "rgba(255,255,255,0.6)",
                }}
              >
                {copied ? (
                  "✓ Copied!"
                ) : (
                  <>
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "#2A2A2A",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "#2A2A2A",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share
              </button>
              {id && collection && (
                <Link
                  href={detailHref}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all"
                  style={{
                    background: "rgba(108,99,255,0.08)",
                    borderColor: "rgba(108,99,255,0.3)",
                    color: "#a78bfa",
                  }}
                >
                  View Details
                </Link>
              )}
            </div>
          </div>

          {/* Framework selector */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 mr-1">
              Framework:
            </span>
            {FRAMEWORKS.map((fw) => (
              <button
                key={fw.key}
                onClick={() => setActiveFramework(fw.key)}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border"
                style={{
                  background:
                    activeFramework === fw.key
                      ? `${fw.color}18`
                      : "rgba(255,255,255,0.03)",
                  borderColor:
                    activeFramework === fw.key ? fw.color : "#2A2A2A",
                  color:
                    activeFramework === fw.key
                      ? fw.color
                      : "rgba(255,255,255,0.4)",
                }}
              >
                {fw.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sandpack Editor */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <SandpackProvider
            key={`${sandpackKey}-${activeFramework}`}
            template={sandpackTemplate}
            files={files}
            theme={SANDPACK_THEME}
          >
            <SandpackLayout
              style={{
                borderRadius: "16px",
                border: "1px solid #2A2A2A",
                minHeight: "580px",
              }}
            >
              <SandpackCodeEditor
                showLineNumbers
                showInlineErrors
                wrapContent
                style={{ height: "580px", flex: 1 }}
              />
              <SandpackPreview
                showNavigator={false}
                showOpenInCodeSandbox={false}
                style={{ height: "580px", flex: 1 }}
              />
            </SandpackLayout>
          </SandpackProvider>

          <p className="text-center text-white/20 text-xs mt-4">
            Edit the CSS or component file — changes reflect live in the preview
            panel →
          </p>
        </div>

        {/* Bottom CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div
            className="rounded-xl border p-6 flex items-center justify-between gap-4 flex-wrap"
            style={{
              background: "rgba(108,99,255,0.05)",
              borderColor: "rgba(108,99,255,0.2)",
            }}
          >
            <div>
              <h2 className="text-base font-bold text-white">
                Explore more components
              </h2>
              <p className="text-white/35 text-xs mt-0.5">
                Browse 200+ curated UI elements
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/collections"
                className="px-4 py-2 rounded-lg text-xs font-bold text-white transition-all"
                style={{ background: "#6C63FF" }}
              >
                Browse Collections →
              </Link>
              <Link
                href="/playground"
                className="px-4 py-2 rounded-lg text-xs font-semibold border transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "#2A2A2A",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Generic Playground
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
