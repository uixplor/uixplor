import PageSEO from '@/components/seo/PageSEO';
import { GlowGrid } from '@/components/ui/GlowGrid';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface Item { id: string; name: string; tag: string; description: string; css: string; }

export const items: Item[] = [
	{
		id: 'micro-like-heart', name: 'Like Heart', tag: 'feedback', description: 'Heart icon scales up then bounces on activation — satisfying click.',
		css: `.heart-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px; height: 40px;\n  border: none;\n  background: none;\n  cursor: pointer;\n  font-size: 22px;\n  transition: transform 0.15s ease;\n}\n.heart-btn:hover { transform: scale(1.15); }\n.heart-btn.active {\n  animation: heart-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n@keyframes heart-pop {\n  0% { transform: scale(1); }\n  40% { transform: scale(1.4); }\n  70% { transform: scale(0.9); }\n  100% { transform: scale(1); }\n}`
	},
	{
		id: 'micro-toggle', name: 'Toggle Switch Pop', tag: 'control', description: 'Toggle with a satisfying spring animation when switched.',
		css: `.pop-toggle {\n  position: relative;\n  width: 52px; height: 28px;\n  cursor: pointer;\n}\n.pop-toggle input { display: none; }\n.pop-track {\n  position: absolute; inset: 0;\n  border-radius: 50px;\n  background: rgba(255,255,255,0.1);\n  border: 1px solid rgba(255,255,255,0.15);\n  transition: background 0.3s ease;\n}\n.pop-thumb {\n  position: absolute;\n  width: 20px; height: 20px;\n  top: 3px; left: 3px;\n  background: rgba(255,255,255,0.6);\n  border-radius: 50%;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.pop-toggle input:checked ~ .pop-track { background: #B8FB3C; }\n.pop-toggle input:checked ~ .pop-thumb {\n  transform: translateX(24px);\n  background: #0a0a0f;\n}`
	},
	{
		id: 'micro-checkbox-pop', name: 'Checkbox Pop', tag: 'form', description: 'Checkbox springs into view with a jelly bounce on check.',
		css: `.pop-check input:checked ~ .check-box {\n  background: #B8FB3C;\n  border-color: #B8FB3C;\n  animation: check-spring 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.pop-check input:checked ~ .check-box::after {\n  content: '';\n  display: block;\n  width: 5px; height: 9px;\n  border: 2px solid #0a0a0f;\n  border-top: none; border-left: none;\n  transform: rotate(45deg) translateY(-1px);\n}\n@keyframes check-spring {\n  0% { transform: scale(0.6); }\n  60% { transform: scale(1.15); }\n  100% { transform: scale(1); }\n}`
	},
	{
		id: 'micro-bell-shake', name: 'Bell Shake', tag: 'notification', description: 'Bell icon rings with jitter animation on hover or trigger.',
		css: `.bell-btn {\n  display: inline-flex;\n  font-size: 24px;\n  cursor: pointer;\n  border: none; background: none;\n  transform-origin: top center;\n}\n.bell-btn:hover {\n  animation: bell-ring 0.5s ease;\n}\n@keyframes bell-ring {\n  0%, 100% { transform: rotate(0deg); }\n  10%, 50% { transform: rotate(12deg); }\n  30%, 70% { transform: rotate(-12deg); }\n  90% { transform: rotate(4deg); }\n}`
	},
	{
		id: 'micro-progress-fill', name: 'Progress Fill', tag: 'indicator', description: 'Horizontal bar fills gradually on activation — satisfying progress.',
		css: `.progress-micro {\n  height: 4px;\n  background: rgba(255,255,255,0.1);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.progress-micro .bar {\n  height: 100%;\n  background: linear-gradient(to right, #B8FB3C, #06b6d4);\n  border-radius: 2px;\n  width: 0;\n  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.progress-micro.active .bar { width: 75%; }`
	},
	{
		id: 'micro-ripple-btn', name: 'Ripple Button', tag: 'button', description: 'Material-style ripple effect emanates from click point.',
		css: `.ripple-btn {\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n  padding: 10px 24px;\n  border-radius: 8px;\n  border: none;\n  background: #B8FB3C;\n  color: #0a0a0f;\n  font-weight: 600;\n}\n.ripple-btn .ripple {\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(0,0,0,0.2);\n  transform: scale(0);\n  animation: btn-ripple 0.6s linear;\n  pointer-events: none;\n}\n@keyframes btn-ripple {\n  to { transform: scale(4); opacity: 0; }\n}`
	},
	{
		id: 'micro-tooltip-pop', name: 'Tooltip Pop', tag: 'tooltip', description: 'Tooltip springs in with scale animation on hover.',
		css: `.tooltip-container {\n  position: relative;\n  display: inline-block;\n}\n.tooltip-pop {\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%) scale(0.8);\n  transform-origin: bottom center;\n  background: rgba(255,255,255,0.1);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255,255,255,0.2);\n  border-radius: 8px;\n  padding: 6px 12px;\n  color: #fff;\n  font-size: 12px;\n  white-space: nowrap;\n  pointer-events: none;\n  opacity: 0;\n  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.tooltip-container:hover .tooltip-pop {\n  opacity: 1;\n  transform: translateX(-50%) scale(1);\n}`
	},
	{
		id: 'micro-tab-slide', name: 'Tab Indicator Slide', tag: 'navigation', description: 'Active tab indicator smoothly slides between tabs on change.',
		css: `.tab-bar {\n  position: relative;\n  display: flex;\n  gap: 0;\n  background: rgba(255,255,255,0.04);\n  border-radius: 10px;\n  padding: 4px;\n}\n.tab-item {\n  position: relative;\n  z-index: 1;\n  padding: 7px 16px;\n  font-size: 13px;\n  font-weight: 500;\n  color: rgba(255,255,255,0.4);\n  border-radius: 7px;\n  cursor: pointer;\n  transition: color 0.2s ease;\n}\n.tab-item.active { color: #0a0a0f; }\n.tab-indicator {\n  position: absolute;\n  top: 4px;\n  height: calc(100% - 8px);\n  background: #B8FB3C;\n  border-radius: 7px;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 0;\n}`
	},
	{
		id: 'micro-count-up', name: 'Count Up', tag: 'data', description: 'Numeric counter animates up to target value on mount.',
		css: `.count-up-num {\n  font-size: 48px;\n  font-weight: 800;\n  display: inline-block;\n  animation: count-appear 0.5s ease forwards;\n}\n@keyframes count-appear {\n  from { transform: translateY(20px); opacity: 0; }\n  to { transform: translateY(0); opacity: 1; }\n}\n/* JS: increment number from 0 to target over duration */`
	},
	{
		id: 'micro-copy-confirm', name: 'Copy Confirmation', tag: 'feedback', description: 'Button text changes to "Copied!" with check, then reverts.',
		css: `.copy-btn {\n  position: relative;\n  padding: 8px 16px;\n  border-radius: 8px;\n  background: rgba(255,255,255,0.08);\n  border: 1px solid rgba(255,255,255,0.15);\n  color: rgba(255,255,255,0.7);\n  font-size: 13px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.copy-btn.copied {\n  background: rgba(184,251,60,0.1);\n  border-color: rgba(184,251,60,0.3);\n  color: #B8FB3C;\n  animation: confirm-pop 0.3s ease;\n}\n@keyframes confirm-pop {\n  0% { transform: scale(0.95); }\n  50% { transform: scale(1.05); }\n  100% { transform: scale(1); }\n}`
	},
	{
		id: 'micro-star-rating', name: 'Star Rating', tag: 'rating', description: 'Hoverable star rating — stars fill with golden color on hover.',
		css: `.star-rating {\n  display: flex;\n  gap: 4px;\n  cursor: pointer;\n}\n.star {\n  font-size: 22px;\n  color: rgba(255,255,255,0.15);\n  transition: color 0.15s ease, transform 0.15s ease;\n}\n.star-rating:hover .star {\n  color: #fbbf24;\n}\n.star-rating .star:hover ~ .star {\n  color: rgba(255,255,255,0.15);\n}\n.star:hover {\n  transform: scale(1.2);\n}`
	},
	{
		id: 'micro-drag-handle', name: 'Drag Handle', tag: 'interaction', description: 'Cursor shows grab state, item lightly pops on drag start.',
		css: `.drag-item {\n  cursor: grab;\n  user-select: none;\n  transition: all 0.2s ease;\n}\n.drag-item:active {\n  cursor: grabbing;\n  transform: scale(1.03) rotate(1deg);\n  box-shadow: 0 12px 40px rgba(0,0,0,0.3);\n  z-index: 100;\n}`
	},
	{
		id: 'micro-badge-pulse', name: 'Badge Pulse', tag: 'notification', description: 'Notification badge pulses with a ring — draws attention without being annoying.',
		css: `.badge-pulse {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.badge-num {\n  background: #ef4444;\n  color: #fff;\n  border-radius: 50%;\n  width: 20px; height: 20px;\n  font-size: 11px;\n  font-weight: 700;\n  display: flex; align-items: center; justify-content: center;\n}\n.badge-num::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(239,68,68,0.4);\n  width: 20px; height: 20px;\n  animation: badge-ring 1.5s ease-out infinite;\n}\n@keyframes badge-ring {\n  0% { transform: scale(1); opacity: 1; }\n  100% { transform: scale(2.5); opacity: 0; }\n}`
	},
	{
		id: 'micro-input-error-shake', name: 'Error Shake', tag: 'form', description: 'Input field shakes horizontally on validation error.',
		css: `.input-error {\n  animation: error-shake 0.4s ease;\n  border-color: #ef4444 !important;\n  box-shadow: 0 0 0 3px rgba(239,68,68,0.15) !important;\n}\n@keyframes error-shake {\n  0%, 100% { transform: translateX(0); }\n  20% { transform: translateX(-6px); }\n  40% { transform: translateX(6px); }\n  60% { transform: translateX(-4px); }\n  80% { transform: translateX(4px); }\n}`
	},
	{
		id: 'micro-floating-action', name: 'Floating Action', tag: 'button', description: 'FAB button expands to reveal action labels on hover.',
		css: `.fab {\n  position: relative;\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  gap: 8px;\n}\n.fab-main {\n  width: 56px; height: 56px;\n  border-radius: 50%;\n  background: #B8FB3C;\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer;\n  box-shadow: 0 4px 24px rgba(184,251,60,0.3);\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  font-size: 22px; color: #0a0a0f;\n}\n.fab:hover .fab-main { transform: rotate(45deg); }\n.fab-action {\n  width: 44px; height: 44px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.1);\n  border: 1px solid rgba(255,255,255,0.15);\n  display: flex; align-items: center; justify-content: center;\n  cursor: pointer;\n  font-size: 16px;\n  opacity: 0;\n  transform: scale(0.6) translateY(20px);\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n.fab:hover .fab-action {\n  opacity: 1;\n  transform: scale(1) translateY(0);\n}\n.fab:hover .fab-action:nth-child(2) { transition-delay: 0.05s; }\n.fab:hover .fab-action:nth-child(3) { transition-delay: 0.1s; }`
	},
];

export default function Microinteractions() {
	const [sel, setSel] = useState<Item | null>(null);
	return (
		<>
			<PageSEO
				title="CSS Microinteractions – Subtle Motion for Better UX – UIXplor"
				description="15 CSS microinteraction examples — heart like, toggle pop, ripple click, bell shake, badge pulse and more. Pure CSS animations that add polish to any UI."
				path="/collections/microinteractions"
				keywords={['CSS microinteractions', 'UI microanimations', 'CSS animation effects', 'like button animation', 'ripple effect CSS', 'CSS UX animations', 'subtle UI motion']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Microinteractions Collection – UIXplor',
						description: '15 CSS microinteraction examples including heart like animations, toggle pops, ripple effects, bell shakes, and badge pulses.',
						url: 'https://uixplor.com/collections/microinteractions',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'Microinteractions', item: 'https://uixplor.com/collections/microinteractions' },
						],
					},
				]}
			/>
			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					<nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Microinteractions</li></ol></nav>
					<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Microinteractions</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">Small moments that make your UI feel alive — toggles, confirmations, ratings, and more.</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/20"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{items.length} interactions</span>
					</motion.div>
					<GlowGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, i) => (
							<motion.div key={item.id} className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}>
								<div className="h-36 flex items-center justify-center bg-[#0a0a0f] rounded-t-2xl">
									<MicroPreview item={item} />
								</div>
								<div className="px-5 py-4 border-t border-white/6">
									<h3 className="text-sm font-semibold text-white mb-0.5">{item.name}</h3>
									<p className="text-xs text-white/40 mb-3 leading-relaxed">{item.description}</p>
									<div className="flex items-center justify-between">
										<span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider">{item.tag}</span>
										<button onClick={() => setSel(item)} className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-amber-400 hover:text-[#0a0a0f] hover:border-amber-400 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(251,191,36,0.2)] transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=microinteractions`}
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
			<CodeViewerOverlay isOpen={!!sel} onClose={() => setSel(null)} title={sel?.name || ''} sections={sel ? [{ label: 'CSS', language: 'css', code: sel.css }] as CodeSection[] : []} />
		</>
	);
}

function MicroPreview({ item }: { item: Item }) {
	const [liked, setLiked] = useState(false);
	const [tog, setTog] = useState(false);
	const [rating, setRating] = useState(0);
	const [copied, setCopied] = useState(false);

	if (item.id === 'micro-like-heart') return (
		<button onClick={() => setLiked(!liked)} className="text-4xl transition-all duration-300 hover:scale-110 active:scale-125" style={{ filter: liked ? 'none' : 'grayscale(1)', animation: liked ? 'none' : 'none' }}>
			{liked ? '❤️' : '🤍'}
		</button>
	);
	if (item.id === 'micro-toggle') return (
		<label className="relative w-14 h-7 cursor-pointer" onClick={() => setTog(!tog)}>
			<span className={`absolute inset-0 rounded-full border transition-all duration-300 ${tog ? 'bg-[#B8FB3C] border-[#B8FB3C]' : 'bg-white/10 border-white/15'}`} />
			<span className={`absolute w-5 h-5 top-1 rounded-full transition-all duration-300 ${tog ? 'left-7 bg-[#0a0a0f]' : 'left-1 bg-white/60'}`} style={{ transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)' }} />
		</label>
	);
	if (item.id === 'micro-bell-shake') return <button className="text-3xl cursor-pointer hover:animate-bounce border-none bg-transparent">🔔</button>;
	if (item.id === 'micro-ripple-btn') return <button className="relative px-6 py-2.5 rounded-lg bg-[#B8FB3C] text-[#0a0a0f] font-bold text-sm overflow-hidden cursor-pointer group active:scale-95 transition-transform">Ripple me<span className="absolute inset-0 opacity-0 group-active:opacity-100 group-active:animate-ping bg-black/15 rounded-lg" /></button>;
	if (item.id === 'micro-copy-confirm') return <button className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${copied ? 'bg-[#B8FB3C]/10 border border-[#B8FB3C]/30 text-[#B8FB3C] scale-105' : 'bg-white/8 border border-white/15 text-white/70'}`} onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}>{copied ? '✓ Copied!' : 'Copy Code'}</button>;
	if (item.id === 'micro-star-rating') return <div className="flex gap-1">{[1, 2, 3, 4, 5].map(n => <button key={n} className="text-2xl border-none bg-transparent cursor-pointer transition-all duration-150 hover:scale-125" style={{ color: n <= rating ? '#fbbf24' : 'rgba(255,255,255,0.15)', filter: n <= rating ? 'drop-shadow(0 0 4px #fbbf24)' : 'none' }} onClick={() => setRating(n)}>★</button>)}</div>;
	if (item.id === 'micro-badge-pulse') return <div className="relative inline-flex items-center gap-2"><span className="text-2xl">🔔</span><span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">3</span></div>;
	if (item.id === 'micro-progress-fill') return <div className="w-40"><div className="h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ background: 'linear-gradient(to right, #B8FB3C, #06b6d4)', width: '75%', animation: 'none', transition: 'width 1s ease' }} /></div><p className="text-xs text-white/40 mt-2 text-center">75% complete</p></div>;
	if (item.id === 'micro-tab-slide') return (
		<div className="flex bg-white/4 rounded-xl p-1 gap-0 relative">
			{['Design', 'Dev', 'Brand'].map((t, i) => (
				<button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer relative z-10 ${i === 0 ? 'bg-[#B8FB3C] text-[#0a0a0f]' : 'text-white/40 hover:text-white/70'}`}>{t}</button>
			))}
		</div>
	);
	if (item.id === 'micro-floating-action') return (
		<div className="relative flex flex-col-reverse items-center gap-2 group">
			<div className="w-12 h-12 rounded-full bg-[#B8FB3C] flex items-center justify-center text-xl text-[#0a0a0f] cursor-pointer shadow-lg transition-all group-hover:rotate-45 duration-300">+</div>
			{['📎', '🖼️'].map((icon, i) => (
				<div key={i} className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-base cursor-pointer opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all" style={{ transitionDelay: `${i * 60}ms` }}>{icon}</div>
			))}
		</div>
	);
	if (item.id === 'micro-drag-handle') return <div className="px-6 py-4 rounded-xl bg-white/8 border border-white/10 text-white text-sm font-medium cursor-grab active:cursor-grabbing active:scale-105 active:rotate-1 transition-all duration-200">Drag me ⠿</div>;
	if (item.id === 'micro-input-error-shake') return <input type="text" defaultValue="invalid@" className="px-4 py-2 bg-black/50 border border-red-500 rounded-lg text-red-400 text-sm outline-none shadow-[0_0_0_3px_rgba(239,68,68,0.15)] animate-bounce" style={{ animation: 'none' }} placeholder="Error field" />;
	if (item.id === 'micro-checkbox-pop') return (
		<label className="flex items-center gap-3 cursor-pointer">
			<input type="checkbox" className="sr-only peer" />
			<span className="w-5 h-5 rounded-md border border-white/20 bg-white/5 flex items-center justify-center peer-checked:bg-[#B8FB3C] peer-checked:border-[#B8FB3C] peer-checked:scale-110 transition-all duration-200">
				<svg className="w-3 h-3 text-[#0a0a0f] opacity-0 peer-checked:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
			</span>
			<span className="text-sm text-white/70">Check me</span>
		</label>
	);
	if (item.id === 'micro-tooltip-pop') return (
		<div className="relative group inline-block">
			<button className="px-4 py-2 bg-white/8 border border-white/15 rounded-lg text-white text-sm cursor-pointer">Hover me</button>
			<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-xs whitespace-nowrap pointer-events-none opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" style={{ backdropFilter: 'blur(10px)', transformOrigin: 'bottom center' }}>
				Tooltip pops in!
			</div>
		</div>
	);
	if (item.id === 'micro-count-up') return <div className="text-5xl font-black text-white" style={{ background: 'linear-gradient(135deg, #B8FB3C, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2,847</div>;
	return null;
}
