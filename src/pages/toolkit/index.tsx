"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "motion/react";
import PageSEO from "@/components/seo/PageSEO";

type ActiveTool = "shadow" | "gradient" | "radius" | "animation" | "tailwind";
const VALID_TOOLS: ActiveTool[] = [
  "shadow",
  "gradient",
  "radius",
  "animation",
  "tailwind",
];

function CodeWindow({
  title,
  children,
  onCopy,
  copied,
}: {
  title: string;
  children: React.ReactNode;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "#0D0D0D",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#ff5f57" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#febc2e" }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: "#28c840" }}
          />
        </div>
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {title}
        </span>
        {onCopy && (
          <button
            onClick={onCopy}
            className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
            style={{
              background: copied
                ? "rgba(184,251,60,0.15)"
                : "rgba(255,255,255,0.06)",
              color: copied ? "#B8FB3C" : "rgba(255,255,255,0.7)",
            }}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        )}
        {!onCopy && <div className="w-12" />}
      </div>
      {children}
    </div>
  );
}

// ————— Box Shadow Generator —————
interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

function ShadowTool() {
  const [l, setL] = useState<ShadowLayer>({
    x: 8,
    y: 8,
    blur: 24,
    spread: 0,
    color: "#6C63FF",
    opacity: 40,
    inset: false,
  });
  const [copied, setCopied] = useState(false);
  const [previewBg, setPreviewBg] = useState<"dark" | "white" | "grey">("dark");

  const shadow = `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}${Math.round(
    l.opacity * 2.55,
  )
    .toString(16)
    .padStart(2, "0")}`;
  const css = `box-shadow: ${shadow};`;

  const copy = () => {
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const bgStyles = {
    dark: { bg: "#0A0A0A", boxColor: "rgba(255,255,255,0.12)" },
    white: { bg: "#FFFFFF", boxColor: "rgba(0,0,0,0.08)" },
    grey: { bg: "#606070", boxColor: "rgba(255,255,255,0.15)" },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        {(
          [
            ["X Offset", "x", -40, 40],
            ["Y Offset", "y", -40, 40],
            ["Blur", "blur", 0, 80],
            ["Spread", "spread", -20, 40],
            ["Opacity (%)", "opacity", 0, 100],
          ] as [string, keyof ShadowLayer, number, number][]
        ).map(([label, key, min, max]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-white/50">{label}</span>
              <span className="text-xs font-mono text-white/70">{l[key]}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={l[key] as number}
              onChange={(e) =>
                setL((p) => ({ ...p, [key]: Number(e.target.value) }))
              }
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6C63FF ${(((l[key] as number) - min) / (max - min)) * 100}%, #2A2A2A ${(((l[key] as number) - min) / (max - min)) * 100}%)`,
              }}
            />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={l.color}
            onChange={(e) => setL((p) => ({ ...p, color: e.target.value }))}
            className="w-8 h-8 rounded-lg cursor-pointer"
          />
          <span className="text-sm text-white/60">Shadow Color</span>
          <label className="ml-auto flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setL((p) => ({ ...p, inset: !p.inset }))}
              className="w-9 h-5 rounded-full transition-colors relative"
              style={{ background: l.inset ? "#6C63FF" : "#2A2A2A" }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                style={{ left: l.inset ? "18px" : "2px" }}
              />
            </div>
            <span className="text-xs text-white/50">Inset</span>
          </label>
        </div>
      </div>
      <div className="space-y-4">
        {/* Preview bg toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 mr-1">Preview bg:</span>
          {(["dark", "white", "grey"] as const).map((bg) => (
            <button
              key={bg}
              onClick={() => setPreviewBg(bg)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border capitalize"
              style={{
                background:
                  previewBg === bg
                    ? "rgba(108,99,255,0.15)"
                    : "rgba(255,255,255,0.04)",
                borderColor:
                  previewBg === bg ? "rgba(108,99,255,0.4)" : "#2A2A2A",
                color: previewBg === bg ? "#a78bfa" : "rgba(255,255,255,0.4)",
              }}
            >
              <span
                className="w-3 h-3 rounded-full border border-white/20 inline-block"
                style={{ background: bgStyles[bg].bg }}
              />
              {bg}
            </button>
          ))}
        </div>
        <div
          className="h-40 rounded-2xl flex items-center justify-center border transition-colors duration-300"
          style={{ background: bgStyles[previewBg].bg, borderColor: "#2A2A2A" }}
        >
          <div
            className="w-20 h-20 rounded-2xl transition-colors duration-300"
            style={{
              background: bgStyles[previewBg].boxColor,
              boxShadow: shadow,
            }}
          />
        </div>
        <CodeWindow title="box-shadow.css" onCopy={copy} copied={copied}>
          <pre className="p-4 text-sm font-mono text-white/80">{css}</pre>
        </CodeWindow>
      </div>
    </div>
  );
}

// ————— Gradient Generator —————
function GradientTool() {
  const [c1, setC1] = useState("#6C63FF");
  const [c2, setC2] = useState("#f472b6");
  const [c3, setC3] = useState("");
  const [dir, setDir] = useState(135);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [copied, setCopied] = useState(false);

  const stops = c3 ? `${c1}, ${c3}, ${c2}` : `${c1}, ${c2}`;
  const gradient =
    type === "linear"
      ? `linear-gradient(${dir}deg, ${stops})`
      : `radial-gradient(circle, ${stops})`;
  const css = `background: ${gradient};`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(["linear", "radial"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
              style={{
                background: type === t ? "#6C63FF" : "rgba(255,255,255,0.04)",
                color: type === t ? "#fff" : "rgba(255,255,255,0.4)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {type === "linear" && (
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-white/50">Direction</span>
              <span className="text-xs font-mono text-white/70">{dir}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={dir}
              onChange={(e) => setDir(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6C63FF ${(dir / 360) * 100}%, #2A2A2A ${(dir / 360) * 100}%)`,
              }}
            />
          </div>
        )}
        <div className="space-y-3">
          {[
            ["Color 1", c1, setC1],
            ["Color 2 (mid)", c3, setC3],
            ["Color 3", c2, setC2],
          ].map(([label, val, setter]) => (
            <div key={label as string} className="flex items-center gap-3">
              <input
                type="color"
                value={(val as string) || "#ffffff"}
                onChange={(e) =>
                  (setter as (v: string) => void)(e.target.value)
                }
                className="w-8 h-8 rounded-lg cursor-pointer"
              />
              <span className="flex-1 text-xs text-white/50">
                {label as string}
              </span>
              <span className="text-xs font-mono text-white/40">
                {(val as string) || "optional"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div
          className="h-40 rounded-2xl border"
          style={{ background: gradient, borderColor: "#2A2A2A" }}
        />
        <CodeWindow
          title="gradient.css"
          onCopy={() => {
            navigator.clipboard.writeText(css).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          copied={copied}
        >
          <pre className="p-4 text-sm font-mono text-white/80 whitespace-pre-wrap break-all">
            {css}
          </pre>
        </CodeWindow>
      </div>
    </div>
  );
}

// ————— Border Radius Generator —————
function RadiusTool() {
  const [corners, setCorners] = useState({ tl: 12, tr: 12, bl: 12, br: 12 });
  const [linked, setLinked] = useState(true);
  const [copied, setCopied] = useState(false);

  const setCorner = (key: keyof typeof corners, v: number) => {
    if (linked) setCorners({ tl: v, tr: v, bl: v, br: v });
    else setCorners((p) => ({ ...p, [key]: v }));
  };

  const css = linked
    ? `border-radius: ${corners.tl}px;`
    : `border-radius: ${corners.tl}px ${corners.tr}px ${corners.br}px ${corners.bl}px;`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => setLinked(!linked)}
            className="w-9 h-5 rounded-full transition-colors relative"
            style={{ background: linked ? "#6C63FF" : "#2A2A2A" }}
          >
            <div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
              style={{ left: linked ? "18px" : "2px" }}
            />
          </div>
          <span className="text-xs text-white/50">Link all corners</span>
        </label>
        {(
          [
            ["Top Left", "tl"],
            ["Top Right", "tr"],
            ["Bottom Left", "bl"],
            ["Bottom Right", "br"],
          ] as [string, keyof typeof corners][]
        ).map(([label, key]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-white/50">{label}</span>
              <span className="text-xs font-mono text-white/70">
                {corners[key]}px
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              value={corners[key]}
              onChange={(e) => setCorner(key, Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6C63FF ${(corners[key] / 80) * 100}%, #2A2A2A ${(corners[key] / 80) * 100}%)`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div
          className="h-40 rounded-none flex items-center justify-center border"
          style={{
            background: "#0A0A0A",
            borderColor: "#2A2A2A",
            borderRadius: 12,
          }}
        >
          <div
            className="w-36 h-20 bg-linear-to-br from-[#6C63FF] to-[#8b5cf6]"
            style={{
              borderRadius: `${corners.tl}px ${corners.tr}px ${corners.br}px ${corners.bl}px`,
            }}
          />
        </div>
        <CodeWindow
          title="border-radius.css"
          onCopy={() => {
            navigator.clipboard.writeText(css).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          copied={copied}
        >
          <pre className="p-4 text-sm font-mono text-white/80">{css}</pre>
        </CodeWindow>
      </div>
    </div>
  );
}

// ————— CSS Animation Generator —————
function AnimationTool() {
  const [anim, setAnim] = useState({
    type: "fadeIn",
    duration: 0.6,
    delay: 0,
    easing: "ease",
    iteration: "1",
    direction: "normal",
  });
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);

  const keyframes: Record<string, string> = {
    fadeIn: `@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}`,
    slideUp: `@keyframes slideUp {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}`,
    slideIn: `@keyframes slideIn {\n  from { opacity: 0; transform: translateX(-20px); }\n  to { opacity: 1; transform: translateX(0); }\n}`,
    scaleIn: `@keyframes scaleIn {\n  from { opacity: 0; transform: scale(0.85); }\n  to { opacity: 1; transform: scale(1); }\n}`,
    bounce: `@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-12px); }\n}`,
    pulse: `@keyframes pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.5; }\n}`,
    spin: `@keyframes spin {\n  to { transform: rotate(360deg); }\n}`,
    shake: `@keyframes shake {\n  0%, 100% { transform: translateX(0); }\n  20%, 60% { transform: translateX(-6px); }\n  40%, 80% { transform: translateX(6px); }\n}`,
  };

  const css = `${keyframes[anim.type]}\n\n.animated {\n  animation: ${anim.type} ${anim.duration}s ${anim.easing} ${anim.delay}s ${anim.iteration} ${anim.direction} both;\n}`;

  // Inline style string for the preview box
  const previewStyle: React.CSSProperties = {
    animation: `${anim.type} ${anim.duration}s ${anim.easing} ${anim.delay}s ${anim.iteration === "infinite" ? "infinite" : parseInt(anim.iteration)} ${anim.direction} both`,
  };

  // Inject keyframes as a <style> tag to make the preview work
  const styleTag = `<style>${keyframes[anim.type].replace(`@keyframes ${anim.type}`, `@keyframes ${anim.type}`)}</style>`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-white/50 mb-2">Animation Type</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(keyframes).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setAnim((p) => ({ ...p, type: t }));
                  setPreviewKey((k) => k + 1);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
                style={{
                  background:
                    anim.type === t ? "#6C63FF" : "rgba(255,255,255,0.04)",
                  color: anim.type === t ? "#fff" : "rgba(255,255,255,0.4)",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {(
          [
            ["Duration (s)", "duration", 0.1, 3, 0.1],
            ["Delay (s)", "delay", 0, 2, 0.1],
          ] as [string, keyof typeof anim, number, number, number][]
        ).map(([label, key, min, max, step]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-white/50">{label}</span>
              <span className="text-xs font-mono text-white/70">
                {anim[key]}s
              </span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={anim[key] as number}
              onChange={(e) => {
                setAnim((p) => ({ ...p, [key]: Number(e.target.value) }));
                setPreviewKey((k) => k + 1);
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #6C63FF ${(((anim[key] as number) - min) / (max - min)) * 100}%, #2A2A2A ${(((anim[key] as number) - min) / (max - min)) * 100}%)`,
              }}
            />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-white/50 mb-1">Easing</p>
            <select
              value={anim.easing}
              onChange={(e) => {
                setAnim((p) => ({ ...p, easing: e.target.value }));
                setPreviewKey((k) => k + 1);
              }}
              className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none"
              style={{ background: "#0D0D0D", border: "1px solid #2A2A2A" }}
            >
              {[
                "ease",
                "ease-in",
                "ease-out",
                "ease-in-out",
                "linear",
                "cubic-bezier(0.34,1.56,0.64,1)",
              ].map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs text-white/50 mb-1">Iteration</p>
            <select
              value={anim.iteration}
              onChange={(e) => {
                setAnim((p) => ({ ...p, iteration: e.target.value }));
                setPreviewKey((k) => k + 1);
              }}
              className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none"
              style={{ background: "#0D0D0D", border: "1px solid #2A2A2A" }}
            >
              {["1", "2", "3", "infinite"].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => setPreviewKey((k) => k + 1)}
          className="w-full py-2 rounded-lg text-xs font-semibold transition-all border"
          style={{
            background: "rgba(108,99,255,0.08)",
            borderColor: "rgba(108,99,255,0.3)",
            color: "#a78bfa",
          }}
        >
          ▶ Replay Animation
        </button>
      </div>
      <div className="space-y-4">
        {/* Live preview */}
        <div
          className="h-40 rounded-2xl flex flex-col items-center justify-center gap-3 border relative overflow-hidden"
          style={{ background: "#0A0A0A", borderColor: "#2A2A2A" }}
        >
          <style>{keyframes[anim.type]}</style>
          <div
            key={previewKey}
            className="w-16 h-16 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #6C63FF, #a78bfa)",
              ...previewStyle,
            }}
          />
          <span
            className="text-[10px] font-semibold"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Live Preview — {anim.type}
          </span>
        </div>
        <CodeWindow
          title="animation.css"
          onCopy={() => {
            navigator.clipboard.writeText(css).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          copied={copied}
        >
          <pre
            className="p-4 text-sm font-mono text-white/80 leading-relaxed whitespace-pre-wrap"
            style={{ minHeight: 130 }}
          >
            {css}
          </pre>
        </CodeWindow>
      </div>
    </div>
  );
}

// ————— Tailwind Converter (Fixed) —————
const cssToTailwind: Record<string, string> = {
  // Display
  "display: flex": "flex",
  "display: grid": "grid",
  "display: block": "block",
  "display: none": "hidden",
  "display: inline-flex": "inline-flex",

  // Flex Direction (Added more variations for safety)
  "flex-direction: row": "flex-row",
  "flex-direction: column": "flex-col",
  "flex-direction: row-reverse": "flex-row-reverse",
  "flex-direction: column-reverse": "flex-col-reverse",

  // Flex Wrap
  "flex-wrap: wrap": "flex-wrap",
  "flex-wrap: nowrap": "flex-nowrap",
  "flex-wrap: wrap-reverse": "flex-wrap-reverse",

  // Alignment
  "align-items: center": "items-center",
  "align-items: flex-start": "items-start",
  "align-items: flex-end": "items-end",
  "align-items: baseline": "items-baseline",
  "align-items: stretch": "items-stretch",

  // Justify
  "justify-content: center": "justify-center",
  "justify-content: space-between": "justify-between",
  "justify-content: flex-end": "justify-end",
  "justify-content: flex-start": "justify-start",
  "justify-content: space-around": "justify-around",
  "justify-content: space-evenly": "justify-evenly",

  // Font Weights
  "font-weight: 400": "font-normal",
  "font-weight: 500": "font-medium",
  "font-weight: 600": "font-semibold",
  "font-weight: 700": "font-bold",
  "font-weight: 800": "font-extrabold",
  "font-weight: 900": "font-black",

  // Text
  "text-align: center": "text-center",
  "text-align: left": "text-left",
  "text-align: right": "text-right",
  "text-transform: uppercase": "uppercase",
  "text-transform: lowercase": "lowercase",
  "text-transform: capitalize": "capitalize",

  // Position & Misc
  "overflow: hidden": "overflow-hidden",
  "overflow: auto": "overflow-auto",
  "position: relative": "relative",
  "position: absolute": "absolute",
  "position: fixed": "fixed",
  "position: sticky": "sticky",
  "cursor: pointer": "cursor-pointer",
  "cursor: default": "cursor-default",
  "opacity: 0": "opacity-0",
  "opacity: 0.5": "opacity-50",
  "opacity: 1": "opacity-100",

  // Borders
  "border-radius: 4px": "rounded",
  "border-radius: 8px": "rounded-lg",
  "border-radius: 12px": "rounded-xl",
  "border-radius: 16px": "rounded-2xl",
  "border-radius: 9999px": "rounded-full",
  "border-radius: 0": "rounded-none",

  // Sizing
  "width: 100%": "w-full",
  "height: 100%": "h-full",
  "min-height: 100vh": "min-h-screen",
};
const FALLBACK_PREFIX: [string, string][] = [
  ["padding-top:", "pt"],
  ["padding-right:", "pr"],
  ["padding-bottom:", "pb"],
  ["padding-left:", "pl"],
  ["padding-inline:", "px"],
  ["padding-block:", "py"],
  ["padding:", "p"],
  ["margin-top:", "mt"],
  ["margin-right:", "mr"],
  ["margin-bottom:", "mb"],
  ["margin-left:", "ml"],
  ["margin-inline:", "mx"],
  ["margin-block:", "my"],
  ["margin:", "m"],
  ["gap:", "gap"],
  ["row-gap:", "gap-y"],
  ["column-gap:", "gap-x"],
  ["font-size:", "text"],
  ["color:", "text"],
  ["background-color:", "bg"],
  ["background:", "bg"],
  ["border-color:", "border"],
  ["border-width:", "border"],
  ["border-radius:", "rounded"],
  ["width:", "w"],
  ["height:", "h"],
  ["min-width:", "min-w"],
  ["min-height:", "min-h"],
  ["max-width:", "max-w"],
  ["max-height:", "max-h"],
  ["top:", "top"],
  ["right:", "right"],
  ["bottom:", "bottom"],
  ["left:", "left"],
  ["inset:", "inset"],
  ["z-index:", "z"],
  ["line-height:", "leading"],
  ["letter-spacing:", "tracking"],
  ["border-top-left-radius:", "rounded-tl"],
  ["border-top-right-radius:", "rounded-tr"],
  ["border-bottom-left-radius:", "rounded-bl"],
  ["border-bottom-right-radius:", "rounded-br"],
  ["outline-offset:", "outline-offset"],
  ["text-indent:", "indent"],
  ["transition-duration:", "duration"],
  ["transition-delay:", "delay"],
  ["opacity:", "opacity"],
  ["columns:", "columns"],
  ["aspect-ratio:", "aspect"],
  ["accent-color:", "accent"],
  ["caret-color:", "caret"],
  ["scroll-margin:", "scroll-m"],
  ["scroll-padding:", "scroll-p"],
  ["stroke-width:", "stroke"],
  ["fill:", "fill"],
  ["stroke:", "stroke"],
];

function normalizeLine(raw: string): string {
  const cleaned = raw.trim().replace(/;$/, "").trim();
  const colonIdx = cleaned.indexOf(":");
  if (colonIdx === -1) return cleaned;
  const prop = cleaned.slice(0, colonIdx).trim();
  const val = cleaned.slice(colonIdx + 1).trim();
  return `${prop}: ${val}`;
}

function HighlightedCSSInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const highlight = (code: string) => {
    return code.split("\n").map((line, i) => {
      const parts = line.split(/(:\s*)/);
      if (parts.length >= 3) {
        const prop = parts[0];
        const colon = parts[1];
        const rest = parts.slice(2).join("");

        let val = rest;
        let semi = "";
        if (rest.endsWith(";")) {
          val = rest.slice(0, -1);
          semi = ";";
        }

        return (
          <div key={i} className="min-h-[1.5em]">
            <span style={{ color: "#56b6c2" }}>{prop}</span>
            <span style={{ color: "#abb2bf" }}>{colon}</span>
            <span style={{ color: "#e5c07b" }}>{val}</span>
            <span style={{ color: "#abb2bf" }}>{semi}</span>
          </div>
        );
      }
      return (
        <div key={i} className="min-h-[1.5em] text-[#abb2bf]">
          {line || " "}
        </div>
      );
    });
  };

  const handleScroll = () => {
    if (textareaRef.current) {
      const bg = textareaRef.current.previousElementSibling as HTMLDivElement;
      if (bg) bg.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="relative w-full h-220px">
      <div
        className="absolute inset-0 p-4 font-mono text-sm leading-relaxed pointer-events-none overflow-hidden whitespace-pre"
        style={{ color: "#abb2bf" }}
      >
        {highlight(value)}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full p-4 font-mono text-sm leading-relaxed resize-none outline-none opacity-100"
        style={{
          background: "transparent",
          color: "transparent",
          caretColor: "#fff",
          whiteSpace: "pre",
        }}
        spellCheck={false}
      />
    </div>
  );
}

function TailwindConverter() {
  const [input, setInput] = useState(
    "display: flex;\nalign-items: center;\nflex-direction: column;\nfont-weight: 600;\nborder-radius: 8px;\ngap: 16px;",
  );
  const [copied, setCopied] = useState(false);

  const convert = useCallback((css: string) => {
    const lines = css.split("\n").map(normalizeLine);
    const classes: string[] = [];
    const unknowns: string[] = [];

    for (const line of lines) {
      if (!line) continue;

      const exact = cssToTailwind[line];
      if (exact) {
        classes.push(exact);
        continue;
      }

      let handled = false;
      for (const [prefix, twPrefix] of FALLBACK_PREFIX) {
        const normalizedPrefix = prefix.endsWith(":") ? prefix : prefix;
        if (line.startsWith(normalizedPrefix.replace(/:$/, "") + ":")) {
          const val = line.slice(line.indexOf(":") + 1).trim();
          classes.push(`${twPrefix}-[${val}]`);
          handled = true;
          break;
        }
      }

      if (!handled && line.startsWith("box-shadow:")) {
        const val = line.slice(line.indexOf(":") + 1).trim();
        if (val === "none") classes.push("shadow-none");
        else classes.push(`shadow-[${val.replace(/\s+/g, "_")}]`);
        handled = true;
      }

      if (!handled && line.startsWith("transform:")) {
        const val = line.slice(line.indexOf(":") + 1).trim();
        if (val === "none") classes.push("transform-none");
        else classes.push(`[transform:${val.replace(/\s+/g, "_")}]`);
        handled = true;
      }

      if (!handled && line.startsWith("transition:")) {
        const val = line.slice(line.indexOf(":") + 1).trim();
        if (val === "none") classes.push("transition-none");
        else if (val === "all") classes.push("transition-all");
        else classes.push(`[transition:${val.replace(/\s+/g, "_")}]`);
        handled = true;
      }

      if (!handled && line.startsWith("animation:")) {
        const val = line.slice(line.indexOf(":") + 1).trim();
        if (val === "none") classes.push("animate-none");
        else classes.push(`[animation:${val.replace(/\s+/g, "_")}]`);
        handled = true;
      }

      if (!handled) {
        unknowns.push(`/* ${line} */`);
      }
    }

    return { classes: classes.join(" "), unknowns };
  }, []);

  const { classes, unknowns } = convert(input);
  const output =
    classes + (unknowns.length ? "\n\n" + unknowns.join("\n") : "");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div>
        <CodeWindow title="styles.css">
          <HighlightedCSSInput value={input} onChange={setInput} />
        </CodeWindow>
      </div>
      <div>
        <CodeWindow
          title="tailwind-classes.txt"
          onCopy={() => {
            navigator.clipboard.writeText(classes).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          copied={copied}
        >
          <pre
            className="p-4 text-sm font-mono text-white/80 leading-relaxed whitespace-pre-wrap"
            style={{ minHeight: 220 }}
          >
            {output || "— output appears here —"}
          </pre>
        </CodeWindow>
        <p className="text-xs text-white/30 mt-3 ml-1">
          Common properties auto-converted. Custom values use arbitrary syntax.
        </p>
      </div>
    </div>
  );
}

const TOOL_ICONS: Record<ActiveTool, React.ReactNode> = {
  shadow: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="14" height="14" rx="3" />
      <path d="M21 7v10a4 4 0 0 1-4 4H7" />
    </svg>
  ),
  gradient: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M3 12a9 9 0 0 0 9 9" opacity="0.4" />
    </svg>
  ),
  radius: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9V5a2 2 0 0 1 2-2h4" />
      <path d="M15 3h4a2 2 0 0 1 2 2v4" />
      <path d="M21 15v4a2 2 0 0 1-2 2h-4" />
      <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
    </svg>
  ),
  animation: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  tailwind: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
};

const TOOL_COLORS: Record<ActiveTool, string> = {
  shadow: "#a78bfa",
  gradient: "#f472b6",
  radius: "#60a5fa",
  animation: "#fbbf24",
  tailwind: "#B8FB3C",
};

const TOOLS: { id: ActiveTool; label: string; desc: string }[] = [
  { id: "shadow", label: "Box Shadow", desc: "X, Y, blur, spread, color" },
  { id: "gradient", label: "Gradient", desc: "Linear & radial gradients" },
  { id: "radius", label: "Border Radius", desc: "Per-corner control" },
  { id: "animation", label: "CSS Animation", desc: "Keyframe generator" },
  { id: "tailwind", label: "CSS → Tailwind", desc: "Convert CSS to classes" },
];

export default function ToolkitPage() {
  const router = useRouter();
  const [active, setActive] = useState<ActiveTool>("shadow");
  const tool = TOOLS.find((t) => t.id === active)!;
  const toolColor = TOOL_COLORS[active];

  useEffect(() => {
    const q = router.query.tool as string | undefined;
    if (q && VALID_TOOLS.includes(q as ActiveTool)) {
      setActive(q as ActiveTool);
    }
  }, [router.query.tool]);

  return (
    <>
      <PageSEO
        title="Dev Toolkit — UIXplor"
        description="Developer utilities: box shadow generator, gradient generator, border radius generator, CSS animation generator, and CSS to Tailwind converter."
        path="/toolkit"
        keywords={[
          "box shadow generator",
          "gradient generator",
          "border radius generator",
          "CSS animation generator",
          "tailwind converter",
        ]}
      />
      <main className="min-h-screen" style={{ background: "#0A0A0F" }}>
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${toolColor}08 0%, transparent 70%)`,
              transition: "background 0.5s ease",
            }}
          />
          <div className="container px-4 sm:px-6 pt-28 pb-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p
                className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: toolColor }}
              >
                Developer Tools
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Dev <span style={{ color: "#B8FB3C" }}>Toolkit</span>
              </h1>
              <p className="text-white/35 text-sm max-w-md">
                Production-ready CSS generators and conversion utilities for
                modern frontend workflows.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="container px-4 sm:px-6 pb-24">
          <div className="flex flex-wrap gap-2 mb-8">
            {TOOLS.map((t) => {
              const isActive = active === t.id;
              const color = TOOL_COLORS[t.id];
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border group"
                  style={{
                    background: isActive
                      ? `${color}12`
                      : "rgba(255,255,255,0.02)",
                    borderColor: isActive
                      ? `${color}40`
                      : "rgba(255,255,255,0.06)",
                    color: isActive ? color : "rgba(255,255,255,0.4)",
                  }}
                >
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200"
                    style={{
                      background: isActive
                        ? `${color}18`
                        : "rgba(255,255,255,0.04)",
                      color: isActive ? color : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {TOOL_ICONS[t.id]}
                  </span>
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="rounded-2xl border overflow-hidden"
            style={{
              background: "rgba(18,18,24,0.8)",
              borderColor: `${toolColor}15`,
              boxShadow: `0 0 80px ${toolColor}05, 0 4px 32px rgba(0,0,0,0.3)`,
            }}
          >
            <div
              className="flex items-center gap-3.5 px-6 py-4 border-b"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: `${toolColor}15`,
                  color: toolColor,
                }}
              >
                {TOOL_ICONS[active]}
              </div>
              <div>
                <h2 className="text-[15px] font-bold text-white leading-tight">
                  {tool.label}
                </h2>
                <p className="text-[11px] text-white/35 mt-0.5">{tool.desc}</p>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {active === "shadow" && <ShadowTool />}
              {active === "gradient" && <GradientTool />}
              {active === "radius" && <RadiusTool />}
              {active === "animation" && <AnimationTool />}
              {active === "tailwind" && <TailwindConverter />}
            </div>

            <div
              className="h-2px"
              style={{
                background: `linear-gradient(to right, transparent, ${toolColor}30, transparent)`,
              }}
            />
          </motion.div>
        </section>
      </main>
    </>
  );
}
