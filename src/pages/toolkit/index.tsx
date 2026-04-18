'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

type ActiveTool = 'shadow' | 'gradient' | 'radius' | 'animation' | 'tailwind';
const VALID_TOOLS: ActiveTool[] = ['shadow', 'gradient', 'radius', 'animation', 'tailwind'];

// ————— Box Shadow Generator —————
interface ShadowLayer {
  x: number; y: number; blur: number; spread: number; color: string; opacity: number; inset: boolean;
}

function ShadowTool() {
  const [l, setL] = useState<ShadowLayer>({ x: 8, y: 8, blur: 24, spread: 0, color: '#6C63FF', opacity: 40, inset: false });
  const [copied, setCopied] = useState(false);
  const [previewBg, setPreviewBg] = useState<'dark' | 'white' | 'grey'>('dark');

  const shadow = `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}${Math.round(l.opacity * 2.55).toString(16).padStart(2, '0')}`;
  const css = `box-shadow: ${shadow};`;

  const copy = () => { navigator.clipboard.writeText(css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };

  const bgStyles = {
    dark: { bg: '#0A0A0A', boxColor: 'rgba(255,255,255,0.12)' },
    white: { bg: '#FFFFFF', boxColor: 'rgba(0,0,0,0.08)' },
    grey: { bg: '#606070', boxColor: 'rgba(255,255,255,0.15)' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        {([
          ['X Offset', 'x', -40, 40],
          ['Y Offset', 'y', -40, 40],
          ['Blur', 'blur', 0, 80],
          ['Spread', 'spread', -20, 40],
          ['Opacity (%)', 'opacity', 0, 100],
        ] as [string, keyof ShadowLayer, number, number][]).map(([label, key, min, max]) => (
          <div key={key}>
            <div className="flex justify-between mb-1">
              <span className="text-xs text-white/50">{label}</span>
              <span className="text-xs font-mono text-white/70">{l[key]}</span>
            </div>
            <input type="range" min={min} max={max} value={l[key] as number} onChange={(e) => setL((p) => ({ ...p, [key]: Number(e.target.value) }))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, #6C63FF ${(((l[key] as number) - min) / (max - min)) * 100}%, #2A2A2A ${(((l[key] as number) - min) / (max - min)) * 100}%)` }} />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <input type="color" value={l.color} onChange={(e) => setL((p) => ({ ...p, color: e.target.value }))} className="w-8 h-8 rounded-lg cursor-pointer" />
          <span className="text-sm text-white/60">Shadow Color</span>
          <label className="ml-auto flex items-center gap-2 cursor-pointer">
            <div onClick={() => setL((p) => ({ ...p, inset: !p.inset }))}
              className="w-9 h-5 rounded-full transition-colors relative"
              style={{ background: l.inset ? '#6C63FF' : '#2A2A2A' }}>
              <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: l.inset ? '18px' : '2px' }} />
            </div>
            <span className="text-xs text-white/50">Inset</span>
          </label>
        </div>
      </div>
      <div className="space-y-4">
        {/* Preview bg toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/40 mr-1">Preview bg:</span>
          {(['dark', 'white', 'grey'] as const).map((bg) => (
            <button key={bg} onClick={() => setPreviewBg(bg)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border capitalize"
              style={{
                background: previewBg === bg ? 'rgba(108,99,255,0.15)' : 'rgba(255,255,255,0.04)',
                borderColor: previewBg === bg ? 'rgba(108,99,255,0.4)' : '#2A2A2A',
                color: previewBg === bg ? '#a78bfa' : 'rgba(255,255,255,0.4)',
              }}>
              <span className="w-3 h-3 rounded-full border border-white/20 inline-block" style={{ background: bgStyles[bg].bg }} />
              {bg}
            </button>
          ))}
        </div>
        <div className="h-40 rounded-2xl flex items-center justify-center border transition-colors duration-300" style={{ background: bgStyles[previewBg].bg, borderColor: '#2A2A2A' }}>
          <div className="w-20 h-20 rounded-2xl transition-colors duration-300" style={{ background: bgStyles[previewBg].boxColor, boxShadow: shadow }} />
        </div>
        <div className="rounded-xl overflow-hidden border relative" style={{ background: '#0D0D0D', borderColor: '#2A2A2A' }}>
          <pre className="p-3 text-xs font-mono text-white/70">{css}</pre>
          <button onClick={copy} className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{ background: copied ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.5)' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ————— Gradient Generator —————
function GradientTool() {
  const [c1, setC1] = useState('#6C63FF');
  const [c2, setC2] = useState('#f472b6');
  const [c3, setC3] = useState('');
  const [dir, setDir] = useState(135);
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [copied, setCopied] = useState(false);

  const stops = c3 ? `${c1}, ${c3}, ${c2}` : `${c1}, ${c2}`;
  const gradient = type === 'linear' ? `linear-gradient(${dir}deg, ${stops})` : `radial-gradient(circle, ${stops})`;
  const css = `background: ${gradient};`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(['linear', 'radial'] as const).map((t) => (
            <button key={t} onClick={() => setType(t)}
              className="flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all"
              style={{ background: type === t ? '#6C63FF' : 'rgba(255,255,255,0.04)', color: type === t ? '#fff' : 'rgba(255,255,255,0.4)' }}>
              {t}
            </button>
          ))}
        </div>
        {type === 'linear' && (
          <div>
            <div className="flex justify-between mb-1"><span className="text-xs text-white/50">Direction</span><span className="text-xs font-mono text-white/70">{dir}°</span></div>
            <input type="range" min={0} max={360} value={dir} onChange={(e) => setDir(Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #6C63FF ${(dir / 360) * 100}%, #2A2A2A ${(dir / 360) * 100}%)` }} />
          </div>
        )}
        <div className="space-y-3">
          {[['Color 1', c1, setC1], ['Color 2 (mid)', c3, setC3], ['Color 3', c2, setC2]].map(([label, val, setter]) => (
            <div key={label as string} className="flex items-center gap-3">
              <input type="color" value={(val as string) || '#ffffff'} onChange={(e) => (setter as (v: string) => void)(e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer" />
              <span className="flex-1 text-xs text-white/50">{label as string}</span>
              <span className="text-xs font-mono text-white/40">{(val as string) || 'optional'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-40 rounded-2xl border" style={{ background: gradient, borderColor: '#2A2A2A' }} />
        <div className="rounded-xl overflow-hidden border relative" style={{ background: '#0D0D0D', borderColor: '#2A2A2A' }}>
          <pre className="p-3 text-xs font-mono text-white/70 whitespace-pre-wrap break-all">{css}</pre>
          <button onClick={() => { navigator.clipboard.writeText(css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
            className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{ background: copied ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.5)' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
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
          <div onClick={() => setLinked(!linked)} className="w-9 h-5 rounded-full transition-colors relative" style={{ background: linked ? '#6C63FF' : '#2A2A2A' }}>
            <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all" style={{ left: linked ? '18px' : '2px' }} />
          </div>
          <span className="text-xs text-white/50">Link all corners</span>
        </label>
        {([['Top Left', 'tl'], ['Top Right', 'tr'], ['Bottom Left', 'bl'], ['Bottom Right', 'br']] as [string, keyof typeof corners][]).map(([label, key]) => (
          <div key={key}>
            <div className="flex justify-between mb-1"><span className="text-xs text-white/50">{label}</span><span className="text-xs font-mono text-white/70">{corners[key]}px</span></div>
            <input type="range" min={0} max={80} value={corners[key]} onChange={(e) => setCorner(key, Number(e.target.value))} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #6C63FF ${(corners[key] / 80) * 100}%, #2A2A2A ${(corners[key] / 80) * 100}%)` }} />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="h-40 rounded-none flex items-center justify-center border" style={{ background: '#0A0A0A', borderColor: '#2A2A2A', borderRadius: 12 }}>
          <div className="w-36 h-20 bg-gradient-to-br from-[#6C63FF] to-[#8b5cf6]"
            style={{ borderRadius: `${corners.tl}px ${corners.tr}px ${corners.br}px ${corners.bl}px` }} />
        </div>
        <div className="rounded-xl overflow-hidden border relative" style={{ background: '#0D0D0D', borderColor: '#2A2A2A' }}>
          <pre className="p-3 text-xs font-mono text-white/70">{css}</pre>
          <button onClick={() => { navigator.clipboard.writeText(css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
            className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{ background: copied ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.5)' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ————— CSS Animation Generator —————
function AnimationTool() {
  const [anim, setAnim] = useState({ type: 'fadeIn', duration: 0.6, delay: 0, easing: 'ease', iteration: '1', direction: 'normal' });
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
    animation: `${anim.type} ${anim.duration}s ${anim.easing} ${anim.delay}s ${anim.iteration === 'infinite' ? 'infinite' : parseInt(anim.iteration)} ${anim.direction} both`,
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
              <button key={t} onClick={() => { setAnim((p) => ({ ...p, type: t })); setPreviewKey(k => k + 1); }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
                style={{ background: anim.type === t ? '#6C63FF' : 'rgba(255,255,255,0.04)', color: anim.type === t ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        {([['Duration (s)', 'duration', 0.1, 3, 0.1], ['Delay (s)', 'delay', 0, 2, 0.1]] as [string, keyof typeof anim, number, number, number][]).map(([label, key, min, max, step]) => (
          <div key={key}>
            <div className="flex justify-between mb-1"><span className="text-xs text-white/50">{label}</span><span className="text-xs font-mono text-white/70">{anim[key]}s</span></div>
            <input type="range" min={min} max={max} step={step} value={anim[key] as number} onChange={(e) => { setAnim((p) => ({ ...p, [key]: Number(e.target.value) })); setPreviewKey(k => k + 1); }} className="w-full h-1.5 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, #6C63FF ${(((anim[key] as number) - min) / (max - min)) * 100}%, #2A2A2A ${(((anim[key] as number) - min) / (max - min)) * 100}%)` }} />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-white/50 mb-1">Easing</p>
            <select value={anim.easing} onChange={(e) => { setAnim((p) => ({ ...p, easing: e.target.value })); setPreviewKey(k => k + 1); }}
              className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none"
              style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}>
              {['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier(0.34,1.56,0.64,1)'].map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <p className="text-xs text-white/50 mb-1">Iteration</p>
            <select value={anim.iteration} onChange={(e) => { setAnim((p) => ({ ...p, iteration: e.target.value })); setPreviewKey(k => k + 1); }}
              className="w-full px-3 py-2 rounded-lg text-xs text-white outline-none"
              style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}>
              {['1', '2', '3', 'infinite'].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <button
          onClick={() => setPreviewKey(k => k + 1)}
          className="w-full py-2 rounded-lg text-xs font-semibold transition-all border"
          style={{ background: 'rgba(108,99,255,0.08)', borderColor: 'rgba(108,99,255,0.3)', color: '#a78bfa' }}
        >
          ▶ Replay Animation
        </button>
      </div>
      <div className="space-y-4">
        {/* Live preview */}
        <div className="h-40 rounded-2xl flex flex-col items-center justify-center gap-3 border relative overflow-hidden" style={{ background: '#0A0A0A', borderColor: '#2A2A2A' }}>
          <style>{keyframes[anim.type]}</style>
          <div
            key={previewKey}
            className="w-16 h-16 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #a78bfa)', ...previewStyle }}
          />
          <span className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.2)' }}>Live Preview — {anim.type}</span>
        </div>
        <div className="rounded-xl overflow-hidden border relative" style={{ background: '#0D0D0D', borderColor: '#2A2A2A', minHeight: 160 }}>
          <pre className="p-3 text-[11px] font-mono text-white/60 leading-relaxed whitespace-pre-wrap">{css}</pre>
          <button onClick={() => { navigator.clipboard.writeText(css).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
            className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{ background: copied ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.5)' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ————— Tailwind Converter —————
const cssToTailwind: Record<string, string> = {
  'display: flex': 'flex',
  'display: inline-flex': 'inline-flex',
  'display: grid': 'grid',
  'display: inline-grid': 'inline-grid',
  'display: block': 'block',
  'display: inline-block': 'inline-block',
  'display: inline': 'inline',
  'display: none': 'hidden',
  'display: contents': 'contents',
  'display: table': 'table',
  'display: table-row': 'table-row',
  'display: table-cell': 'table-cell',
  'display: flow-root': 'flow-root',

  'flex-direction: row': 'flex-row',
  'flex-direction: row-reverse': 'flex-row-reverse',
  'flex-direction: column': 'flex-col',
  'flex-direction: column-reverse': 'flex-col-reverse',
  'flex-wrap: wrap': 'flex-wrap',
  'flex-wrap: wrap-reverse': 'flex-wrap-reverse',
  'flex-wrap: nowrap': 'flex-nowrap',
  'flex: 1 1 0%': 'flex-1',
  'flex: 1 1 auto': 'flex-auto',
  'flex: 0 1 auto': 'flex-initial',
  'flex: none': 'flex-none',
  'flex-grow: 0': 'grow-0',
  'flex-grow: 1': 'grow',
  'flex-shrink: 0': 'shrink-0',
  'flex-shrink: 1': 'shrink',
  'order: -1': '-order-1',
  'order: 0': 'order-none',
  'order: 1': 'order-1',
  'order: 2': 'order-2',
  'order: 9999': 'order-last',
  'order: -9999': 'order-first',

  'align-items: flex-start': 'items-start',
  'align-items: flex-end': 'items-end',
  'align-items: center': 'items-center',
  'align-items: baseline': 'items-baseline',
  'align-items: stretch': 'items-stretch',
  'align-self: auto': 'self-auto',
  'align-self: flex-start': 'self-start',
  'align-self: flex-end': 'self-end',
  'align-self: center': 'self-center',
  'align-self: stretch': 'self-stretch',
  'align-self: baseline': 'self-baseline',
  'align-content: flex-start': 'content-start',
  'align-content: flex-end': 'content-end',
  'align-content: center': 'content-center',
  'align-content: space-between': 'content-between',
  'align-content: space-around': 'content-around',
  'align-content: space-evenly': 'content-evenly',

  'justify-content: flex-start': 'justify-start',
  'justify-content: flex-end': 'justify-end',
  'justify-content: center': 'justify-center',
  'justify-content: space-between': 'justify-between',
  'justify-content: space-around': 'justify-around',
  'justify-content: space-evenly': 'justify-evenly',
  'justify-items: start': 'justify-items-start',
  'justify-items: end': 'justify-items-end',
  'justify-items: center': 'justify-items-center',
  'justify-items: stretch': 'justify-items-stretch',
  'justify-self: auto': 'justify-self-auto',
  'justify-self: start': 'justify-self-start',
  'justify-self: end': 'justify-self-end',
  'justify-self: center': 'justify-self-center',
  'justify-self: stretch': 'justify-self-stretch',

  'place-content: center': 'place-content-center',
  'place-items: center': 'place-items-center',
  'place-self: center': 'place-self-center',

  'grid-template-columns: repeat(1, minmax(0, 1fr))': 'grid-cols-1',
  'grid-template-columns: repeat(2, minmax(0, 1fr))': 'grid-cols-2',
  'grid-template-columns: repeat(3, minmax(0, 1fr))': 'grid-cols-3',
  'grid-template-columns: repeat(4, minmax(0, 1fr))': 'grid-cols-4',
  'grid-template-columns: repeat(6, minmax(0, 1fr))': 'grid-cols-6',
  'grid-template-columns: repeat(12, minmax(0, 1fr))': 'grid-cols-12',
  'grid-template-columns: none': 'grid-cols-none',
  'grid-template-rows: repeat(1, minmax(0, 1fr))': 'grid-rows-1',
  'grid-template-rows: repeat(2, minmax(0, 1fr))': 'grid-rows-2',
  'grid-template-rows: repeat(3, minmax(0, 1fr))': 'grid-rows-3',
  'grid-template-rows: none': 'grid-rows-none',
  'grid-auto-flow: row': 'grid-flow-row',
  'grid-auto-flow: column': 'grid-flow-col',
  'grid-auto-flow: dense': 'grid-flow-dense',
  'grid-column: span 1 / span 1': 'col-span-1',
  'grid-column: span 2 / span 2': 'col-span-2',
  'grid-column: span 3 / span 3': 'col-span-3',
  'grid-column: span 4 / span 4': 'col-span-4',
  'grid-column: span 6 / span 6': 'col-span-6',
  'grid-column: 1 / -1': 'col-span-full',

  'position: static': 'static',
  'position: relative': 'relative',
  'position: absolute': 'absolute',
  'position: fixed': 'fixed',
  'position: sticky': 'sticky',

  'top: 0': 'top-0',
  'right: 0': 'right-0',
  'bottom: 0': 'bottom-0',
  'left: 0': 'left-0',
  'inset: 0': 'inset-0',
  'top: auto': 'top-auto',
  'right: auto': 'right-auto',
  'bottom: auto': 'bottom-auto',
  'left: auto': 'left-auto',

  'z-index: 0': 'z-0',
  'z-index: 10': 'z-10',
  'z-index: 20': 'z-20',
  'z-index: 30': 'z-30',
  'z-index: 40': 'z-40',
  'z-index: 50': 'z-50',
  'z-index: auto': 'z-auto',

  'width: 100%': 'w-full',
  'width: auto': 'w-auto',
  'width: 100vw': 'w-screen',
  'width: min-content': 'w-min',
  'width: max-content': 'w-max',
  'width: fit-content': 'w-fit',
  'height: 100%': 'h-full',
  'height: auto': 'h-auto',
  'height: 100vh': 'h-screen',
  'height: min-content': 'h-min',
  'height: max-content': 'h-max',
  'height: fit-content': 'h-fit',
  'min-width: 0': 'min-w-0',
  'min-width: 100%': 'min-w-full',
  'min-width: min-content': 'min-w-min',
  'min-width: max-content': 'min-w-max',
  'min-height: 0': 'min-h-0',
  'min-height: 100%': 'min-h-full',
  'min-height: 100vh': 'min-h-screen',
  'max-width: none': 'max-w-none',
  'max-width: 100%': 'max-w-full',
  'max-height: none': 'max-h-none',
  'max-height: 100%': 'max-h-full',
  'max-height: 100vh': 'max-h-screen',

  'overflow: hidden': 'overflow-hidden',
  'overflow: auto': 'overflow-auto',
  'overflow: scroll': 'overflow-scroll',
  'overflow: visible': 'overflow-visible',
  'overflow-x: hidden': 'overflow-x-hidden',
  'overflow-x: auto': 'overflow-x-auto',
  'overflow-x: scroll': 'overflow-x-scroll',
  'overflow-y: hidden': 'overflow-y-hidden',
  'overflow-y: auto': 'overflow-y-auto',
  'overflow-y: scroll': 'overflow-y-scroll',

  'font-weight: 100': 'font-thin',
  'font-weight: 200': 'font-extralight',
  'font-weight: 300': 'font-light',
  'font-weight: 400': 'font-normal',
  'font-weight: 500': 'font-medium',
  'font-weight: 600': 'font-semibold',
  'font-weight: 700': 'font-bold',
  'font-weight: 800': 'font-extrabold',
  'font-weight: 900': 'font-black',
  'font-style: italic': 'italic',
  'font-style: normal': 'not-italic',
  'font-size: 0.75rem': 'text-xs',
  'font-size: 12px': 'text-xs',
  'font-size: 0.875rem': 'text-sm',
  'font-size: 14px': 'text-sm',
  'font-size: 1rem': 'text-base',
  'font-size: 16px': 'text-base',
  'font-size: 1.125rem': 'text-lg',
  'font-size: 18px': 'text-lg',
  'font-size: 1.25rem': 'text-xl',
  'font-size: 20px': 'text-xl',
  'font-size: 1.5rem': 'text-2xl',
  'font-size: 24px': 'text-2xl',
  'font-size: 1.875rem': 'text-3xl',
  'font-size: 30px': 'text-3xl',
  'font-size: 2.25rem': 'text-4xl',
  'font-size: 36px': 'text-4xl',
  'font-size: 3rem': 'text-5xl',
  'font-size: 48px': 'text-5xl',
  'font-size: 3.75rem': 'text-6xl',

  'text-align: left': 'text-left',
  'text-align: center': 'text-center',
  'text-align: right': 'text-right',
  'text-align: justify': 'text-justify',
  'text-transform: uppercase': 'uppercase',
  'text-transform: lowercase': 'lowercase',
  'text-transform: capitalize': 'capitalize',
  'text-transform: none': 'normal-case',
  'text-decoration: underline': 'underline',
  'text-decoration: line-through': 'line-through',
  'text-decoration: none': 'no-underline',
  'text-decoration-line: underline': 'underline',
  'text-decoration-line: line-through': 'line-through',
  'text-decoration-line: none': 'no-underline',
  'text-overflow: ellipsis': 'text-ellipsis',
  'text-overflow: clip': 'text-clip',
  'white-space: nowrap': 'whitespace-nowrap',
  'white-space: normal': 'whitespace-normal',
  'white-space: pre': 'whitespace-pre',
  'white-space: pre-wrap': 'whitespace-pre-wrap',
  'white-space: pre-line': 'whitespace-pre-line',
  'white-space: break-spaces': 'whitespace-break-spaces',
  'word-break: break-all': 'break-all',
  'word-break: break-word': 'break-words',
  'word-break: normal': 'break-normal',
  'overflow-wrap: break-word': 'break-words',
  'line-height: 1': 'leading-none',
  'line-height: 1.25': 'leading-tight',
  'line-height: 1.375': 'leading-snug',
  'line-height: 1.5': 'leading-normal',
  'line-height: 1.625': 'leading-relaxed',
  'line-height: 2': 'leading-loose',
  'letter-spacing: -0.05em': 'tracking-tighter',
  'letter-spacing: -0.025em': 'tracking-tight',
  'letter-spacing: 0': 'tracking-normal',
  'letter-spacing: 0.025em': 'tracking-wide',
  'letter-spacing: 0.05em': 'tracking-wider',
  'letter-spacing: 0.1em': 'tracking-widest',
  'vertical-align: baseline': 'align-baseline',
  'vertical-align: top': 'align-top',
  'vertical-align: middle': 'align-middle',
  'vertical-align: bottom': 'align-bottom',
  'vertical-align: text-top': 'align-text-top',
  'vertical-align: text-bottom': 'align-text-bottom',

  'list-style-type: none': 'list-none',
  'list-style-type: disc': 'list-disc',
  'list-style-type: decimal': 'list-decimal',
  'list-style-position: inside': 'list-inside',
  'list-style-position: outside': 'list-outside',

  'border-radius: 0': 'rounded-none',
  'border-radius: 0px': 'rounded-none',
  'border-radius: 2px': 'rounded-sm',
  'border-radius: 4px': 'rounded',
  'border-radius: 6px': 'rounded-md',
  'border-radius: 8px': 'rounded-lg',
  'border-radius: 12px': 'rounded-xl',
  'border-radius: 16px': 'rounded-2xl',
  'border-radius: 24px': 'rounded-3xl',
  'border-radius: 9999px': 'rounded-full',
  'border-radius: 50%': 'rounded-full',
  'border-style: solid': 'border-solid',
  'border-style: dashed': 'border-dashed',
  'border-style: dotted': 'border-dotted',
  'border-style: double': 'border-double',
  'border-style: none': 'border-none',
  'border-width: 0': 'border-0',
  'border-width: 0px': 'border-0',
  'border-width: 1px': 'border',
  'border-width: 2px': 'border-2',
  'border-width: 4px': 'border-4',
  'border-width: 8px': 'border-8',
  'border-collapse: collapse': 'border-collapse',
  'border-collapse: separate': 'border-separate',

  'outline: none': 'outline-none',
  'outline: 0': 'outline-none',
  'outline-style: none': 'outline-none',

  'box-sizing: border-box': 'box-border',
  'box-sizing: content-box': 'box-content',

  'cursor: pointer': 'cursor-pointer',
  'cursor: default': 'cursor-default',
  'cursor: wait': 'cursor-wait',
  'cursor: text': 'cursor-text',
  'cursor: move': 'cursor-move',
  'cursor: not-allowed': 'cursor-not-allowed',
  'cursor: grab': 'cursor-grab',
  'cursor: grabbing': 'cursor-grabbing',
  'cursor: crosshair': 'cursor-crosshair',
  'cursor: none': 'cursor-none',

  'pointer-events: none': 'pointer-events-none',
  'pointer-events: auto': 'pointer-events-auto',
  'user-select: none': 'select-none',
  'user-select: text': 'select-text',
  'user-select: all': 'select-all',
  'user-select: auto': 'select-auto',
  '-webkit-user-select: none': 'select-none',

  'visibility: visible': 'visible',
  'visibility: hidden': 'invisible',
  'visibility: collapse': 'collapse',

  'opacity: 0': 'opacity-0',
  'opacity: 0.05': 'opacity-5',
  'opacity: 0.1': 'opacity-10',
  'opacity: 0.2': 'opacity-20',
  'opacity: 0.25': 'opacity-25',
  'opacity: 0.3': 'opacity-30',
  'opacity: 0.4': 'opacity-40',
  'opacity: 0.5': 'opacity-50',
  'opacity: 0.6': 'opacity-60',
  'opacity: 0.7': 'opacity-70',
  'opacity: 0.75': 'opacity-75',
  'opacity: 0.8': 'opacity-80',
  'opacity: 0.9': 'opacity-90',
  'opacity: 0.95': 'opacity-95',
  'opacity: 1': 'opacity-100',

  'transition-property: none': 'transition-none',
  'transition-property: all': 'transition-all',
  'transition-timing-function: linear': 'ease-linear',
  'transition-timing-function: ease-in': 'ease-in',
  'transition-timing-function: ease-out': 'ease-out',
  'transition-timing-function: ease-in-out': 'ease-in-out',
  'transition-duration: 75ms': 'duration-75',
  'transition-duration: 100ms': 'duration-100',
  'transition-duration: 150ms': 'duration-150',
  'transition-duration: 200ms': 'duration-200',
  'transition-duration: 300ms': 'duration-300',
  'transition-duration: 500ms': 'duration-500',
  'transition-duration: 700ms': 'duration-700',
  'transition-duration: 1000ms': 'duration-1000',
  'transition-delay: 75ms': 'delay-75',
  'transition-delay: 100ms': 'delay-100',
  'transition-delay: 150ms': 'delay-150',
  'transition-delay: 200ms': 'delay-200',
  'transition-delay: 300ms': 'delay-300',
  'transition-delay: 500ms': 'delay-500',

  'transform: none': 'transform-none',
  'transform-origin: center': 'origin-center',
  'transform-origin: top': 'origin-top',
  'transform-origin: top right': 'origin-top-right',
  'transform-origin: right': 'origin-right',
  'transform-origin: bottom right': 'origin-bottom-right',
  'transform-origin: bottom': 'origin-bottom',
  'transform-origin: bottom left': 'origin-bottom-left',
  'transform-origin: left': 'origin-left',
  'transform-origin: top left': 'origin-top-left',

  'resize: none': 'resize-none',
  'resize: both': 'resize',
  'resize: vertical': 'resize-y',
  'resize: horizontal': 'resize-x',

  'object-fit: contain': 'object-contain',
  'object-fit: cover': 'object-cover',
  'object-fit: fill': 'object-fill',
  'object-fit: none': 'object-none',
  'object-fit: scale-down': 'object-scale-down',
  'object-position: center': 'object-center',
  'object-position: top': 'object-top',
  'object-position: bottom': 'object-bottom',

  'background-color: transparent': 'bg-transparent',
  'background-color: currentColor': 'bg-current',
  'background-size: cover': 'bg-cover',
  'background-size: contain': 'bg-contain',
  'background-size: auto': 'bg-auto',
  'background-repeat: no-repeat': 'bg-no-repeat',
  'background-repeat: repeat': 'bg-repeat',
  'background-repeat: repeat-x': 'bg-repeat-x',
  'background-repeat: repeat-y': 'bg-repeat-y',
  'background-position: center': 'bg-center',
  'background-position: top': 'bg-top',
  'background-position: bottom': 'bg-bottom',
  'background-position: left': 'bg-left',
  'background-position: right': 'bg-right',
  'background-attachment: fixed': 'bg-fixed',
  'background-attachment: local': 'bg-local',
  'background-attachment: scroll': 'bg-scroll',

  'mix-blend-mode: normal': 'mix-blend-normal',
  'mix-blend-mode: multiply': 'mix-blend-multiply',
  'mix-blend-mode: screen': 'mix-blend-screen',
  'mix-blend-mode: overlay': 'mix-blend-overlay',

  'isolation: isolate': 'isolate',
  'isolation: auto': 'isolation-auto',

  'appearance: none': 'appearance-none',
  '-webkit-appearance: none': 'appearance-none',

  'box-decoration-break: clone': 'box-decoration-clone',
  'box-decoration-break: slice': 'box-decoration-slice',

  'float: left': 'float-left',
  'float: right': 'float-right',
  'float: none': 'float-none',
  'clear: left': 'clear-left',
  'clear: right': 'clear-right',
  'clear: both': 'clear-both',
  'clear: none': 'clear-none',

  'table-layout: auto': 'table-auto',
  'table-layout: fixed': 'table-fixed',

  'content: none': 'content-none',

  'will-change: auto': 'will-change-auto',
  'will-change: scroll-position': 'will-change-scroll',
  'will-change: contents': 'will-change-contents',
  'will-change: transform': 'will-change-transform',

  'scroll-behavior: auto': 'scroll-auto',
  'scroll-behavior: smooth': 'scroll-smooth',

  'touch-action: none': 'touch-none',
  'touch-action: auto': 'touch-auto',
  'touch-action: manipulation': 'touch-manipulation',
  'touch-action: pan-x': 'touch-pan-x',
  'touch-action: pan-y': 'touch-pan-y',

  'accent-color: auto': 'accent-auto',
  'caret-color: transparent': 'caret-transparent',

  'columns: 1': 'columns-1',
  'columns: 2': 'columns-2',
  'columns: 3': 'columns-3',
  'columns: 4': 'columns-4',

  'break-after: auto': 'break-after-auto',
  'break-after: avoid': 'break-after-avoid',
  'break-before: auto': 'break-before-auto',
  'break-before: avoid': 'break-before-avoid',
  'break-inside: auto': 'break-inside-auto',
  'break-inside: avoid': 'break-inside-avoid',

  'hyphens: none': 'hyphens-none',
  'hyphens: manual': 'hyphens-manual',
  'hyphens: auto': 'hyphens-auto',
};

const FALLBACK_PREFIX: [string, string][] = [
  ['padding-top:', 'pt'],
  ['padding-right:', 'pr'],
  ['padding-bottom:', 'pb'],
  ['padding-left:', 'pl'],
  ['padding-inline:', 'px'],
  ['padding-block:', 'py'],
  ['padding:', 'p'],
  ['margin-top:', 'mt'],
  ['margin-right:', 'mr'],
  ['margin-bottom:', 'mb'],
  ['margin-left:', 'ml'],
  ['margin-inline:', 'mx'],
  ['margin-block:', 'my'],
  ['margin:', 'm'],
  ['gap:', 'gap'],
  ['row-gap:', 'gap-y'],
  ['column-gap:', 'gap-x'],
  ['font-size:', 'text'],
  ['color:', 'text'],
  ['background-color:', 'bg'],
  ['background:', 'bg'],
  ['border-color:', 'border'],
  ['border-width:', 'border'],
  ['border-radius:', 'rounded'],
  ['width:', 'w'],
  ['height:', 'h'],
  ['min-width:', 'min-w'],
  ['min-height:', 'min-h'],
  ['max-width:', 'max-w'],
  ['max-height:', 'max-h'],
  ['top:', 'top'],
  ['right:', 'right'],
  ['bottom:', 'bottom'],
  ['left:', 'left'],
  ['inset:', 'inset'],
  ['z-index:', 'z'],
  ['line-height:', 'leading'],
  ['letter-spacing:', 'tracking'],
  ['border-top-left-radius:', 'rounded-tl'],
  ['border-top-right-radius:', 'rounded-tr'],
  ['border-bottom-left-radius:', 'rounded-bl'],
  ['border-bottom-right-radius:', 'rounded-br'],
  ['outline-offset:', 'outline-offset'],
  ['text-indent:', 'indent'],
  ['transition-duration:', 'duration'],
  ['transition-delay:', 'delay'],
  ['opacity:', 'opacity'],
  ['columns:', 'columns'],
  ['aspect-ratio:', 'aspect'],
  ['accent-color:', 'accent'],
  ['caret-color:', 'caret'],
  ['scroll-margin:', 'scroll-m'],
  ['scroll-padding:', 'scroll-p'],
  ['stroke-width:', 'stroke'],
  ['fill:', 'fill'],
  ['stroke:', 'stroke'],
];

function normalizeLine(raw: string): string {
  const cleaned = raw.trim().replace(/;$/, '').trim();
  const colonIdx = cleaned.indexOf(':');
  if (colonIdx === -1) return cleaned;
  const prop = cleaned.slice(0, colonIdx).trim();
  const val = cleaned.slice(colonIdx + 1).trim();
  return `${prop}: ${val}`;
}

function TailwindConverter() {
  const [input, setInput] = useState('display: flex;\nalign-items: center;\nflex-direction: column;\nfont-weight: 600;\nborder-radius: 8px;\ngap: 16px;');
  const [copied, setCopied] = useState(false);

  const convert = useCallback((css: string) => {
    const lines = css.split('\n').map(normalizeLine);
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
        const normalizedPrefix = prefix.endsWith(':') ? prefix : prefix;
        if (line.startsWith(normalizedPrefix.replace(/:$/, '') + ':')) {
          const val = line.slice(line.indexOf(':') + 1).trim();
          classes.push(`${twPrefix}-[${val}]`);
          handled = true;
          break;
        }
      }

      if (!handled && line.startsWith('box-shadow:')) {
        const val = line.slice(line.indexOf(':') + 1).trim();
        if (val === 'none') classes.push('shadow-none');
        else classes.push(`shadow-[${val.replace(/\s+/g, '_')}]`);
        handled = true;
      }

      if (!handled && line.startsWith('transform:')) {
        const val = line.slice(line.indexOf(':') + 1).trim();
        if (val === 'none') classes.push('transform-none');
        else classes.push(`[transform:${val.replace(/\s+/g, '_')}]`);
        handled = true;
      }

      if (!handled && line.startsWith('transition:')) {
        const val = line.slice(line.indexOf(':') + 1).trim();
        if (val === 'none') classes.push('transition-none');
        else if (val === 'all') classes.push('transition-all');
        else classes.push(`[transition:${val.replace(/\s+/g, '_')}]`);
        handled = true;
      }

      if (!handled && line.startsWith('animation:')) {
        const val = line.slice(line.indexOf(':') + 1).trim();
        if (val === 'none') classes.push('animate-none');
        else classes.push(`[animation:${val.replace(/\s+/g, '_')}]`);
        handled = true;
      }

      if (!handled) {
        unknowns.push(`/* ${line} */`);
      }
    }

    return { classes: classes.join(' '), unknowns };
  }, []);

  const { classes, unknowns } = convert(input);
  const output = classes + (unknowns.length ? '\n\n' + unknowns.join('\n') : '');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div>
        <p className="text-xs text-white/40 mb-2">Paste CSS here</p>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10}
          className="w-full p-3 rounded-xl text-xs font-mono text-white/70 outline-none resize-none"
          style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }} />
      </div>
      <div>
        <p className="text-xs text-white/40 mb-2">Tailwind classes</p>
        <div className="relative rounded-xl overflow-hidden" style={{ background: '#0D0D0D', border: '1px solid #2A2A2A', minHeight: 240 }}>
          <pre className="p-3 text-[11px] font-mono text-[#a78bfa] leading-relaxed whitespace-pre-wrap">{output || '— output appears here —'}</pre>
          <button onClick={() => { navigator.clipboard.writeText(classes).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }}
            className="absolute top-2 right-2 px-3 py-1 rounded-lg text-xs font-semibold transition-all"
            style={{ background: copied ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)', color: copied ? '#a78bfa' : 'rgba(255,255,255,0.5)' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <p className="text-[10px] text-white/25 mt-2">Common properties auto-converted. Custom values use arbitrary syntax.</p>
      </div>
    </div>
  );
}

// ————— Main Page —————
const TOOLS: { id: ActiveTool; label: string; icon: string; desc: string }[] = [
  { id: 'shadow', label: 'Box Shadow', icon: '🌑', desc: 'X, Y, blur, spread, color' },
  { id: 'gradient', label: 'Gradient', icon: '🌈', desc: 'Linear & radial gradients' },
  { id: 'radius', label: 'Border Radius', icon: '⬜', desc: 'Per-corner control' },
  { id: 'animation', label: 'CSS Animation', icon: '✨', desc: 'Keyframe generator' },
  { id: 'tailwind', label: 'CSS → Tailwind', icon: '⚡', desc: 'Convert CSS to classes' },
];

export default function ToolkitPage() {
  const router = useRouter();
  const [active, setActive] = useState<ActiveTool>('shadow');
  const tool = TOOLS.find((t) => t.id === active)!;

  // Read ?tool= query param and activate the correct tab
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
        keywords={['box shadow generator', 'gradient generator', 'border radius generator', 'CSS animation generator', 'tailwind converter']}
      />
      <main className="min-h-screen" style={{ background: '#0D0D0D' }}>
        <section className="container px-4 sm:px-6 pt-28 pb-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Dev <span style={{ color: '#B8FB3C' }}>Toolkit</span>
          </motion.h1>
          <p className="text-white/40 text-sm">CSS generators and utilities for frontend developers.</p>
        </section>

        <section className="container px-4 sm:px-6 pb-20">
          {/* Tool tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {TOOLS.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border"
                style={{ background: active === t.id ? 'rgba(184,251,60,0.1)' : 'rgba(255,255,255,0.03)', borderColor: active === t.id ? 'rgba(184,251,60,0.35)' : '#2A2A2A', color: active === t.id ? '#B8FB3C' : 'rgba(255,255,255,0.45)' }}>
                <span>{t.icon}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Tool Panel */}
          <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
            className="rounded-2xl border p-5" style={{ background: '#151515', borderColor: '#2A2A2A' }}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b" style={{ borderColor: '#2A2A2A' }}>
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <h2 className="text-base font-bold text-white">{tool.label}</h2>
                <p className="text-xs text-white/40">{tool.desc}</p>
              </div>
            </div>
            {active === 'shadow' && <ShadowTool />}
            {active === 'gradient' && <GradientTool />}
            {active === 'radius' && <RadiusTool />}
            {active === 'animation' && <AnimationTool />}
            {active === 'tailwind' && <TailwindConverter />}
          </motion.div>
        </section>
      </main>
    </>
  );
}
