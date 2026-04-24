"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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

interface BlogCodeEditorProps {
  /** Raw HTML snippet to show as starting code */
  html: string;
  /** Raw CSS to show as starting code */
  css: string;
  /** Optional title for the editor section */
  title?: string;
}

const SANDPACK_THEME = {
  colors: {
    surface1: "#0d0d14",
    surface2: "#13131e",
    surface3: "#1a1a28",
    clickable: "rgba(255,255,255,0.4)",
    base: "rgba(255,255,255,0.8)",
    disabled: "rgba(255,255,255,0.2)",
    hover: "rgba(108,99,255,0.15)",
    accent: "#B8FB3C",
    error: "#ff5555",
    errorSurface: "rgba(255,85,85,0.1)",
  },
  syntax: {
    plain: "#e2e8f0",
    comment: { color: "#555577", fontStyle: "italic" as const },
    keyword: "#a78bfa",
    tag: "#B8FB3C",
    punctuation: "#4a4a6a",
    definition: "#60a5fa",
    property: "#34d399",
    static: "#fbbf24",
    string: "#f59e0b",
  },
  font: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
    size: "13px",
    lineHeight: "1.7",
  },
} as const;

export default function BlogCodeEditor({
  html,
  css,
  title = "Try the Code",
}: BlogCodeEditorProps) {
  const [copied, setCopied] = useState(false);

  const fullCode = `${css}\n`;

  const files = {
    "/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="/styles.css" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #0d0d0d; font-family: -apple-system, sans-serif;
  }
</style>
</head>
<body>
${html}
</body>
</html>`,
      active: false,
    },
    "/styles.css": {
      code: css,
      active: true,
    },
  };

  return (
    <div
      className="my-8 rounded-2xl overflow-hidden border"
      style={{ borderColor: "#2A2A2A" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ background: "#0d0d14", borderColor: "#2A2A2A" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#28c840" }}
            />
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              className="opacity-50"
              viewBox="0 0 24 24"
              style={{ color: "#B8FB3C" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <span
              className="text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-semibold px-2 py-1 rounded-md"
            style={{
              background: "rgba(184,251,60,0.08)",
              color: "#B8FB3C",
              border: "1px solid rgba(184,251,60,0.2)",
            }}
          >
            Live Editor
          </span>
          <button
            onClick={() => {
              navigator.clipboard
                .writeText(`${html}\n\n/* CSS */\n${css}`)
                .then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: copied
                ? "rgba(184,251,60,0.15)"
                : "rgba(255,255,255,0.06)",
              color: copied ? "#B8FB3C" : "rgba(255,255,255,0.5)",
              border: `1px solid ${copied ? "rgba(184,251,60,0.3)" : "#2A2A2A"}`,
            }}
          >
            {copied ? "✓ Copied" : "Copy All"}
          </button>
        </div>
      </div>

      {/* Sandpack Editor */}
      <SandpackProvider template="static" files={files} theme={SANDPACK_THEME}>
        <SandpackLayout
          style={{ borderRadius: 0, border: "none", minHeight: "320px" }}
        >
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            wrapContent
            style={{ height: "320px", flex: 1 }}
          />
          <SandpackPreview
            showNavigator={false}
            showOpenInCodeSandbox={false}
            style={{ height: "320px", flex: 1 }}
          />
        </SandpackLayout>
      </SandpackProvider>

      <div
        className="px-4 py-2 text-center text-xs border-t"
        style={{
          background: "#08080f",
          borderColor: "#2A2A2A",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        Edit the CSS tab — changes reflect in the preview instantly
      </div>
    </div>
  );
}
