import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface FormItem { id: string; name: string; tag: string; description: string; preview: React.ReactNode; html: string; css: string; }

export const items: FormItem[] = [
  {
    id: 'floating-label', name: 'Floating Label Input', tag: 'input', description: 'Label animates above the input on focus.',
    preview: (<div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <div style={{ position: 'relative', width: 220 }}>
        <input defaultValue="hello@example.com" readOnly style={{ width: '100%', border: '1.5px solid #6366f1', borderRadius: 8, padding: '18px 12px 6px', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff' }} />
        <label style={{ position: 'absolute', top: 6, left: 13, fontSize: 10, fontWeight: 600, color: '#6366f1', pointerEvents: 'none' }}>Email Address</label>
      </div>
    </div>),
    html: `<div class="float-field">
  <input class="float-input" id="email" type="email" placeholder=" ">
  <label class="float-label" for="email">Email Address</label>
</div>`,
    css: `.float-field { position: relative; }
.float-input { width: 100%; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 20px 14px 8px; font-size: 14px; outline: none; font-family: system-ui, sans-serif; transition: border-color 0.2s; }
.float-input:focus { border-color: #6366f1; }
.float-input:focus + .float-label, .float-input:not(:placeholder-shown) + .float-label { top: 6px; font-size: 10px; color: #6366f1; }
.float-label { position: absolute; top: 50%; left: 14px; transform: translateY(-50%); font-size: 14px; color: #9ca3af; pointer-events: none; transition: all 0.18s ease; font-family: system-ui, sans-serif; }`
  },
  {
    id: 'search-bar', name: 'Animated Search Bar', tag: 'search', description: 'Expanding search with icon and keyboard shortcut hint.',
    preview: (<div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 8, background: '#f9fafb', borderRadius: 10, border: '1px solid #e5e7eb', width: 240, fontFamily: 'system-ui' }}>
      <span style={{ color: '#9ca3af', fontSize: 16 }}>🔍</span>
      <input placeholder="Search…" readOnly style={{ border: 'none', background: 'transparent', fontSize: 13, color: '#6b7280', outline: 'none', flex: 1 }} />
      <kbd style={{ background: '#e5e7eb', borderRadius: 4, padding: '2px 6px', fontSize: 10, color: '#6b7280' }}>⌘K</kbd>
    </div>),
    html: `<div class="search-bar">
  <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
  </svg>
  <input class="search-input" type="search" placeholder="Search…">
  <kbd class="search-kbd">⌘K</kbd>
</div>`,
    css: `.search-bar { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; transition: all 0.2s; }
.search-bar:focus-within { background: #fff; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
.search-icon { width: 16px; height: 16px; color: #9ca3af; flex-shrink: 0; }
.search-input { flex: 1; border: none; background: transparent; font-size: 14px; color: #374151; outline: none; font-family: system-ui, sans-serif; }
.search-input::placeholder { color: #9ca3af; }
.search-kbd { background: #e5e7eb; border-radius: 4px; padding: 2px 7px; font-size: 11px; color: #6b7280; }`
  },
  {
    id: 'range-slider', name: 'Range Slider', tag: 'range', description: 'Custom-styled range input with value display.',
    preview: (<div style={{ padding: '20px', fontFamily: 'system-ui', width: 240 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>Budget</span><span style={{ fontSize: 12, color: '#6366f1', fontWeight: 600 }}>$500</span></div>
      <input type="range" defaultValue={60} min={0} max={100} readOnly style={{ width: '100%', accentColor: '#6366f1' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af', marginTop: 4 }}><span>$0</span><span>$1,000</span></div>
    </div>),
    html: `<div class="range-wrap">
  <div class="range-header">
    <span>Budget</span>
    <output class="range-output">$500</output>
  </div>
  <input class="range-slider" type="range" min="0" max="1000" value="500">
  <div class="range-limits"><span>$0</span><span>$1,000</span></div>
</div>`,
    css: `.range-wrap { padding: 16px; font-family: system-ui, sans-serif; }
.range-header { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; color: #374151; font-weight: 500; }
.range-output { color: #6366f1; font-weight: 600; }
.range-slider { width: 100%; accent-color: #6366f1; cursor: pointer; height: 4px; }
.range-limits { display: flex; justify-content: space-between; font-size: 11px; color: #9ca3af; margin-top: 6px; }`
  },
  {
    id: 'file-upload', name: 'File Upload Zone', tag: 'upload', description: 'Drag-and-drop file upload area.',
    preview: (<div style={{ border: '2px dashed #d1d5db', borderRadius: 12, padding: '24px 16px', textAlign: 'center', fontFamily: 'system-ui', background: '#f9fafb', width: 240 }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>📁</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Drop files here</div>
      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 12 }}>or click to browse</div>
      <div style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '6px 16px', fontSize: 12, fontWeight: 600, display: 'inline-block', cursor: 'pointer' }}>Choose File</div>
    </div>),
    html: `<label class="file-dropzone" for="file-input">
  <span class="file-dropzone__icon">📁</span>
  <p class="file-dropzone__title">Drop files here</p>
  <p class="file-dropzone__sub">or click to browse</p>
  <span class="file-dropzone__btn">Choose File</span>
  <input id="file-input" type="file" hidden>
</label>`,
    css: `.file-dropzone { display: flex; flex-direction: column; align-items: center; padding: 32px 20px; border: 2px dashed #d1d5db; border-radius: 12px; background: #f9fafb; cursor: pointer; text-align: center; font-family: system-ui, sans-serif; transition: border-color 0.2s, background 0.2s; }
.file-dropzone:hover { border-color: #6366f1; background: rgba(99,102,241,0.04); }
.file-dropzone__icon { font-size: 40px; margin-bottom: 12px; }
.file-dropzone__title { font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 4px; }
.file-dropzone__sub { font-size: 12px; color: #9ca3af; margin-bottom: 16px; }
.file-dropzone__btn { background: #6366f1; color: #fff; border-radius: 6px; padding: 8px 20px; font-size: 13px; font-weight: 600; }`
  },
  {
    id: 'dropdown-select', name: 'Custom Dropdown', tag: 'dropdown', description: 'Styled accessible dropdown select.',
    preview: (<div style={{ position: 'relative', width: 220, fontFamily: 'system-ui' }}>
      <div style={{ border: '1px solid #d1d5db', borderRadius: 8, padding: '9px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', cursor: 'pointer', fontSize: 13, color: '#374151' }}>
        <span>Select framework</span><span style={{ color: '#9ca3af', fontSize: 11 }}>▾</span>
      </div>
      <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, marginTop: 4, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', zIndex: 10, overflow: 'hidden' }}>
        {['React', 'Vue', 'Svelte', 'Angular'].map((opt, i) => (<div key={opt} style={{ padding: '8px 12px', fontSize: 13, color: i === 0 ? '#6366f1' : '#374151', background: i === 0 ? 'rgba(99,102,241,0.06)' : 'transparent', cursor: 'pointer' }}>{opt}{i === 0 && ' ✓'}</div>))}
      </div>
    </div>),
    html: `<div class="custom-select">
  <button class="custom-select__trigger" aria-haspopup="listbox">
    <span>Select framework</span>
    <span>▾</span>
  </button>
  <ul class="custom-select__list" role="listbox">
    <li class="select-option selected" role="option" aria-selected="true">React ✓</li>
    <li class="select-option" role="option">Vue</li>
    <li class="select-option" role="option">Svelte</li>
    <li class="select-option" role="option">Angular</li>
  </ul>
</div>`,
    css: `.custom-select { position: relative; font-family: system-ui, sans-serif; }
.custom-select__trigger { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #fff; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; color: #374151; cursor: pointer; transition: border-color 0.2s; }
.custom-select__trigger:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); outline: none; }
.custom-select__list { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.08); list-style: none; margin: 0; padding: 4px; z-index: 50; }
.select-option { padding: 9px 12px; font-size: 14px; color: #374151; border-radius: 6px; cursor: pointer; transition: background 0.15s; }
.select-option:hover { background: #f9fafb; }
.select-option.selected { background: rgba(99,102,241,0.07); color: #6366f1; }`
  },
  {
    id: 'multistep-form', name: 'Multi-Step Form', tag: 'multistep', description: 'Three-step wizard with step indicator.',
    preview: (<div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 20, width: 260, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, gap: 0 }}>
        {['Account', 'Details', 'Done'].map((s, i) => [
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: i <= 1 ? '#6366f1' : '#e5e7eb', color: i <= 1 ? '#fff' : '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{i < 1 ? '✓' : i + 1}</div>
            <span style={{ fontSize: 9, color: i <= 1 ? '#6366f1' : '#9ca3af', marginTop: 3 }}>{s}</span>
          </div>,
          i < 2 && <div key={`l${i}`} style={{ flex: 1, height: 1, background: i < 1 ? '#6366f1' : '#e5e7eb', marginBottom: 18 }} />
        ])}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 12 }}>Account Details</div>
      <input placeholder="Email" readOnly style={{ width: '100%', border: '1px solid #d1d5db', borderRadius: 6, padding: '8px 10px', fontSize: 12, boxSizing: 'border-box', marginBottom: 8, outline: 'none' }} />
      <div style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '8px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Continue →</div>
    </div>),
    html: `<form class="wizard-form">
  <ol class="wizard-steps">
    <li class="wizard-step done"><span class="step-num">✓</span><span>Account</span></li>
    <li class="wizard-step active"><span class="step-num">2</span><span>Details</span></li>
    <li class="wizard-step"><span class="step-num">3</span><span>Done</span></li>
  </ol>
  <h3 class="wizard-title">Account Details</h3>
  <input class="wizard-input" type="email" placeholder="Email">
  <button class="wizard-next" type="button">Continue →</button>
</form>`,
    css: `.wizard-form { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px; font-family: system-ui, sans-serif; }
.wizard-steps { display: flex; align-items: center; list-style: none; margin: 0 0 20px; padding: 0; gap: 0; }
.wizard-step { display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 1; position: relative; font-size: 10px; }
.wizard-step:not(:last-child)::after { content: ''; position: absolute; top: 12px; left: 50%; width: 100%; height: 1px; background: #e5e7eb; }
.wizard-step.done::after, .wizard-step.active::after { background: #6366f1; }
.step-num { position: relative; z-index: 1; width: 24px; height: 24px; border-radius: 50%; background: #e5e7eb; color: #9ca3af; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
.wizard-step.done .step-num, .wizard-step.active .step-num { background: #6366f1; color: #fff; }
.wizard-title { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 14px; }
.wizard-input { width: 100%; border: 1px solid #d1d5db; border-radius: 6px; padding: 9px 12px; font-size: 14px; outline: none; margin-bottom: 10px; box-sizing: border-box; transition: border-color 0.2s; }
.wizard-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
.wizard-next { width: 100%; background: #6366f1; color: #fff; border: none; border-radius: 6px; padding: 9px; font-size: 14px; font-weight: 600; cursor: pointer; }`
  },
  {
    id: 'form-validation', name: 'Validation States', tag: 'validation', description: 'Input field with error + success feedback.',
    preview: (<div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 20px', fontFamily: 'system-ui', width: 240 }}>
      <div>
        <input defaultValue="bad@" readOnly style={{ width: '100%', border: '1.5px solid #ef4444', borderRadius: 7, padding: '8px 11px', fontSize: 12, background: '#fef2f2', outline: 'none', boxSizing: 'border-box' }} />
        <p style={{ fontSize: 11, color: '#ef4444', margin: '3px 0 0' }}>⚠ Invalid email</p>
      </div>
      <div>
        <input defaultValue="user@example.com" readOnly style={{ width: '100%', border: '1.5px solid #22c55e', borderRadius: 7, padding: '8px 11px', fontSize: 12, background: '#f0fdf4', outline: 'none', boxSizing: 'border-box' }} />
        <p style={{ fontSize: 11, color: '#22c55e', margin: '3px 0 0' }}>✓ Looks good!</p>
      </div>
    </div>),
    html: `<!-- Error state -->
<div class="form-field error">
  <input class="field-input" type="email" value="bad@">
  <p class="field-hint field-hint--error">⚠ Invalid email</p>
</div>
<!-- Success state -->
<div class="form-field success">
  <input class="field-input" type="email" value="user@example.com">
  <p class="field-hint field-hint--success">✓ Looks good!</p>
</div>`,
    css: `.form-field.error .field-input { border: 1.5px solid #ef4444; background: #fef2f2; }
.form-field.success .field-input { border: 1.5px solid #22c55e; background: #f0fdf4; }
.field-input { width: 100%; border: 1.5px solid #d1d5db; border-radius: 8px; padding: 9px 12px; font-size: 14px; outline: none; font-family: system-ui, sans-serif; transition: border-color 0.2s; box-sizing: border-box; }
.field-hint { font-size: 12px; margin-top: 4px; }
.field-hint--error { color: #ef4444; }
.field-hint--success { color: #22c55e; }`
  },
  {
    id: 'checkbox-group', name: 'Checkbox Group', tag: 'checkbox', description: 'Styled checkbox list with custom check mark.',
    preview: (<div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 20px', fontFamily: 'system-ui' }}>
      {[['React', 'checked'], ['Vue', ''], ['Angular', '']].map(([label, chk]) => (<label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#374151' }}>
        <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${chk ? '#6366f1' : '#d1d5db'}`, background: chk ? '#6366f1' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {chk && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
        </div>{label}
      </label>))}
    </div>),
    html: `<fieldset class="checkbox-group">
  <label class="checkbox-item">
    <input type="checkbox" checked> React
  </label>
  <label class="checkbox-item">
    <input type="checkbox"> Vue
  </label>
  <label class="checkbox-item">
    <input type="checkbox"> Angular
  </label>
</fieldset>`,
    css: `.checkbox-group { border: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.checkbox-item { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: #374151; font-family: system-ui, sans-serif; }
.checkbox-item input[type="checkbox"] { appearance: none; width: 18px; height: 18px; border: 2px solid #d1d5db; border-radius: 4px; background: #fff; cursor: pointer; position: relative; flex-shrink: 0; transition: all 0.15s; }
.checkbox-item input[type="checkbox"]:checked { background: #6366f1; border-color: #6366f1; }
.checkbox-item input[type="checkbox"]:checked::after { content: '✓'; position: absolute; top: -1px; left: 2px; font-size: 11px; color: #fff; font-weight: 900; }`
  },
  {
    id: 'radio-group', name: 'Radio Button Group', tag: 'radio', description: 'Custom styled radio selection.',
    preview: (() => {
      const radioOpts = [{ label: 'Monthly', price: '$12/mo', sel: true }, { label: 'Yearly', price: '$99/yr', sel: false }]; return (<div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 20px', fontFamily: 'system-ui' }}>
        {radioOpts.map(({ label, price, sel }) => (<label key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: `1.5px solid ${sel ? '#6366f1' : '#e5e7eb'}`, borderRadius: 8, cursor: 'pointer', background: sel ? 'rgba(99,102,241,0.04)' : '#fff' }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${sel ? '#6366f1' : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {sel && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />}
          </div>
          <div><div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{label}</div><div style={{ fontSize: 11, color: '#9ca3af' }}>{price}</div></div>
        </label>))}
      </div>);
    })(),
    html: `<fieldset class="radio-group">
  <label class="radio-card active">
    <input type="radio" name="plan" checked>
    <div><strong>Monthly</strong><span>$12/mo</span></div>
  </label>
  <label class="radio-card">
    <input type="radio" name="plan">
    <div><strong>Yearly</strong><span>$99/yr</span></div>
  </label>
</fieldset>`,
    css: `.radio-group { border: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.radio-card { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1.5px solid #e5e7eb; border-radius: 8px; cursor: pointer; transition: all 0.2s; font-family: system-ui, sans-serif; }
.radio-card.active, .radio-card:has(input:checked) { border-color: #6366f1; background: rgba(99,102,241,0.04); }
.radio-card input[type="radio"] { appearance: none; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #d1d5db; position: relative; flex-shrink: 0; cursor: pointer; transition: border-color 0.2s; }
.radio-card input[type="radio"]:checked { border-color: #6366f1; }
.radio-card input[type="radio"]:checked::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 6px; height: 6px; border-radius: 50%; background: #6366f1; }
.radio-card strong { display: block; font-size: 14px; color: #111; }
.radio-card span { font-size: 12px; color: #9ca3af; }`
  },
];

const CATS = [{ key: 'all', label: 'All' }, { key: 'input', label: 'Inputs' }, { key: 'search', label: 'Search' }, { key: 'range', label: 'Range' }, { key: 'upload', label: 'Upload' }, { key: 'dropdown', label: 'Dropdowns' }, { key: 'multistep', label: 'Multi-step' }, { key: 'validation', label: 'Validation' }, { key: 'checkbox', label: 'Checkboxes' }, { key: 'radio', label: 'Radio' }];
function buildSections(item: FormItem): CodeSection[] { return [{ label: 'HTML', language: 'html', code: item.html }, { label: 'CSS', language: 'css', code: item.css }]; }

export default function FormsAdvanced() {
  const [selected, setSelected] = useState<FormItem | null>(null);
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? items : items.filter(i => i.tag === cat);
  return (<>
    <PageSEO title="Advanced CSS Form Components — Floating Labels, Multi-step, File Upload — UIXplor" description={`${items.length} advanced CSS form components: floating labels, animated search bars, custom dropdowns, range sliders, file upload zones, multi-step wizards, validation states, checkboxes, and radio groups.`} path="/collections/forms-advanced" keywords={['floating label CSS', 'multi step form CSS', 'file upload CSS', 'custom dropdown CSS', 'range slider CSS', 'form validation CSS', 'checkbox CSS', 'CSS form components']} jsonLd={[{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Advanced CSS Form Components — UIXplor', url: 'https://uixplor.com/collections/forms-advanced', numberOfItems: items.length, isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' } }, { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' }, { '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' }, { '@type': 'ListItem', position: 3, name: 'Advanced Forms', item: 'https://uixplor.com/collections/forms-advanced' }] }]} />
    <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Advanced Forms</li></ol></nav>
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Advanced Form <span className="text-[#B8FB3C]">Components</span></h1>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-4">{items.length} advanced CSS form patterns — floating labels, multi-step wizards, dropdowns, file uploads, sliders, and more.</p>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20"><span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]" />{items.length} components</span>
        </motion.div>
        <div className="flex flex-wrap gap-2 mb-8 justify-center">{CATS.map(c => <button key={c.key} onClick={() => setCat(c.key)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${cat === c.key ? 'bg-[#B8FB3C] text-[#0a0a0f]' : 'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6'}`}>{c.label}</button>)}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, index) => (<motion.article key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.02 }} className="rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300">
            <div className="overflow-hidden h-44 sm:h-52 flex items-center justify-center bg-white/[0.02]">{item.preview}</div>
            <div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
              <div className="min-w-0 mr-3"><span className="text-xs font-medium text-white/60 truncate block">{item.name}</span><span className="text-[10px] text-white/25 uppercase tracking-wider">{item.tag}</span></div>
              <button onClick={() => setSelected(item)} className="shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=forms-advanced`}
                        className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-[#6C63FF]/10 text-[#a78bfa] border border-[#6C63FF]/20 hover:bg-[#6C63FF]/20 hover:border-[#6C63FF]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </Link>
            </div>
          </motion.article>))}
        </div>
      </div>
    </main>
    <CodeViewerOverlay isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.name || ''} sections={selected ? buildSections(selected) : []} />
  </>);
}
