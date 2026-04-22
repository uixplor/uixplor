import PageSEO from '@/components/seo/PageSEO';
import { GlowGrid } from '@/components/ui/GlowGrid';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface Item { id: string; name: string; tag: string; description: string; css: string; html: string; }

const items: Item[] = [
	{
		id: 'input-underline', name: 'Underline Input', tag: 'minimal', description: 'Borderless input with animated bottom-line on focus.',
		html: `<div class="input-underline-wrap">\n  <input type="text" placeholder="Your name" />\n  <span class="line"></span>\n</div>`,
		css: `.input-underline-wrap {\n  position: relative;\n  padding-bottom: 4px;\n}\n.input-underline-wrap input {\n  width: 100%;\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid rgba(255,255,255,0.2);\n  color: #fff;\n  font-size: 15px;\n  padding: 8px 0;\n  outline: none;\n  transition: border-color 0.2s ease;\n}\n.input-underline-wrap input::placeholder { color: rgba(255,255,255,0.35); }\n.line {\n  position: absolute;\n  bottom: 4px; left: 0;\n  height: 2px;\n  width: 0;\n  background: #B8FB3C;\n  transition: width 0.3s ease;\n}\n.input-underline-wrap:focus-within .line { width: 100%; }`
	},
	{
		id: 'input-float-label', name: 'Floating Label', tag: 'material', description: 'Label floats above the field when focused or filled.',
		html: `<div class="float-label-wrap">\n  <input type="text" id="fname" placeholder=" " />\n  <label for="fname">First Name</label>\n</div>`,
		css: `.float-label-wrap {\n  position: relative;\n  margin-top: 16px;\n}\n.float-label-wrap input {\n  width: 100%;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.15);\n  border-radius: 8px;\n  color: #fff;\n  font-size: 15px;\n  padding: 14px 16px 6px;\n  outline: none;\n  transition: border-color 0.2s ease;\n}\n.float-label-wrap input:focus { border-color: #B8FB3C; }\n.float-label-wrap label {\n  position: absolute;\n  top: 50%; left: 16px;\n  transform: translateY(-50%);\n  color: rgba(255,255,255,0.4);\n  font-size: 14px;\n  pointer-events: none;\n  transition: all 0.2s ease;\n}\n.float-label-wrap input:focus ~ label,\n.float-label-wrap input:not(:placeholder-shown) ~ label {\n  top: 8px;\n  font-size: 11px;\n  color: #B8FB3C;\n}`
	},
	{
		id: 'input-glass', name: 'Glass Input', tag: 'glass', description: 'Frosted glass input with blur and translucent fill.',
		html: `<input class="glass-input" type="text" placeholder="Search..." />`,
		css: `.glass-input {\n  background: rgba(255,255,255,0.08);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  border: 1px solid rgba(255,255,255,0.15);\n  border-radius: 10px;\n  padding: 10px 16px;\n  color: #fff;\n  font-size: 14px;\n  width: 100%;\n  outline: none;\n  transition: all 0.2s ease;\n}\n.glass-input::placeholder { color: rgba(255,255,255,0.4); }\n.glass-input:focus {\n  border-color: rgba(255,255,255,0.4);\n  background: rgba(255,255,255,0.12);\n  box-shadow: 0 0 0 3px rgba(255,255,255,0.08);\n}`
	},
	{
		id: 'input-neon', name: 'Neon Focus', tag: 'neon', description: 'Input with bright neon glow on focus.',
		html: `<input class="neon-input" type="text" placeholder="Type here..." />`,
		css: `.neon-input {\n  background: rgba(0,0,0,0.5);\n  border: 1px solid rgba(184,251,60,0.3);\n  border-radius: 8px;\n  padding: 10px 16px;\n  color: #B8FB3C;\n  font-size: 14px;\n  width: 100%;\n  outline: none;\n  transition: all 0.3s ease;\n  font-family: monospace;\n}\n.neon-input::placeholder { color: rgba(184,251,60,0.3); }\n.neon-input:focus {\n  border-color: #B8FB3C;\n  box-shadow: 0 0 8px rgba(184,251,60,0.4), 0 0 20px rgba(184,251,60,0.1), inset 0 0 8px rgba(184,251,60,0.05);\n}`
	},
	{
		id: 'input-gradient-border', name: 'Gradient Border', tag: 'gradient', description: 'Input with animated gradient border using pseudo-element.',
		html: `<div class="grad-border-wrap">\n  <input type="text" placeholder="Enter value..." />\n</div>`,
		css: `.grad-border-wrap {\n  padding: 1.5px;\n  border-radius: 9px;\n  background: linear-gradient(135deg, #B8FB3C, #a855f7, #06b6d4);\n  background-size: 200% 200%;\n  animation: grad-shift 3s ease infinite;\n}\n.grad-border-wrap input {\n  background: #0a0a0f;\n  border: none;\n  border-radius: 8px;\n  padding: 10px 16px;\n  color: #fff;\n  font-size: 14px;\n  width: 100%;\n  outline: none;\n}\n.grad-border-wrap input::placeholder { color: rgba(255,255,255,0.3); }\n@keyframes grad-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}`
	},
	{
		id: 'input-search', name: 'Search Bar', tag: 'search', description: 'Full-width search bar with icon and clear button.',
		html: `<div class="search-wrap">\n  <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>\n  </svg>\n  <input type="search" placeholder="Search collections..." />\n</div>`,
		css: `.search-wrap {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-icon {\n  position: absolute;\n  left: 14px;\n  width: 16px; height: 16px;\n  color: rgba(255,255,255,0.35);\n  pointer-events: none;\n}\n.search-wrap input {\n  width: 100%;\n  background: rgba(255,255,255,0.06);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 50px;\n  padding: 10px 16px 10px 40px;\n  color: #fff;\n  font-size: 13px;\n  outline: none;\n  transition: all 0.2s ease;\n}\n.search-wrap input::placeholder { color: rgba(255,255,255,0.3); }\n.search-wrap input:focus {\n  border-color: rgba(255,255,255,0.3);\n  background: rgba(255,255,255,0.09);\n}`
	},
	{
		id: 'input-otp', name: 'OTP Input', tag: 'code', description: '6-digit OTP / PIN entry with single-char inputs.',
		html: `<div class="otp-wrap">\n  <input class="otp-box" type="text" maxlength="1" />\n  <input class="otp-box" type="text" maxlength="1" />\n  <input class="otp-box" type="text" maxlength="1" />\n  <input class="otp-box" type="text" maxlength="1" />\n  <input class="otp-box" type="text" maxlength="1" />\n  <input class="otp-box" type="text" maxlength="1" />\n</div>`,
		css: `.otp-wrap {\n  display: flex;\n  gap: 8px;\n}\n.otp-box {\n  width: 44px; height: 52px;\n  text-align: center;\n  font-size: 18px;\n  font-weight: 700;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: 10px;\n  color: #fff;\n  outline: none;\n  caret-color: #B8FB3C;\n  transition: all 0.2s ease;\n}\n.otp-box:focus {\n  border-color: #B8FB3C;\n  background: rgba(184,251,60,0.05);\n  box-shadow: 0 0 0 3px rgba(184,251,60,0.15);\n}`
	},
	{
		id: 'input-dark', name: 'Dark Solid', tag: 'dark', description: 'Solid dark input with strong contrast — clean for dark UIs.',
		html: `<input class="dark-input" type="text" placeholder="Email address" />`,
		css: `.dark-input {\n  background: #1a1a2e;\n  border: 1px solid #2d2d4e;\n  border-radius: 8px;\n  padding: 10px 16px;\n  color: #e2e8f0;\n  font-size: 14px;\n  width: 100%;\n  outline: none;\n  transition: all 0.2s ease;\n}\n.dark-input::placeholder { color: #4a4a6a; }\n.dark-input:focus {\n  border-color: #6366f1;\n  box-shadow: 0 0 0 3px rgba(99,102,241,0.15);\n}`
	},
	{
		id: 'input-pill', name: 'Pill Input', tag: 'rounded', description: 'Fully rounded pill-shaped input — soft and modern.',
		html: `<input class="pill-input" type="text" placeholder="Search..." />`,
		css: `.pill-input {\n  background: rgba(255,255,255,0.07);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: 50px;\n  padding: 10px 20px;\n  color: #fff;\n  font-size: 14px;\n  width: 100%;\n  outline: none;\n  transition: all 0.2s ease;\n}\n.pill-input::placeholder { color: rgba(255,255,255,0.35); }\n.pill-input:focus {\n  border-color: rgba(255,255,255,0.3);\n  background: rgba(255,255,255,0.1);\n}`
	},
	{
		id: 'input-textarea', name: 'Styled Textarea', tag: 'textarea', description: 'Dark multi-line textarea with focus ring.',
		html: `<textarea class="styled-textarea" rows="4" placeholder="Write your message..."></textarea>`,
		css: `.styled-textarea {\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 12px;\n  padding: 12px 16px;\n  color: #fff;\n  font-size: 14px;\n  width: 100%;\n  resize: vertical;\n  outline: none;\n  line-height: 1.6;\n  font-family: inherit;\n  transition: all 0.2s ease;\n}\n.styled-textarea::placeholder { color: rgba(255,255,255,0.3); }\n.styled-textarea:focus {\n  border-color: rgba(255,255,255,0.25);\n  background: rgba(255,255,255,0.07);\n}`
	},
	{
		id: 'input-checkbox', name: 'Custom Checkbox', tag: 'toggle', description: 'CSS-only custom styled checkbox with animated checkmark.',
		html: `<label class="custom-checkbox">\n  <input type="checkbox" />\n  <span class="checkmark"></span>\n  Remember me\n</label>`,
		css: `.custom-checkbox {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  color: rgba(255,255,255,0.7);\n  font-size: 14px;\n  user-select: none;\n}\n.custom-checkbox input { display: none; }\n.checkmark {\n  width: 20px; height: 20px;\n  border-radius: 5px;\n  border: 1px solid rgba(255,255,255,0.2);\n  background: rgba(255,255,255,0.05);\n  display: flex; align-items: center; justify-content: center;\n  transition: all 0.2s ease;\n  flex-shrink: 0;\n}\n.custom-checkbox input:checked ~ .checkmark {\n  background: #B8FB3C;\n  border-color: #B8FB3C;\n}\n.custom-checkbox input:checked ~ .checkmark::after {\n  content: '';\n  width: 5px; height: 9px;\n  border: 2px solid #0a0a0f;\n  border-top: none; border-left: none;\n  transform: rotate(45deg) translateY(-1px);\n}`
	},
	{
		id: 'input-toggle', name: 'Toggle Switch', tag: 'toggle', description: 'Smooth animated toggle switch — pure CSS.',
		html: `<label class="toggle-switch">\n  <input type="checkbox" />\n  <span class="slider"></span>\n</label>`,
		css: `.toggle-switch {\n  position: relative;\n  display: inline-block;\n  width: 48px; height: 26px;\n  cursor: pointer;\n}\n.toggle-switch input { display: none; }\n.slider {\n  position: absolute;\n  inset: 0;\n  background: rgba(255,255,255,0.1);\n  border-radius: 50px;\n  border: 1px solid rgba(255,255,255,0.15);\n  transition: all 0.3s ease;\n}\n.slider::before {\n  content: '';\n  position: absolute;\n  width: 18px; height: 18px;\n  left: 3px; top: 3px;\n  background: rgba(255,255,255,0.6);\n  border-radius: 50%;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.toggle-switch input:checked ~ .slider { background: #B8FB3C; border-color: #B8FB3C; }\n.toggle-switch input:checked ~ .slider::before {\n  background: #0a0a0f;\n  transform: translateX(22px);\n}`
	},
	{
		id: 'input-range', name: 'Range Slider', tag: 'range', description: 'Custom styled range input with brand accent color.',
		html: `<input class="custom-range" type="range" min="0" max="100" value="60" />`,
		css: `.custom-range {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  height: 4px;\n  border-radius: 2px;\n  background: rgba(255,255,255,0.1);\n  outline: none;\n  cursor: pointer;\n}\n.custom-range::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 18px; height: 18px;\n  border-radius: 50%;\n  background: #B8FB3C;\n  border: 2px solid #0a0a0f;\n  box-shadow: 0 0 0 3px rgba(184,251,60,0.2);\n  transition: all 0.2s ease;\n}\n.custom-range::-webkit-slider-thumb:hover {\n  box-shadow: 0 0 0 6px rgba(184,251,60,0.2);\n  transform: scale(1.1);\n}`
	},
	{
		id: 'input-select', name: 'Custom Select', tag: 'select', description: 'Custom styled select dropdown on dark background.',
		html: `<div class="select-wrap">\n  <select class="custom-select">\n    <option>Design</option>\n    <option>Development</option>\n    <option>Marketing</option>\n  </select>\n</div>`,
		css: `.select-wrap {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n}\n.custom-select {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 100%;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: 8px;\n  padding: 10px 36px 10px 14px;\n  color: #fff;\n  font-size: 14px;\n  outline: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.custom-select:focus { border-color: rgba(255,255,255,0.3); }\n.select-wrap::after {\n  content: '▾';\n  position: absolute;\n  right: 14px; top: 50%;\n  transform: translateY(-50%);\n  color: rgba(255,255,255,0.4);\n  pointer-events: none;\n  font-size: 12px;\n}`
	},
	{
		id: 'input-file', name: 'File Upload', tag: 'upload', description: 'Drag-and-drop styled file upload zone.',
		html: `<label class="file-upload" for="file-input">\n  <span class="icon">📁</span>\n  <span>Drop files here or <u>browse</u></span>\n  <input id="file-input" type="file" hidden />\n</label>`,
		css: `.file-upload {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 24px;\n  border: 2px dashed rgba(255,255,255,0.15);\n  border-radius: 12px;\n  cursor: pointer;\n  color: rgba(255,255,255,0.5);\n  font-size: 13px;\n  transition: all 0.2s ease;\n  text-align: center;\n}\n.file-upload .icon { font-size: 24px; }\n.file-upload:hover {\n  border-color: #B8FB3C;\n  background: rgba(184,251,60,0.04);\n  color: rgba(255,255,255,0.7);\n}`
	},
];

export default function Inputs() {
	const [sel, setSel] = useState<Item | null>(null);
	return (
		<>
			<PageSEO
				title="CSS Form Input Styles – Styled Input Examples – UIXplor"
				description="15 custom CSS input styles — underline, floating label, glass, neon, OTP inputs, toggle switches and more. Copy any input design with one click."
				path="/collections/inputs"
				keywords={['CSS input styles', 'form input design CSS', 'floating label input', 'custom text input CSS', 'neon input CSS', 'glass input', 'CSS form design']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Input Styles Collection – UIXplor',
						description: '15 custom CSS form input styles including underline inputs, floating labels, glass effects, neon inputs, OTP fields, and toggle switches.',
						url: 'https://uixplor.com/collections/inputs',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'CSS Input Styles', item: 'https://uixplor.com/collections/inputs' },
						],
					},
				]}
			/>
			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					<nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Inputs</li></ol></nav>
					<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Input Styles</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">Polished form controls — underline fields, floating labels, OTP boxes, toggles and more.</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-violet-400 bg-violet-500/10 rounded-full border border-violet-500/20"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" />{items.length} components</span>
					</motion.div>
					<GlowGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, i) => (
							<motion.div key={item.id} className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}>
								<div className="h-36 flex items-center justify-center bg-[#0a0a0f] rounded-t-2xl px-8">
									<InputPreview item={item} />
								</div>
								<div className="px-5 py-4 border-t border-white/6">
									<h3 className="text-sm font-semibold text-white mb-0.5">{item.name}</h3>
									<p className="text-xs text-white/40 mb-3 leading-relaxed">{item.description}</p>
									<div className="flex items-center justify-between">
										<span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider">{item.tag}</span>
										<button onClick={() => setSel(item)} className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-violet-500 hover:text-white hover:border-violet-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=inputs`}
                        className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-[#6C63FF]/10 text-[#a78bfa] border border-[#6C63FF]/20 hover:bg-[#6C63FF]/20 hover:border-[#6C63FF]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </Link>
									</div>
								</div>
							</motion.div>
						))}
					</GlowGrid>
				</div>
			</main >
			<CodeViewerOverlay isOpen={!!sel} onClose={() => setSel(null)} title={sel?.name || ''} sections={sel ? [{ label: 'HTML', language: 'html', code: sel.html }, { label: 'CSS', language: 'css', code: sel.css }] as CodeSection[] : []} />
		</>
	);
}

function InputPreview({ item }: { item: Item }) {
	const s = (style: React.CSSProperties) => style;
	if (item.id === 'input-underline') return (
		<div className="relative pb-1 w-full">
			<input type="text" placeholder="Your name" className="w-full bg-transparent border-b border-white/20 text-white text-sm pb-2 outline-none placeholder:text-white/35 focus:border-white/40 transition-colors" />
			<span className="absolute bottom-1 left-0 h-0.5 w-full scale-x-0 focus-within:scale-x-100 origin-left transition-transform duration-300 bg-[#B8FB3C]" />
		</div>
	);
	if (item.id === 'input-float-label') return (
		<div className="relative w-full mt-4">
			<input type="text" placeholder=" " className="w-full peer bg-white/5 border border-white/15 rounded-lg text-white text-sm pt-5 pb-2 px-4 outline-none focus:border-[#B8FB3C] transition-colors" />
			<label className="absolute top-[50%] left-4 -translate-y-1/2 text-white/40 text-sm pointer-events-none transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-[#B8FB3C] peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px]">First Name</label>
		</div>
	);
	if (item.id === 'input-glass') return <input type="text" placeholder="Search..." className="w-full bg-white/8 border border-white/15 rounded-xl text-white text-sm px-4 py-2.5 outline-none focus:border-white/40 focus:bg-white/12 transition-all placeholder:text-white/40" style={{ backdropFilter: 'blur(10px)' }} />;
	if (item.id === 'input-neon') return <input type="text" placeholder="Type here..." className="w-full bg-black/50 border border-[#B8FB3C]/30 rounded-lg text-[#B8FB3C] text-sm px-4 py-2.5 outline-none font-mono focus:border-[#B8FB3C] focus:shadow-[0_0_8px_rgba(184,251,60,0.4)] transition-all placeholder:text-[#B8FB3C]/30" />;
	if (item.id === 'input-pill') return <input type="text" placeholder="Search..." className="w-full bg-white/7 border border-white/12 rounded-full text-white text-sm px-5 py-2.5 outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/35" />;
	if (item.id === 'input-dark') return <input type="text" placeholder="Email address" className="w-full bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg text-slate-200 text-sm px-4 py-2.5 outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition-all placeholder:text-[#4a4a6a]" />;
	if (item.id === 'input-search') return (
		<div className="relative w-full">
			<svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
			<input type="search" placeholder="Search collections..." className="w-full bg-white/6 border border-white/10 rounded-full text-white text-sm pl-10 pr-4 py-2.5 outline-none focus:border-white/30 focus:bg-white/9 transition-all placeholder:text-white/30" />
		</div>
	);
	if (item.id === 'input-otp') return (
		<div className="flex gap-2">
			{Array.from({ length: 6 }).map((_, i) => (
				<input key={i} type="text" maxLength={1} className="w-9 h-11 text-center text-base font-bold bg-white/5 border border-white/12 rounded-lg text-white outline-none focus:border-[#B8FB3C] focus:bg-[#B8FB3C]/5 focus:shadow-[0_0_0_2px_rgba(184,251,60,0.15)] transition-all caret-[#B8FB3C]" />
			))}
		</div>
	);
	if (item.id === 'input-toggle') return (
		<label className="relative inline-flex cursor-pointer w-12 h-7">
			<input type="checkbox" className="sr-only peer" />
			<span className="absolute inset-0 rounded-full bg-white/10 border border-white/15 peer-checked:bg-[#B8FB3C] peer-checked:border-[#B8FB3C] transition-all duration-300" />
			<span className="absolute w-5 h-5 left-1 top-1 bg-white/60 rounded-full peer-checked:translate-x-5 peer-checked:bg-[#0a0a0f] transition-all duration-300" />
		</label>
	);
	if (item.id === 'input-checkbox') return (
		<label className="flex items-center gap-3 cursor-pointer select-none">
			<input type="checkbox" className="sr-only peer" />
			<span className="w-5 h-5 rounded-md border border-white/20 bg-white/5 flex items-center justify-center peer-checked:bg-[#B8FB3C] peer-checked:border-[#B8FB3C] transition-all duration-200">
				<svg className="w-3 h-3 text-[#0a0a0f] opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
			</span>
			<span className="text-sm text-white/70">Remember me</span>
		</label>
	);
	if (item.id === 'input-range') return (
		<div className="w-full">
			<input type="range" min={0} max={100} defaultValue={60} className="w-full h-1 rounded-full appearance-none outline-none cursor-pointer" style={s({ background: 'linear-gradient(to right, #B8FB3C 60%, rgba(255,255,255,0.1) 60%)' })} />
		</div>
	);
	if (item.id === 'input-gradient-border') return (
		<div className="p-px rounded-xl w-full" style={{ background: 'linear-gradient(135deg, #B8FB3C, #a855f7, #06b6d4)' }}>
			<input type="text" placeholder="Enter value..." className="w-full bg-[#0a0a0f] rounded-[10px] text-white text-sm px-4 py-2.5 outline-none placeholder:text-white/30" />
		</div>
	);
	if (item.id === 'input-file') return (
		<label className="flex flex-col items-center gap-2 w-full py-4 border-2 border-dashed border-white/15 rounded-xl cursor-pointer text-white/50 text-xs hover:border-[#B8FB3C] hover:text-white/70 transition-all">
			<span className="text-2xl">📁</span>
			<span>Drop files or <u>browse</u></span>
			<input type="file" className="hidden" />
		</label>
	);
	if (item.id === 'input-textarea') return <textarea rows={3} placeholder="Write your message..." className="w-full bg-white/4 border border-white/10 rounded-xl text-white text-sm px-4 py-2.5 outline-none resize-none focus:border-white/25 focus:bg-white/7 transition-all placeholder:text-white/30" />;
	if (item.id === 'input-select') return (
		<div className="relative w-full">
			<select className="w-full appearance-none bg-white/5 border border-white/12 rounded-lg text-white text-sm px-4 py-2.5 outline-none cursor-pointer focus:border-white/30 transition-all pr-9">
				<option>Design</option><option>Development</option><option>Marketing</option>
			</select>
			<span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-xs pointer-events-none">▾</span>
		</div>
	);
	return null;
}
