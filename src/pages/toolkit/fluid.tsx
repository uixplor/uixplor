'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

/* ═══════════════════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════ */

type Unit = 'px' | 'rem' | 'em';

interface ScalingProperty {
  id: string;
  label: string;
  cssProperty: string;
  minValue: number;
  maxValue: number;
  enabled: boolean;
  color: string;
  icon: string;
}

interface FluidConfig {
  minViewport: number;
  maxViewport: number;
  rootSize: number;
  unit: Unit;
  properties: ScalingProperty[];
}

const DEFAULT_PROPERTIES: ScalingProperty[] = [
  { id: 'font-size', label: 'Font Size', cssProperty: 'font-size', minValue: 16, maxValue: 48, enabled: true, color: '#B8FB3C', icon: 'Aa' },
  { id: 'padding', label: 'Padding', cssProperty: 'padding', minValue: 12, maxValue: 32, enabled: true, color: '#6C63FF', icon: '⊡' },
  { id: 'margin', label: 'Margin', cssProperty: 'margin', minValue: 8, maxValue: 24, enabled: false, color: '#f472b6', icon: '⊞' },
  { id: 'gap', label: 'Gap', cssProperty: 'gap', minValue: 8, maxValue: 24, enabled: false, color: '#38bdf8', icon: '⋮⋮' },
  { id: 'border-radius', label: 'Border Radius', cssProperty: 'border-radius', minValue: 4, maxValue: 16, enabled: true, color: '#fbbf24', icon: '◔' },
];

const DEFAULT_CONFIG: FluidConfig = {
  minViewport: 375,
  maxViewport: 1440,
  rootSize: 16,
  unit: 'px',
  properties: DEFAULT_PROPERTIES,
};

interface Preset {
  id: string;
  label: string;
  icon: string;
  desc: string;
  config: Partial<FluidConfig> & { properties: ScalingProperty[] };
}

const PRESETS: Preset[] = [
  {
    id: 'hero',
    label: 'Hero Text',
    icon: '✦',
    desc: 'Large headline scaling',
    config: {
      minViewport: 375, maxViewport: 1440,
      properties: [
        { id: 'font-size', label: 'Font Size', cssProperty: 'font-size', minValue: 28, maxValue: 72, enabled: true, color: '#B8FB3C', icon: 'Aa' },
        { id: 'padding', label: 'Padding', cssProperty: 'padding', minValue: 16, maxValue: 48, enabled: true, color: '#6C63FF', icon: '⊡' },
        { id: 'margin', label: 'Margin', cssProperty: 'margin', minValue: 16, maxValue: 40, enabled: false, color: '#f472b6', icon: '⊞' },
        { id: 'gap', label: 'Gap', cssProperty: 'gap', minValue: 12, maxValue: 32, enabled: false, color: '#38bdf8', icon: '⋮⋮' },
        { id: 'border-radius', label: 'Border Radius', cssProperty: 'border-radius', minValue: 8, maxValue: 24, enabled: false, color: '#fbbf24', icon: '◔' },
      ],
    },
  },
  {
    id: 'body',
    label: 'Body Text',
    icon: '¶',
    desc: 'Readable paragraph scaling',
    config: {
      minViewport: 375, maxViewport: 1440,
      properties: [
        { id: 'font-size', label: 'Font Size', cssProperty: 'font-size', minValue: 14, maxValue: 18, enabled: true, color: '#B8FB3C', icon: 'Aa' },
        { id: 'padding', label: 'Padding', cssProperty: 'padding', minValue: 12, maxValue: 24, enabled: true, color: '#6C63FF', icon: '⊡' },
        { id: 'margin', label: 'Margin', cssProperty: 'margin', minValue: 8, maxValue: 16, enabled: true, color: '#f472b6', icon: '⊞' },
        { id: 'gap', label: 'Gap', cssProperty: 'gap', minValue: 8, maxValue: 16, enabled: false, color: '#38bdf8', icon: '⋮⋮' },
        { id: 'border-radius', label: 'Border Radius', cssProperty: 'border-radius', minValue: 4, maxValue: 8, enabled: false, color: '#fbbf24', icon: '◔' },
      ],
    },
  },
  {
    id: 'card',
    label: 'Card Spacing',
    icon: '▢',
    desc: 'Card component system',
    config: {
      minViewport: 375, maxViewport: 1440,
      properties: [
        { id: 'font-size', label: 'Font Size', cssProperty: 'font-size', minValue: 14, maxValue: 20, enabled: true, color: '#B8FB3C', icon: 'Aa' },
        { id: 'padding', label: 'Padding', cssProperty: 'padding', minValue: 16, maxValue: 40, enabled: true, color: '#6C63FF', icon: '⊡' },
        { id: 'margin', label: 'Margin', cssProperty: 'margin', minValue: 8, maxValue: 20, enabled: false, color: '#f472b6', icon: '⊞' },
        { id: 'gap', label: 'Gap', cssProperty: 'gap', minValue: 12, maxValue: 28, enabled: true, color: '#38bdf8', icon: '⋮⋮' },
        { id: 'border-radius', label: 'Border Radius', cssProperty: 'border-radius', minValue: 8, maxValue: 20, enabled: true, color: '#fbbf24', icon: '◔' },
      ],
    },
  },
  {
    id: 'button',
    label: 'Button Style',
    icon: '⬡',
    desc: 'Interactive element scaling',
    config: {
      minViewport: 375, maxViewport: 1440,
      properties: [
        { id: 'font-size', label: 'Font Size', cssProperty: 'font-size', minValue: 13, maxValue: 16, enabled: true, color: '#B8FB3C', icon: 'Aa' },
        { id: 'padding', label: 'Padding', cssProperty: 'padding', minValue: 10, maxValue: 18, enabled: true, color: '#6C63FF', icon: '⊡' },
        { id: 'margin', label: 'Margin', cssProperty: 'margin', minValue: 4, maxValue: 8, enabled: false, color: '#f472b6', icon: '⊞' },
        { id: 'gap', label: 'Gap', cssProperty: 'gap', minValue: 6, maxValue: 12, enabled: true, color: '#38bdf8', icon: '⋮⋮' },
        { id: 'border-radius', label: 'Border Radius', cssProperty: 'border-radius', minValue: 6, maxValue: 14, enabled: true, color: '#fbbf24', icon: '◔' },
      ],
    },
  },
];

const BREAKPOINTS = [
  { label: 'Mobile', value: 480, color: '#f472b6' },
  { label: 'Tablet', value: 768, color: '#fbbf24' },
  { label: 'Desktop', value: 1024, color: '#34d399' },
];

/* ═══════════════════════════════════════════════════════
   MATH ENGINE
   ═══════════════════════════════════════════════════════ */

function clampBuilder(minVP: number, maxVP: number, minVal: number, maxVal: number, root: number = 16): string {
  const minW = minVP / root;
  const maxW = maxVP / root;
  const minV = minVal / root;
  const maxV = maxVal / root;
  const slope = (maxV - minV) / (maxW - minW);
  const yInt = minV - slope * minW;
  const vw = slope * 100;
  return `clamp(${r(minV, 4)}rem, ${r(yInt, 4)}rem + ${r(vw, 4)}vw, ${r(maxV, 4)}rem)`;
}

function valAtVP(vp: number, minVP: number, maxVP: number, minV: number, maxV: number): number {
  if (vp <= minVP) return minV;
  if (vp >= maxVP) return maxV;
  return minV + ((vp - minVP) / (maxVP - minVP)) * (maxV - minV);
}

function r(value: number, d: number): number {
  return Math.round(value * 10 ** d) / 10 ** d;
}

/* ═══════════════════════════════════════════════════════
   URL & PERSISTENCE
   ═══════════════════════════════════════════════════════ */

// Property key shortcodes for compact URLs
const PROP_KEYS: Record<string, string> = {
  'font-size': 'fs',
  'padding': 'pd',
  'margin': 'mg',
  'gap': 'gp',
  'border-radius': 'br',
};
const PROP_KEYS_REV: Record<string, string> = Object.fromEntries(
  Object.entries(PROP_KEYS).map(([k, v]) => [v, k])
);

// Compact URL format: ?v=375-1440&r=16&u=px&fs=12.38&pd=10.18
// Disabled properties are omitted from the URL
function encodeConfigToURL(c: FluidConfig): string {
  const params = new URLSearchParams();
  params.set('v', `${c.minViewport}-${c.maxViewport}`);
  if (c.rootSize !== 16) params.set('r', String(c.rootSize));
  if (c.unit !== 'px') params.set('u', c.unit);
  for (const p of c.properties) {
    if (p.enabled) {
      const key = PROP_KEYS[p.id] || p.id;
      params.set(key, `${p.minValue}.${p.maxValue}`);
    }
  }
  return params.toString();
}

function decodeConfigFromURL(query: Record<string, string | string[] | undefined>): FluidConfig | null {
  try {
    const vp = (query.v as string)?.split('-');
    if (!vp || vp.length !== 2) return null;
    const minVP = parseInt(vp[0]);
    const maxVP = parseInt(vp[1]);
    if (isNaN(minVP) || isNaN(maxVP)) return null;

    const rootSize = query.r ? parseInt(query.r as string) || 16 : 16;
    const unit = (['px', 'rem', 'em'].includes(query.u as string) ? query.u : 'px') as Unit;

    const properties = DEFAULT_PROPERTIES.map(def => {
      const key = PROP_KEYS[def.id] || def.id;
      const val = query[key] as string | undefined;
      if (val) {
        const parts = val.split('.');
        if (parts.length === 2) {
          const mn = parseInt(parts[0]);
          const mx = parseInt(parts[1]);
          if (!isNaN(mn) && !isNaN(mx)) {
            return { ...def, minValue: mn, maxValue: mx, enabled: true };
          }
        }
      }
      return { ...def, enabled: false };
    });

    return { minViewport: minVP, maxViewport: maxVP, rootSize, unit, properties };
  } catch { return null; }
}

// localStorage uses base64 (compact storage, not user-facing)
function encodeConfigLS(c: FluidConfig): string {
  return btoa(JSON.stringify({
    mv: c.minViewport, xv: c.maxViewport, rs: c.rootSize, u: c.unit,
    p: c.properties.map(p => ({ i: p.id, mn: p.minValue, mx: p.maxValue, e: p.enabled ? 1 : 0 })),
  }));
}

function decodeConfigLS(encoded: string): FluidConfig | null {
  try {
    const s = JSON.parse(atob(encoded));
    return {
      minViewport: s.mv ?? 375, maxViewport: s.xv ?? 1440, rootSize: s.rs ?? 16, unit: s.u ?? 'px',
      properties: DEFAULT_PROPERTIES.map(def => {
        const saved = s.p?.find((x: { i: string }) => x.i === def.id);
        return saved ? { ...def, minValue: saved.mn, maxValue: saved.mx, enabled: saved.e === 1 } : def;
      }),
    };
  } catch { return null; }
}

const LS_KEY = 'uixplor__fluid_config';

/* ═══════════════════════════════════════════════════════
   CUSTOM SLIDER STYLES (injected once)
   ═══════════════════════════════════════════════════════ */

const SLIDER_STYLES = `
  .fluid-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 999px;
    outline: none;
    cursor: pointer;
    position: relative;
  }
  .fluid-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid var(--slider-color, #B8FB3C);
    box-shadow: 0 0 12px var(--slider-color, #B8FB3C), 0 0 4px rgba(0,0,0,0.5);
    cursor: grab;
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .fluid-slider::-webkit-slider-thumb:hover {
    transform: scale(1.15);
    box-shadow: 0 0 20px var(--slider-color, #B8FB3C), 0 0 6px rgba(0,0,0,0.5);
  }
  .fluid-slider::-webkit-slider-thumb:active {
    cursor: grabbing;
    transform: scale(1.05);
  }
  .fluid-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid var(--slider-color, #B8FB3C);
    box-shadow: 0 0 12px var(--slider-color, #B8FB3C), 0 0 4px rgba(0,0,0,0.5);
    cursor: grab;
  }

  .viewport-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 999px;
    outline: none;
    cursor: pointer;
  }
  .viewport-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #B8FB3C;
    border: 3px solid #0A0A0F;
    box-shadow: 0 0 20px rgba(184,251,60,0.5), 0 0 60px rgba(184,251,60,0.15), 0 2px 8px rgba(0,0,0,0.5);
    cursor: grab;
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .viewport-slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 30px rgba(184,251,60,0.6), 0 0 80px rgba(184,251,60,0.2), 0 2px 12px rgba(0,0,0,0.5);
  }
  .viewport-slider::-webkit-slider-thumb:active {
    cursor: grabbing;
    transform: scale(1.08);
  }
  .viewport-slider::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #B8FB3C;
    border: 3px solid #0A0A0F;
    box-shadow: 0 0 20px rgba(184,251,60,0.5), 0 0 60px rgba(184,251,60,0.15);
    cursor: grab;
  }

  @keyframes subtlePulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
  @keyframes floatGlow {
    0%, 100% { transform: translateY(0px); opacity: 0.3; }
    50% { transform: translateY(-8px); opacity: 0.6; }
  }

  /* Hide number input spinners */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

/* ═══════════════════════════════════════════════════════
   GLASS PANEL COMPONENT
   ═══════════════════════════════════════════════════════ */

function GlassPanel({ children, className = '', glowColor, noPad, style }: {
  children: React.ReactNode; className?: string; glowColor?: string; noPad?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'rgba(14,14,20,0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: glowColor
          ? `0 0 40px ${glowColor}08, 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`
          : '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)',
        ...style,
      }}
    >
      {!noPad ? <div className="p-5">{children}</div> : children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════════════════════ */

function SectionLabel({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <div className="w-1 h-3 rounded-full" style={{ background: color || '#B8FB3C' }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: color || 'rgba(255,255,255,0.3)' }}>
        {children}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PROPERTY PANEL
   ═══════════════════════════════════════════════════════ */

function PropertyPanel({ config, setConfig }: { config: FluidConfig; setConfig: (c: FluidConfig) => void }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const updateProp = (id: string, patch: Partial<ScalingProperty>) => {
    setConfig({ ...config, properties: config.properties.map(p => p.id === id ? { ...p, ...patch } : p) });
  };

  const copyClamp = (propId: string, clampVal: string) => {
    const prop = config.properties.find(p => p.id === propId);
    if (!prop) return;
    const text = `${prop.cssProperty}: ${clampVal};`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(propId);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <div className="space-y-3">
      {/* Viewport config */}
      <GlassPanel glowColor="#B8FB3C">
        <SectionLabel color="#B8FB3C">Viewport Range</SectionLabel>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {[
            { label: 'Min Width', key: 'minViewport' as const },
            { label: 'Max Width', key: 'maxViewport' as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="text-[10px] text-white/35 mb-1.5 block font-medium">{label}</label>
              <div className="relative">
                <input
                  type="number"
                  value={config[key]}
                  onChange={e => setConfig({ ...config, [key]: Number(e.target.value) })}
                  className="w-full pl-3 pr-8 py-2.5 rounded-xl text-xs text-white font-mono outline-none transition-all duration-200 focus:ring-1"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)', ['--tw-ring-color' as string]: '#B8FB3C40' }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">px</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <label className="text-[10px] text-white/35 mb-1.5 block font-medium">Root Font Size</label>
          <div className="relative w-24">
            <input
              type="number"
              value={config.rootSize}
              onChange={e => setConfig({ ...config, rootSize: Number(e.target.value) || 16 })}
              className="w-full pl-3 pr-8 py-2.5 rounded-xl text-xs text-white font-mono outline-none transition-all"
              style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/20 font-mono">px</span>
          </div>
        </div>
      </GlassPanel>

      {/* Properties */}
      {config.properties.map((prop, idx) => (
        <motion.div
          key={prop.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.25 }}
        >
          <GlassPanel
            glowColor={prop.enabled ? prop.color : undefined}
            style={{
              opacity: prop.enabled ? 1 : 0.5,
              borderColor: prop.enabled ? `${prop.color}20` : 'rgba(255,255,255,0.04)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: prop.enabled ? `${prop.color}15` : 'rgba(255,255,255,0.04)',
                    color: prop.enabled ? prop.color : 'rgba(255,255,255,0.2)',
                    border: `1px solid ${prop.enabled ? `${prop.color}25` : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: prop.enabled ? `0 0 12px ${prop.color}15` : 'none',
                  }}
                >
                  {prop.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block leading-tight">{prop.label}</span>
                  <span className="text-[10px] text-white/25 font-mono">{prop.cssProperty}</span>
                </div>
              </div>
              <button
                onClick={() => updateProp(prop.id, { enabled: !prop.enabled })}
                className="w-11 h-6 rounded-full transition-all duration-300 relative cursor-pointer"
                style={{
                  background: prop.enabled ? prop.color : 'rgba(255,255,255,0.08)',
                  boxShadow: prop.enabled ? `0 0 16px ${prop.color}40` : 'none',
                }}
              >
                <div
                  className="absolute top-[3px] w-[18px] h-[18px] rounded-full transition-all duration-300"
                  style={{
                    left: prop.enabled ? '22px' : '3px',
                    background: prop.enabled ? '#0A0A0F' : 'rgba(255,255,255,0.25)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }}
                />
              </button>
            </div>

            {/* Sliders (animated expand) */}
            <AnimatePresence>
              {prop.enabled && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 pt-2">
                    {/* Min slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] text-white/40 font-medium">Min Value</span>
                        <div className="relative">
                          <input
                            type="number"
                            value={prop.minValue}
                            min={0}
                            max={prop.maxValue - 1}
                            onChange={e => {
                              const v = Math.min(Number(e.target.value), prop.maxValue - 1);
                              if (!isNaN(v) && v >= 0) updateProp(prop.id, { minValue: v });
                            }}
                            className="w-16 pl-2 pr-5 py-1 rounded-lg text-[11px] text-right font-mono font-bold outline-none transition-all focus:ring-1"
                            style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${prop.color}25`, color: prop.color, ['--tw-ring-color' as string]: `${prop.color}40` }}
                          />
                          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-white/20 font-mono pointer-events-none">px</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={prop.maxValue - 1}
                        value={prop.minValue}
                        onChange={e => updateProp(prop.id, { minValue: Number(e.target.value) })}
                        className="fluid-slider"
                        style={{
                          ['--slider-color' as string]: prop.color,
                          background: `linear-gradient(to right, ${prop.color} ${(prop.minValue / Math.max(prop.maxValue - 1, 1)) * 100}%, rgba(255,255,255,0.06) ${(prop.minValue / Math.max(prop.maxValue - 1, 1)) * 100}%)`,
                        }}
                      />
                    </div>
                    {/* Max slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] text-white/40 font-medium">Max Value</span>
                        <div className="relative">
                          <input
                            type="number"
                            value={prop.maxValue}
                            min={prop.minValue + 1}
                            max={200}
                            onChange={e => {
                              const v = Math.max(Number(e.target.value), prop.minValue + 1);
                              if (!isNaN(v) && v <= 200) updateProp(prop.id, { maxValue: v });
                            }}
                            className="w-16 pl-2 pr-5 py-1 rounded-lg text-[11px] text-right font-mono font-bold outline-none transition-all focus:ring-1"
                            style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${prop.color}25`, color: prop.color, ['--tw-ring-color' as string]: `${prop.color}40` }}
                          />
                          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-white/20 font-mono pointer-events-none">px</span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={prop.minValue + 1}
                        max={200}
                        value={prop.maxValue}
                        onChange={e => updateProp(prop.id, { maxValue: Number(e.target.value) })}
                        className="fluid-slider"
                        style={{
                          ['--slider-color' as string]: prop.color,
                          background: `linear-gradient(to right, ${prop.color} ${((prop.maxValue - prop.minValue - 1) / (200 - prop.minValue - 1)) * 100}%, rgba(255,255,255,0.06) ${((prop.maxValue - prop.minValue - 1) / (200 - prop.minValue - 1)) * 100}%)`,
                        }}
                      />
                    </div>
                    {/* Clamp output — clickable to copy */}
                    {(() => {
                      const clampVal = clampBuilder(config.minViewport, config.maxViewport, prop.minValue, prop.maxValue, config.rootSize);
                      const isCopied = copiedId === prop.id;
                      return (
                        <button
                          onClick={() => copyClamp(prop.id, clampVal)}
                          className="w-full flex items-center gap-2.5 mt-2 px-3.5 py-3 rounded-xl text-left transition-all duration-200 group cursor-pointer"
                          style={{
                            background: isCopied ? `${prop.color}15` : `${prop.color}08`,
                            border: `1px solid ${isCopied ? `${prop.color}35` : `${prop.color}15`}`,
                            boxShadow: isCopied ? `0 0 12px ${prop.color}15` : 'none',
                          }}
                          title="Click to copy"
                        >
                          <span className="text-[12px] font-mono break-all flex-1 leading-relaxed" style={{ color: `${prop.color}cc` }}>
                            {isCopied ? '✓ Copied to clipboard!' : clampVal}
                          </span>
                          <span
                            className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all"
                            style={{
                              background: isCopied ? `${prop.color}20` : `${prop.color}10`,
                              color: isCopied ? prop.color : `${prop.color}99`,
                            }}
                          >
                            <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            {isCopied ? 'Done' : 'Copy'}
                          </span>
                        </button>
                      );
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassPanel>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INTERACTIVE CANVAS
   ═══════════════════════════════════════════════════════ */

function InteractiveCanvas({ config, currentViewport, setCurrentViewport }: {
  config: FluidConfig; currentViewport: number; setCurrentViewport: (v: number) => void;
}) {
  const enabledProps = config.properties.filter(p => p.enabled);

  const computed = useMemo(() => {
    const vals: Record<string, number> = {};
    for (const p of enabledProps) {
      vals[p.id] = valAtVP(currentViewport, config.minViewport, config.maxViewport, p.minValue, p.maxValue);
    }
    return vals;
  }, [currentViewport, config.minViewport, config.maxViewport, enabledProps]);

  const fontSize = computed['font-size'] ?? 16;
  const padding = computed['padding'] ?? 16;
  const borderRadius = computed['border-radius'] ?? 8;
  const gap = computed['gap'] ?? 12;

  const pctPos = ((currentViewport - 320) / (1920 - 320)) * 100;

  // Determine device icon
  const deviceIcon = currentViewport < 480 ? '📱' : currentViewport < 768 ? '📱' : currentViewport < 1024 ? '📐' : '🖥';
  const deviceLabel = currentViewport < 480 ? 'Mobile' : currentViewport < 768 ? 'Mobile' : currentViewport < 1024 ? 'Tablet' : 'Desktop';

  return (
    <div className="space-y-4">
      {/* Viewport slider */}
      <GlassPanel noPad glowColor="#B8FB3C">
        <div className="px-5 pt-5 pb-2">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel color="#B8FB3C">Viewport Width</SectionLabel>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/30">{deviceIcon} {deviceLabel}</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono text-white tabular-nums">{Math.round(currentViewport)}</span>
                <span className="text-xs text-white/25 font-mono">px</span>
              </div>
            </div>
          </div>

          {/* Breakpoint tags */}
          <div className="relative mb-3 h-5">
            {BREAKPOINTS.map(bp => {
              const pos = ((bp.value - 320) / (1920 - 320)) * 100;
              const isActive = Math.abs(currentViewport - bp.value) < 30;
              return (
                <button
                  key={bp.label}
                  onClick={() => setCurrentViewport(bp.value)}
                  className="absolute transform -translate-x-1/2 transition-all duration-200"
                  style={{ left: `${pos}%` }}
                >
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-md transition-all duration-200"
                    style={{
                      color: isActive ? '#0A0A0F' : bp.color,
                      background: isActive ? bp.color : `${bp.color}15`,
                      boxShadow: isActive ? `0 0 12px ${bp.color}50` : 'none',
                    }}
                  >
                    {bp.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* The big slider */}
          <div className="relative">
            <input
              type="range"
              min={320}
              max={1920}
              step={1}
              value={currentViewport}
              onChange={e => setCurrentViewport(Number(e.target.value))}
              className="viewport-slider"
              style={{
                background: `linear-gradient(to right, #B8FB3C ${pctPos}%, rgba(255,255,255,0.06) ${pctPos}%)`,
              }}
            />
            {/* Breakpoint tick marks */}
            <div className="absolute inset-0 pointer-events-none flex items-center">
              {BREAKPOINTS.map(bp => {
                const pos = ((bp.value - 320) / (1920 - 320)) * 100;
                return (
                  <div
                    key={bp.label}
                    className="absolute w-[2px] h-3 rounded-full"
                    style={{ left: `${pos}%`, background: bp.color, opacity: 0.5, transform: 'translateX(-50%)' }}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 mb-1">
            <span className="text-[10px] text-white/15 font-mono">320</span>
            <span className="text-[10px] text-white/15 font-mono">1920</span>
          </div>
        </div>
      </GlassPanel>

      {/* Live preview card */}
      <GlassPanel noPad glowColor="#B8FB3C">
        <div className="px-5 pt-4 pb-2 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <SectionLabel color="#B8FB3C">Live Preview</SectionLabel>
          <div className="flex items-center gap-4">
            {enabledProps.map(ep => (
              <div key={ep.id} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: ep.color, boxShadow: `0 0 6px ${ep.color}60` }} />
                <span className="text-[10px] font-mono" style={{ color: `${ep.color}cc` }}>
                  {ep.label.split(' ')[0].substring(0, 4)}: <strong>{r(computed[ep.id] ?? 0, 1)}px</strong>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex items-center justify-center p-8"
          style={{
            minHeight: 280,
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(184,251,60,0.02) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(108,99,255,0.03) 0%, transparent 50%)',
          }}
        >
          {/* Preview card */}
          <motion.div
            layout
            className="relative transition-all duration-100"
            style={{
              padding: `${padding}px`,
              borderRadius: `${borderRadius}px`,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              maxWidth: 420,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: `${gap}px`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(184,251,60,0.08) 0%, transparent 70%)', animation: 'floatGlow 4s ease-in-out infinite' }}
            />
            <h3
              className="font-bold text-white leading-[1.15] tracking-tight transition-all duration-100"
              style={{ fontSize: `${fontSize}px` }}
            >
              Fluid Typography
            </h3>
            <p
              className="text-white/45 leading-relaxed transition-all duration-100"
              style={{ fontSize: `${Math.max(fontSize * 0.45, 12)}px` }}
            >
              This text scales smoothly between your min and max viewport breakpoints using CSS clamp() functions.
            </p>
            <div className="flex items-center flex-wrap" style={{ gap: `${gap}px` }}>
              <div
                className="text-[#0A0A0F] font-semibold transition-all duration-100 whitespace-nowrap"
                style={{
                  padding: `${padding * 0.4}px ${padding * 0.8}px`,
                  borderRadius: `${borderRadius}px`,
                  background: '#B8FB3C',
                  fontSize: `${Math.max(fontSize * 0.35, 11)}px`,
                  boxShadow: '0 0 16px rgba(184,251,60,0.25)',
                }}
              >
                Primary
              </div>
              <div
                className="text-white/60 font-semibold transition-all duration-100 whitespace-nowrap"
                style={{
                  padding: `${padding * 0.4}px ${padding * 0.8}px`,
                  borderRadius: `${borderRadius}px`,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: `${Math.max(fontSize * 0.35, 11)}px`,
                }}
              >
                Secondary
              </div>
            </div>
          </motion.div>
        </div>
      </GlassPanel>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SCALING GRAPH
   ═══════════════════════════════════════════════════════ */

function ScalingGraph({ config, currentViewport, setCurrentViewport }: { config: FluidConfig; currentViewport: number; setCurrentViewport: (v: number) => void }) {
  const enabledProps = config.properties.filter(p => p.enabled);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverVP, setHoverVP] = useState<number | null>(null);

  if (enabledProps.length === 0) {
    return (
      <GlassPanel>
        <div className="py-8 text-center">
          <p className="text-white/25 text-sm">Enable a property to visualize scaling</p>
        </div>
      </GlassPanel>
    );
  }

  const W = 640;
  const H = 240;
  const padL = 52;
  const padR = 24;
  const padT = 28;
  const padB = 36;
  const gW = W - padL - padR;
  const gH = H - padT - padB;

  const allVals = enabledProps.flatMap(p => [p.minValue, p.maxValue]);
  const gMin = Math.min(...allVals) * 0.7;
  const gMax = Math.max(...allVals) * 1.15;

  const x2svg = (vw: number) => padL + ((vw - config.minViewport) / (config.maxViewport - config.minViewport)) * gW;
  const y2svg = (v: number) => padT + gH - ((v - gMin) / (gMax - gMin)) * gH;
  const svg2vp = (svgX: number) => config.minViewport + ((svgX - padL) / gW) * (config.maxViewport - config.minViewport);

  const cursorX = x2svg(Math.min(Math.max(currentViewport, config.minViewport), config.maxViewport));
  const cursorInRange = currentViewport >= config.minViewport && currentViewport <= config.maxViewport;

  // Hover VP
  const activeVP = hoverVP ?? (cursorInRange ? currentViewport : null);
  const activeX = activeVP !== null ? x2svg(Math.min(Math.max(activeVP, config.minViewport), config.maxViewport)) : null;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const vp = svg2vp(svgX);
    const clamped = Math.min(Math.max(Math.round(vp), config.minViewport), config.maxViewport);
    setHoverVP(clamped);
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const vp = svg2vp(svgX);
    const clamped = Math.min(Math.max(Math.round(vp), config.minViewport), config.maxViewport);
    setCurrentViewport(clamped);
  };

  return (
    <GlassPanel noPad glowColor="#6C63FF">
      <div className="px-5 pt-4 pb-2 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <SectionLabel color="#6C63FF">Scaling Curve</SectionLabel>
        <div className="flex items-center gap-4">
          {enabledProps.map(p => (
            <div key={p.id} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}60` }} />
              <span className="text-[10px] text-white/35 font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 pt-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair"
          style={{ maxHeight: 240 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverVP(null)}
          onClick={handleClick}
        >
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map(f => {
            const y = padT + gH * (1 - f);
            const val = r(gMin + f * (gMax - gMin), 0);
            return (
              <g key={f}>
                <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="rgba(255,255,255,0.035)" strokeDasharray="2 4" />
                <text x={padL - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.22)" fontSize="11" fontFamily="monospace">{val}</text>
              </g>
            );
          })}

          {/* X labels */}
          <text x={padL} y={H - 6} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="11" fontFamily="monospace">{config.minViewport}</text>
          <text x={W - padR} y={H - 6} textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="11" fontFamily="monospace">{config.maxViewport}</text>

          {/* Breakpoint markers */}
          {BREAKPOINTS.map(bp => {
            if (bp.value < config.minViewport || bp.value > config.maxViewport) return null;
            const bx = x2svg(bp.value);
            return (
              <g key={bp.label}>
                <line x1={bx} y1={padT} x2={bx} y2={padT + gH} stroke={bp.color} strokeWidth="1" opacity="0.15" strokeDasharray="3 3" />
                <text x={bx} y={H - 6} textAnchor="middle" fill={bp.color} fontSize="10" fontFamily="monospace" opacity="0.7">{bp.value}</text>
              </g>
            );
          })}

          {/* Property lines */}
          {enabledProps.map(prop => {
            const x1 = x2svg(config.minViewport);
            const y1 = y2svg(prop.minValue);
            const x2 = x2svg(config.maxViewport);
            const y2 = y2svg(prop.maxValue);

            return (
              <g key={prop.id}>
                <defs>
                  <linearGradient id={`gfill-${prop.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={prop.color} stopOpacity="0.12" />
                    <stop offset="100%" stopColor={prop.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon
                  points={`${x1},${y1} ${x2},${y2} ${x2},${padT + gH} ${x1},${padT + gH}`}
                  fill={`url(#gfill-${prop.id})`}
                />
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={prop.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <circle cx={x1} cy={y1} r="3" fill={prop.color} opacity="0.4" />
                <circle cx={x2} cy={y2} r="3" fill={prop.color} opacity="0.4" />
              </g>
            );
          })}

          {/* Active position cursor (hover or current viewport) */}
          {activeVP !== null && activeX !== null && (
            <>
              {/* Vertical cursor line */}
              <line x1={activeX} y1={padT} x2={activeX} y2={padT + gH} stroke={hoverVP !== null ? 'rgba(255,255,255,0.35)' : '#B8FB3C'} strokeWidth="1" strokeDasharray={hoverVP !== null ? undefined : '2 3'} opacity={hoverVP !== null ? 0.6 : 0.3} />

              {/* Dots on each line at the cursor */}
              {enabledProps.map(prop => {
                const cv = valAtVP(activeVP, config.minViewport, config.maxViewport, prop.minValue, prop.maxValue);
                const dy = y2svg(cv);
                return (
                  <g key={`dot-${prop.id}`}>
                    <circle cx={activeX} cy={dy} r="7" fill={prop.color} opacity="0.15" />
                    <circle cx={activeX} cy={dy} r="4.5" fill={prop.color} />
                    <circle cx={activeX} cy={dy} r="2" fill="#0A0A0F" />
                  </g>
                );
              })}

              {/* Floating tooltip */}
              {(() => {
                const tooltipW = 160;
                const tooltipH = 20 + enabledProps.length * 20;
                // Keep tooltip inside the SVG area
                let tx = activeX + 14;
                if (tx + tooltipW > W - padR) tx = activeX - tooltipW - 14;
                let ty = padT + 8;

                return (
                  <g>
                    {/* Tooltip background */}
                    <rect x={tx} y={ty} width={tooltipW} height={tooltipH} rx="8" fill="rgba(10,10,15,0.94)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    {/* Viewport label */}
                    <text x={tx + 10} y={ty + 15} fill="#B8FB3C" fontSize="12" fontFamily="monospace" fontWeight="bold">
                      {Math.round(activeVP)}px
                    </text>
                    <text x={tx + tooltipW - 10} y={ty + 14} textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">
                      {hoverVP !== null ? 'click to set' : 'current'}
                    </text>
                    {/* Property values */}
                    {enabledProps.map((prop, i) => {
                      const cv = valAtVP(activeVP, config.minViewport, config.maxViewport, prop.minValue, prop.maxValue);
                      return (
                        <g key={prop.id}>
                          <circle cx={tx + 14} cy={ty + 30 + i * 20} r="4" fill={prop.color} />
                          <text x={tx + 24} y={ty + 34 + i * 20} fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace">
                            {prop.label.split(' ')[0]}
                          </text>
                          <text x={tx + tooltipW - 10} y={ty + 34 + i * 20} textAnchor="end" fill={prop.color} fontSize="12" fontFamily="monospace" fontWeight="bold">
                            {r(cv, 1)}px
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })()}
            </>
          )}
        </svg>

        {/* Hint */}
        <div className="flex items-center justify-center gap-2 mt-1 mb-1">
          <svg width="10" height="10" fill="none" stroke="rgba(255,255,255,0.2)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>
          <span className="text-[10px] text-white/20">Hover to inspect · Click to set viewport</span>
        </div>
      </div>
    </GlassPanel>
  );
}

/* ═══════════════════════════════════════════════════════
   OUTPUT PANEL
   ═══════════════════════════════════════════════════════ */

function OutputPanel({ config }: { config: FluidConfig }) {
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedTw, setCopiedTw] = useState(false);
  const enabledProps = config.properties.filter(p => p.enabled);

  const cssOut = useMemo(() => enabledProps.map(p =>
    `${p.cssProperty}: ${clampBuilder(config.minViewport, config.maxViewport, p.minValue, p.maxValue, config.rootSize)};`
  ).join('\n'), [config, enabledProps]);

  const twOut = useMemo(() => {
    const entries = enabledProps.map(p => {
      const clamp = clampBuilder(config.minViewport, config.maxViewport, p.minValue, p.maxValue, config.rootSize);
      const k = p.id === 'font-size' ? 'fontSize' : p.id === 'border-radius' ? 'borderRadius' : p.id;
      return `  '${k}': '${clamp}',`;
    });
    return `// tailwind.config.js → theme.extend\n{\n${entries.join('\n')}\n}`;
  }, [config, enabledProps]);

  const copyCss = useCallback(() => { navigator.clipboard.writeText(cssOut).then(() => { setCopiedCss(true); setTimeout(() => setCopiedCss(false), 2000); }); }, [cssOut]);
  const copyTw = useCallback(() => { navigator.clipboard.writeText(twOut).then(() => { setCopiedTw(true); setTimeout(() => setCopiedTw(false), 2000); }); }, [twOut]);

  if (enabledProps.length === 0) {
    return (
      <GlassPanel>
        <div className="py-8 text-center">
          <p className="text-white/25 text-sm">Enable a property to generate output</p>
        </div>
      </GlassPanel>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* CSS output */}
      <GlassPanel noPad glowColor="#B8FB3C">
        <div className="flex items-center justify-between px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <span className="text-[11px] font-semibold tracking-wide text-white/35">fluid-styles.css</span>
          <button
            onClick={copyCss}
            className="px-3 py-1 rounded-lg text-[11px] font-bold transition-all duration-200"
            style={{ background: copiedCss ? 'rgba(184,251,60,0.15)' : 'rgba(255,255,255,0.06)', color: copiedCss ? '#B8FB3C' : 'rgba(255,255,255,0.5)' }}
          >
            {copiedCss ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre className="p-5 text-[13px] font-mono leading-7 whitespace-pre-wrap" style={{ minHeight: 80 }}>
          {enabledProps.map(p => {
            const clamp = clampBuilder(config.minViewport, config.maxViewport, p.minValue, p.maxValue, config.rootSize);
            return (
              <div key={p.id}>
                <span style={{ color: '#56b6c2' }}>{p.cssProperty}</span>
                <span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
                <span style={{ color: p.color }}>{clamp}</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>;</span>
              </div>
            );
          })}
        </pre>
      </GlassPanel>

      {/* Tailwind output */}
      <GlassPanel noPad glowColor="#6C63FF">
        <div className="flex items-center justify-between px-4 py-3" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
          </div>
          <span className="text-[11px] font-semibold tracking-wide text-white/35">tailwind.config.js</span>
          <button
            onClick={copyTw}
            className="px-3 py-1 rounded-lg text-[11px] font-bold transition-all duration-200"
            style={{ background: copiedTw ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', color: copiedTw ? '#a78bfa' : 'rgba(255,255,255,0.5)' }}
          >
            {copiedTw ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre className="p-5 text-[13px] font-mono leading-7 whitespace-pre-wrap" style={{ minHeight: 80 }}>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>{'// tailwind.config.js → theme.extend'}</span>{'\n'}
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>{'{'}</span>{'\n'}
          {enabledProps.map(p => {
            const clamp = clampBuilder(config.minViewport, config.maxViewport, p.minValue, p.maxValue, config.rootSize);
            const k = p.id === 'font-size' ? 'fontSize' : p.id === 'border-radius' ? 'borderRadius' : p.id;
            return (
              <div key={p.id}>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>{'  '}</span>
                <span style={{ color: '#e5c07b' }}>&apos;{k}&apos;</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>: </span>
                <span style={{ color: '#98c379' }}>&apos;{clamp}&apos;</span>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>,</span>
              </div>
            );
          })}
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>{'}'}</span>
        </pre>
      </GlassPanel>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function FluidPlayground() {
  const router = useRouter();
  const [config, setConfig] = useState<FluidConfig>(DEFAULT_CONFIG);
  const [currentViewport, setCurrentViewport] = useState(768);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [urlCopied, setUrlCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from URL or localStorage
  useEffect(() => {
    if (!router.isReady) return;
    // Check for new compact URL params (v=375-1440&fs=12.38...)
    if (router.query.v) {
      const d = decodeConfigFromURL(router.query as Record<string, string | string[] | undefined>);
      if (d) { setConfig(d); setMounted(true); return; }
    }
    // Fallback: check for legacy base64 (c=...) param
    const legacyC = router.query.c as string | undefined;
    if (legacyC) {
      const d = decodeConfigLS(legacyC);
      if (d) { setConfig(d); setMounted(true); return; }
    }
    // Fallback: localStorage
    try {
      const s = localStorage.getItem(LS_KEY);
      if (s) { const d = decodeConfigLS(s); if (d) setConfig(d); }
    } catch {}
    setMounted(true);
  }, [router.isReady, router.query.v, router.query.c]);

  // Persist
  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem(LS_KEY, encodeConfigLS(config)); } catch {}
  }, [config, mounted]);

  const applyPreset = (preset: Preset) => {
    setConfig(prev => ({ ...prev, ...preset.config }));
    setActivePreset(preset.id);
  };

  const handleShareUrl = useCallback(() => {
    const url = `${window.location.origin}${window.location.pathname}?${encodeConfigToURL(config)}`;
    navigator.clipboard.writeText(url).then(() => { setUrlCopied(true); setTimeout(() => setUrlCopied(false), 2500); });
  }, [config]);

  const accent = '#B8FB3C';
  const enabledCount = config.properties.filter(p => p.enabled).length;

  return (
    <>
      <style>{SLIDER_STYLES}</style>
      <PageSEO
        title="Fluid Design Playground — UIXplor"
        description="Interactive fluid typography and spacing tool. Generate CSS clamp() values and Tailwind config for responsive design. Visualize scaling curves in real-time."
        path="/toolkit/fluid"
        keywords={['fluid typography', 'CSS clamp', 'responsive design', 'clamp generator', 'fluid spacing', 'tailwind clamp']}
      />
      <main className="min-h-screen relative" style={{ background: '#0A0A0F' }}>
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(ellipse, ${accent}04 0%, transparent 60%)` }} />
          <div className="absolute top-[60%] left-[15%] w-[400px] h-[400px]" style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.03) 0%, transparent 60%)' }} />
          <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px]" style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.02) 0%, transparent 60%)' }} />
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4">
                <a href="/toolkit" className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/25 hover:text-white/50 transition-colors">
                  Toolkit
                </a>
                <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.15)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
                  Fluid Design
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
                Fluid Design{' '}
                <span className="relative">
                  <span style={{ color: accent }}>Playground</span>
                  <div className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" style={{ background: `linear-gradient(to right, ${accent}, transparent)`, opacity: 0.4 }} />
                </span>
              </h1>
              <p className="text-white/30 text-base max-w-xl leading-relaxed">
                Visualize how your UI scales across screen sizes. Generate production-ready CSS clamp() and Tailwind config — completely interactive.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <GlassPanel noPad>
              <div className="px-5 py-4 flex flex-wrap items-center gap-4">
                {/* Presets */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/20 mr-1">Presets</span>
                  {PRESETS.map(preset => {
                    const isActive = activePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => applyPreset(preset)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border group relative overflow-hidden"
                        style={{
                          background: isActive ? `${accent}10` : 'rgba(255,255,255,0.02)',
                          borderColor: isActive ? `${accent}35` : 'rgba(255,255,255,0.06)',
                          color: isActive ? accent : 'rgba(255,255,255,0.35)',
                          boxShadow: isActive ? `0 0 20px ${accent}10` : 'none',
                        }}
                      >
                        {isActive && (
                          <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${accent}05, transparent)` }} />
                        )}
                        <span className="text-sm relative">{preset.icon}</span>
                        <span className="relative hidden sm:inline">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 min-w-[1px]" />

                {/* Unit toggle */}
                <div className="flex items-center p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {(['px', 'rem', 'em'] as Unit[]).map(u => (
                    <button
                      key={u}
                      onClick={() => setConfig(p => ({ ...p, unit: u }))}
                      className="px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                      style={{
                        background: config.unit === u ? `${accent}15` : 'transparent',
                        color: config.unit === u ? accent : 'rgba(255,255,255,0.25)',
                        boxShadow: config.unit === u ? `0 0 8px ${accent}10` : 'none',
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>

                {/* Stats badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}`, animation: 'subtlePulse 2s ease-in-out infinite' }} />
                  <span className="text-[11px] text-white/30 font-medium">{enabledCount} active</span>
                </div>

                {/* Share */}
                <button
                  onClick={handleShareUrl}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold transition-all duration-300 border"
                  style={{
                    background: urlCopied ? `${accent}12` : 'rgba(255,255,255,0.03)',
                    borderColor: urlCopied ? `${accent}35` : 'rgba(255,255,255,0.06)',
                    color: urlCopied ? accent : 'rgba(255,255,255,0.4)',
                    boxShadow: urlCopied ? `0 0 20px ${accent}15` : 'none',
                  }}
                >
                  {urlCopied ? (
                    <><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Link Copied!</>
                  ) : (
                    <><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>Share</>
                  )}
                </button>
              </div>
            </GlassPanel>
          </motion.div>
        </section>

        {/* Workspace */}
        <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          >
            {/* Left: Properties */}
            <div className="lg:col-span-4 xl:col-span-3">
              <PropertyPanel config={config} setConfig={setConfig} />
            </div>

            {/* Right: Canvas + Graph */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-5">
              <InteractiveCanvas config={config} currentViewport={currentViewport} setCurrentViewport={setCurrentViewport} />
              <ScalingGraph config={config} currentViewport={currentViewport} setCurrentViewport={setCurrentViewport} />
            </div>
          </motion.div>
        </section>

        {/* Output */}
        <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* Section divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}10`, border: `1px solid ${accent}20`, boxShadow: `0 0 12px ${accent}10` }}
                >
                  <svg width="16" height="16" fill="none" stroke={accent} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Generated Output</h2>
                  <p className="text-[11px] text-white/25">Copy-ready CSS clamp values and Tailwind config</p>
                </div>
              </div>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
            </div>
            <OutputPanel config={config} />
          </motion.div>
        </section>

        {/* Bottom CTA */}
        <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-10 border text-center relative overflow-hidden"
            style={{
              background: 'rgba(14,14,20,0.5)',
              borderColor: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}04 0%, transparent 60%)` }} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 relative">Explore more tools</h2>
            <p className="text-white/30 text-sm mb-8 max-w-md mx-auto relative">Box shadows, gradients, animations, CSS → Tailwind converter, and more in the Dev Toolkit.</p>
            <a
              href="/toolkit"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#0a0a0f] transition-all duration-200 hover:scale-[1.03]"
              style={{ background: accent, boxShadow: `0 0 30px ${accent}30` }}
            >
              Open Toolkit
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </motion.div>
        </section>
      </main>
    </>
  );
}
