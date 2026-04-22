"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "motion/react";
import PageSEO from "@/components/seo/PageSEO";
import PageBackground from "@/components/ui/PageBackground";

// ─── Type definitions ───────────────────────────────────────────────────────

type Framework = "html" | "react" | "nextjs" | "angular";

interface ComponentData {
  id: number | string;
  name: string;
  css: string;
  category?: string;
  html?: string;
  description?: string;
}

// ─── Helpers: code generation ────────────────────────────────────────────────

/** Extract the CSS class name used in a CSS snippet */
function extractClassName(css: string): string {
  const match = css.match(/^\s*\.([a-zA-Z0-9_-]+)/m);
  return match ? match[1] : "component";
}

/** Convert CSS class-based html to use standard class attribute */
function buildDefaultHTML(className: string, componentName: string): string {
  const lower = componentName.toLowerCase();
  if (lower.includes("button") || lower.includes("btn")) {
    return `<button class="${className}">${componentName}</button>`;
  }
  if (lower.includes("input")) {
    return `<input class="${className}" placeholder="Enter text..." />`;
  }
  if (lower.includes("badge") || lower.includes("tag")) {
    return `<span class="${className}">${componentName}</span>`;
  }
  if (lower.includes("card")) {
    return `<div class="${className}">\n  <h3>Card Title</h3>\n  <p>Card content goes here.</p>\n</div>`;
  }
  if (lower.includes("loader") || lower.includes("spinner")) {
    return `<div class="${className}"></div>`;
  }
  return `<div class="${className}">${componentName}</div>`;
}

/** Build the full HTML+CSS output */
function buildHtmlCode(
  css: string,
  className: string,
  componentName: string,
): string {
  const htmlEl = buildDefaultHTML(className, componentName);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${componentName}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #0D0D0D;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    ${css}
  </style>
</head>
<body>
  ${htmlEl}
</body>
</html>`;
}

/** Convert CSS class names to JSX className and wrap in React component */
function buildReactCode(
  css: string,
  className: string,
  componentName: string,
): string {
  const pascalName = componentName
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const htmlEl = buildDefaultHTML(className, componentName).replace(
    /class=/g,
    "className=",
  );

  return `import React from 'react';
import './${pascalName}.css';

export default function ${pascalName}() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0D0D0D' }}>
      ${htmlEl}
    </div>
  );
}`;
}

function buildReactCss(css: string): string {
  return `/* ${css.match(/^\s*\.([a-zA-Z0-9_-]+)/m)?.[1] ?? "component"}.css */
${css}`;
}

/** Next.js version (same as React but with module.css approach) */
function buildNextjsCode(
  css: string,
  className: string,
  componentName: string,
): string {
  const pascalName = componentName
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  const htmlEl = buildDefaultHTML(className, componentName).replace(
    new RegExp(`class="${className}"`, "g"),
    `className={styles.${className}}`,
  );

  return `import styles from './${pascalName}.module.css';

export default function ${pascalName}() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0D0D0D' }}>
      ${htmlEl}
    </div>
  );
}`;
}

function buildNextjsCss(css: string, className: string): string {
  // Convert .button-1 { ... } to .button-1 { ... } (unchanged, CSS Modules use same syntax)
  return `/* ${className}.module.css */
${css}`;
}

/** Angular component stubs */
function buildAngularTs(className: string, componentName: string): string {
  const tagName = className.replace(/_/g, "-");
  const pascalName = componentName
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  return `import { Component } from '@angular/core';

@Component({
  selector: 'app-${tagName}',
  templateUrl: './${tagName}.component.html',
  styleUrls: ['./${tagName}.component.css']
})
export class ${pascalName}Component {}`;
}

function buildAngularHtml(className: string, componentName: string): string {
  return buildDefaultHTML(className, componentName).replace(
    new RegExp(`class="${className}"`, "g"),
    `class="${className}"`,
  );
}

// ─── Project structure trees ─────────────────────────────────────────────────

const PROJECT_STRUCTURES: Record<
  Framework,
  (name: string, className: string) => string[][]
> = {
  html: (name) => [
    ["📁", "project/"],
    ["  📄", "index.html"],
    ["  📄", "styles.css"],
  ],
  react: (name, className) => {
    const pascal = name
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
    return [
      ["📁", "src/"],
      ["  📁", "components/"],
      ["    📄", `${pascal}.jsx`],
      ["    📄", `${pascal}.css`],
      ["  📄", "App.jsx"],
    ];
  },
  nextjs: (name, className) => {
    const pascal = name
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
    return [
      ["📁", "app/"],
      ["  📁", "components/"],
      ["    📄", `${pascal}.tsx`],
      ["    📄", `${pascal}.module.css`],
      ["  📄", "page.tsx"],
    ];
  },
  angular: (name, className) => {
    const tag = className.replace(/_/g, "-");
    return [
      ["📁", "src/"],
      ["  📁", "app/"],
      ["    📁", "components/"],
      ["      📄", `${tag}.component.ts`],
      ["      📄", `${tag}.component.html`],
      ["      📄", `${tag}.component.css`],
    ];
  },
};

// ─── Mini syntax highlighter ─────────────────────────────────────────────────

function highlight(
  code: string,
  lang: "html" | "css" | "jsx" | "ts",
): React.ReactNode[] {
  // Simple token-based coloring
  const lines = code.split("\n");
  return lines.map((line, i) => {
    // CSS property coloring
    const parts = line.split(
      /(\s*\/\*.*?\*\/|"[^"]*"|'[^']*'|<[^>]+>|:[a-zA-Z-]+(?=\s*{)|#[0-9a-fA-F]{3,6}(?=[;\s,])|rgba?\([^)]+\)|[a-z-]+(?=\s*:(?!:))|\b(import|export|default|from|return|const|let|var|function|class|interface|type|extends|implements|if|for|while)\b|\b(className|style|href|src|alt|onClick|onChange|type|value|placeholder)\b)/g,
    );
    return (
      <div key={i}>
        {parts.map((part, j) => {
          if (!part) return null;
          if (part.startsWith("/*") || part.startsWith("//"))
            return (
              <span key={j} style={{ color: "#6b7280", fontStyle: "italic" }}>
                {part}
              </span>
            );
          if (/^".*"$|^'.*'$/.test(part))
            return (
              <span key={j} style={{ color: "#fbbf24" }}>
                {part}
              </span>
            );
          if (/^<[^>]+>$/.test(part))
            return (
              <span key={j} style={{ color: "#f472b6" }}>
                {part}
              </span>
            );
          if (/^#[0-9a-fA-F]{3,6}$/.test(part.trim()))
            return (
              <span key={j} style={{ color: "#34d399" }}>
                {part}
              </span>
            );
          if (/^rgba?\(/.test(part.trim()))
            return (
              <span key={j} style={{ color: "#34d399" }}>
                {part}
              </span>
            );
          if (
            /^(import|export|default|from|return|const|let|var|function|class|interface|type|extends|implements|if|for|while)$/.test(
              part.trim(),
            )
          )
            return (
              <span key={j} style={{ color: "#a78bfa" }}>
                {part}
              </span>
            );
          if (
            /^(className|style|href|src|alt|onClick|onChange|type|value|placeholder)$/.test(
              part.trim(),
            )
          )
            return (
              <span key={j} style={{ color: "#38bdf8" }}>
                {part}
              </span>
            );
          if (
            /^[a-z-]+$/.test(part.trim()) &&
            line.includes(":") &&
            !line.trim().startsWith("<")
          )
            return (
              <span key={j} style={{ color: "#60a5fa" }}>
                {part}
              </span>
            );
          return (
            <span key={j} style={{ color: "rgba(255,255,255,0.75)" }}>
              {part}
            </span>
          );
        })}
      </div>
    );
  });
}

// ─── CodeBlock component ─────────────────────────────────────────────────────

function CodeBlock({
  code,
  lang,
  label,
}: {
  code: string;
  lang: "html" | "css" | "jsx" | "ts";
  label: string;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const lines = code.split("\n");
  const showExpand = lines.length > 20;

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{ background: "#0a0a0f", borderColor: "#2A2A2A" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "#2A2A2A", background: "#111118" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "#6C63FF" }}
          >
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {showExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-[10px] px-2 py-1 rounded font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          )}
          <button
            onClick={() => {
              navigator.clipboard.writeText(code).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
            className="text-[10px] px-2.5 py-1 rounded-lg font-semibold transition-all"
            style={{
              background: copied
                ? "rgba(108,99,255,0.15)"
                : "rgba(255,255,255,0.06)",
              color: copied ? "#a78bfa" : "rgba(255,255,255,0.45)",
              border: `1px solid ${copied ? "rgba(108,99,255,0.4)" : "#2A2A2A"}`,
            }}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      </div>
      {/* Code */}
      <div
        className="overflow-x-auto overflow-y-auto"
        style={{
          maxHeight: expanded || !showExpand ? "600px" : "340px",
          transition: "max-height 0.3s ease",
        }}
      >
        <pre className="p-4 text-[12px] leading-6 font-mono">
          <code>{highlight(code, lang)}</code>
        </pre>
      </div>
    </div>
  );
}

// ─── Framework tab content ────────────────────────────────────────────────────

function FrameworkContent({
  framework,
  component,
}: {
  framework: Framework;
  component: ComponentData;
}) {
  const className = extractClassName(component.css);
  const name = component.name;

  const files = useMemo(() => {
    switch (framework) {
      case "html":
        return [
          {
            label: "index.html",
            code: buildHtmlCode(component.css, className, name),
            lang: "html" as const,
          },
          { label: "styles.css", code: component.css, lang: "css" as const },
        ];
      case "react":
        return [
          {
            label: `${name.replace(/\s+/g, "")}.jsx`,
            code: buildReactCode(component.css, className, name),
            lang: "jsx" as const,
          },
          {
            label: `${name.replace(/\s+/g, "")}.css`,
            code: buildReactCss(component.css),
            lang: "css" as const,
          },
        ];
      case "nextjs":
        return [
          {
            label: `${name.replace(/\s+/g, "")}.tsx`,
            code: buildNextjsCode(component.css, className, name),
            lang: "jsx" as const,
          },
          {
            label: `${name.replace(/\s+/g, "")}.module.css`,
            code: buildNextjsCss(component.css, className),
            lang: "css" as const,
          },
        ];
      case "angular":
        return [
          {
            label: `${className}.component.ts`,
            code: buildAngularTs(className, name),
            lang: "ts" as const,
          },
          {
            label: `${className}.component.html`,
            code: buildAngularHtml(className, name),
            lang: "html" as const,
          },
          {
            label: `${className}.component.css`,
            code: component.css,
            lang: "css" as const,
          },
        ];
    }
  }, [framework, component, className, name]);

  const structure = PROJECT_STRUCTURES[framework](name, className);

  const frameworkColors: Record<Framework, string> = {
    html: "#f97316",
    react: "#38bdf8",
    nextjs: "#ffffff",
    angular: "#ef4444",
  };

  return (
    <motion.div
      key={framework}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      {/* File tree */}
      <div
        className="md:col-span-1 rounded-xl border p-4 h-fit"
        style={{ background: "rgba(255,255,255,0.02)", borderColor: "#2A2A2A" }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3"
          style={{ color: frameworkColors[framework] }}
        >
          Project Structure
        </p>
        <div className="space-y-1.5">
          {structure.map(([icon, file], i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs whitespace-pre">{icon}</span>
              <span
                className="text-[12px] font-mono"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {file}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code blocks */}
      <div className="md:col-span-3 space-y-4">
        {files.map((file) => (
          <CodeBlock
            key={file.label}
            code={file.code}
            lang={file.lang}
            label={file.label}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const FRAMEWORK_TABS: { key: Framework; label: string; badge?: string }[] = [
  { key: "html", label: "HTML + CSS" },
  { key: "react", label: "React", badge: "JSX" },
  { key: "nextjs", label: "Next.js", badge: "TSX" },
  { key: "angular", label: "Angular", badge: "TS" },
];

const FRAMEWORK_COLORS: Record<Framework, string> = {
  html: "#f97316",
  react: "#38bdf8",
  nextjs: "#e5e5e5",
  angular: "#ef4444",
};

export default function ComponentDetailPage() {
  const router = useRouter();
  const {
    id,
    collection,
    name: rawName,
    css: rawCss,
    category: rawCategory,
    html: rawHtml,
  } = router.query as Record<string, string | undefined>;

  const [component, setComponent] = useState<ComponentData | null>(null);
  const [activeFramework, setActiveFramework] = useState<Framework>("html");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load component data — either from URL query params (inline collections) or JSON files
  useEffect(() => {
    if (!id) return;

    const loadComponent = async () => {
      try {
        const collectionName = collection || "gradients";

        const data = await import(`../../../data/${collectionName}.json`);
        const components = Array.isArray(data.default)
          ? data.default
          : data.default.components || [];

        const found = components.find(
          (c: ComponentData) => String(c.id) === String(id),
        );

        if (found) {
          setComponent(found);
        }
      } catch (err) {
        console.error("Data Error", err);
      } finally {
        setIsLoaded(true);
      }
    };

    loadComponent();
  }, [id, collection]);

  if (!isLoaded) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0D0D0D" }}
      >
        <div className="text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#6C63FF] border-t-transparent animate-spin mx-auto" />
          <p className="text-white/30 text-sm">Loading component…</p>
        </div>
      </main>
    );
  }

  if (!component) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0D0D0D" }}
      >
        <div className="text-center space-y-4">
          <p className="text-white/40 text-lg">Component not found</p>
          <Link
            href="/collections"
            className="text-[#6C63FF] text-sm hover:underline"
          >
            ← Back to Collections
          </Link>
        </div>
      </main>
    );
  }

  const className = extractClassName(component.css);
  const previewSrcdoc = `<!DOCTYPE html><html><head><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0D0D0D; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  ${component.css}
</style></head><body>${buildDefaultHTML(className, component.name)}</body></html>`;

  // Playground URL - use the dedicated playground page with CSS preloaded in URL params
  const playgroundUrl = `/playground?collection=${encodeURIComponent(collection || "buttons")}&id=${encodeURIComponent(id || "")}&name=${encodeURIComponent(component.name)}&css=${encodeURIComponent(component.css)}`;
  const collectionHref = `/collections/${collection || "buttons"}`;

  return (
    <>
      <PageSEO
        title={`${component.name} — Component — UIXplor`}
        description={`${component.name} — copy the CSS, React, Next.js, or Angular code. Open in the live playground to edit and preview instantly.`}
        path={`/component/${id}`}
        keywords={[
          component.name,
          component.category || "",
          "UI component",
          "CSS",
          "React component",
          "copy paste",
        ]}
      />

      <main className="min-h-screen relative" style={{ background: "#0D0D0D" }}>
        <PageBackground accentColor="108,99,255" />
        {/* Breadcrumb */}
        <div className="container px-4 sm:px-6 pt-24 pb-3">
          <nav className="flex items-center gap-2 text-xs text-white/35">
            <Link
              href="/collections"
              className="hover:text-white/60 transition-colors"
            >
              Collections
            </Link>
            <span>/</span>
            <Link
              href={collectionHref}
              className="hover:text-white/60 transition-colors capitalize"
            >
              {collection || "Buttons"}
            </Link>
            <span>/</span>
            <span className="text-white/60">{component.name}</span>
          </nav>
        </div>

        <div className="container px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Top area: preview + info */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
              {/* Left: info */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      {component.category && (
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2 inline-block"
                          style={{
                            background: "rgba(108,99,255,0.1)",
                            color: "#6C63FF",
                            border: "1px solid rgba(108,99,255,0.25)",
                          }}
                        >
                          {component.category}
                        </span>
                      )}
                      <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                        {component.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {component.description ||
                      `A production-ready ${component.name.toLowerCase()} component with clean CSS. Copy the code in your preferred framework — HTML, React, Next.js, or Angular.`}
                  </p>

                  {/* Metadata pills */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {(
                      ["html", "react", "nextjs", "angular"] as Framework[]
                    ).map((fw) => (
                      <span
                        key={fw}
                        className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: `${FRAMEWORK_COLORS[fw]}12`,
                          color: FRAMEWORK_COLORS[fw],
                          border: `1px solid ${FRAMEWORK_COLORS[fw]}25`,
                        }}
                      >
                        {fw === "nextjs"
                          ? "Next.js"
                          : fw.charAt(0).toUpperCase() + fw.slice(1)}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 mt-auto">
                  <Link
                    href={playgroundUrl}
                    className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all duration-200"
                    style={{ background: "#6C63FF", color: "#fff" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    Open in Playground
                  </Link>
                  <Link
                    href={collectionHref}
                    className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl text-sm font-semibold transition-all duration-200 border"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "#2A2A2A",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    ← Back to collection
                  </Link>
                </div>
              </div>

              {/* Right: live preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:col-span-3 rounded-2xl overflow-hidden border"
                style={{
                  background: "#0a0a12",
                  borderColor: "#2A2A2A",
                  minHeight: "260px",
                }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ borderColor: "#2A2A2A", background: "#111118" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Live Preview
                  </span>
                </div>
                <iframe
                  srcDoc={previewSrcdoc}
                  title={`${component.name} preview`}
                  className="w-full border-0"
                  style={{ height: "260px", pointerEvents: "none" }}
                  sandbox="allow-scripts"
                  scrolling="no"
                />
              </motion.div>
            </div>

            {/* Framework tabs */}
            <div>
              <div
                className="flex items-center gap-1 flex-wrap mb-5 border-b pb-1"
                style={{ borderColor: "#2A2A2A" }}
              >
                {FRAMEWORK_TABS.map((tab) => {
                  const isActive = activeFramework === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveFramework(tab.key)}
                      className="relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-all duration-200 rounded-t-lg"
                      style={{
                        color: isActive
                          ? FRAMEWORK_COLORS[tab.key]
                          : "rgba(255,255,255,0.35)",
                        background: isActive
                          ? `${FRAMEWORK_COLORS[tab.key]}10`
                          : "transparent",
                        borderBottom: isActive
                          ? `2px solid ${FRAMEWORK_COLORS[tab.key]}`
                          : "2px solid transparent",
                      }}
                    >
                      {tab.label}
                      {tab.badge && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase"
                          style={{
                            background: isActive
                              ? `${FRAMEWORK_COLORS[tab.key]}20`
                              : "rgba(255,255,255,0.05)",
                            color: isActive
                              ? FRAMEWORK_COLORS[tab.key]
                              : "rgba(255,255,255,0.2)",
                          }}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <FrameworkContent
                framework={activeFramework}
                component={component}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
