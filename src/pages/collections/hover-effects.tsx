import PageSEO from '@/components/seo/PageSEO';
import { GlowGrid } from '@/components/ui/GlowGrid';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface HoverItem { id: string; name: string; tag: string; description: string; css: string; }

export const items: HoverItem[] = [
	{
		id: 'hover-lift', name: 'Lift Shadow', tag: 'elevation', description: 'Card lifts with growing shadow on hover.',
		css: `.hover-lift {\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n}\n.hover-lift:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08);\n}`
	},
	{
		id: 'hover-glow', name: 'Glow Ring', tag: 'glow', description: 'Radiant glow ring expands from element edge.',
		css: `.hover-glow {\n  border-radius: 12px;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n.hover-glow:hover {\n  box-shadow: 0 0 0 2px #B8FB3C, 0 0 20px rgba(184,251,60,0.3), 0 0 40px rgba(184,251,60,0.15);\n}`
	},
	{
		id: 'hover-shimmer', name: 'Shimmer Sweep', tag: 'shimmer', description: 'Bright shimmer sweeps across element on hover.',
		css: `.hover-shimmer {\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n}\n.hover-shimmer::after {\n  content: '';\n  position: absolute;\n  inset: -100%;\n  background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);\n  transition: transform 0.6s ease;\n  transform: translateX(-100%);\n}\n.hover-shimmer:hover::after {\n  transform: translateX(100%);\n}`
	},
	{
		id: 'hover-fill', name: 'Color Fill', tag: 'fill', description: 'Background fills from bottom to top on hover.',
		css: `.hover-fill {\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n  transition: color 0.3s ease;\n}\n.hover-fill::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #B8FB3C;\n  transform: translateY(100%);\n  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);\n  z-index: 0;\n}\n.hover-fill:hover::before { transform: translateY(0); }\n.hover-fill > * { position: relative; z-index: 1; }\n.hover-fill:hover { color: #0a0a0f; }`
	},
	{
		id: 'hover-scale', name: 'Scale Up', tag: 'scale', description: 'Smooth spring scale-up on hover.',
		css: `.hover-scale {\n  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);\n  cursor: pointer;\n}\n.hover-scale:hover { transform: scale(1.05); }`
	},
	{
		id: 'hover-underline', name: 'Underline Slide', tag: 'underline', description: 'Underline grows from center outward on hover.',
		css: `.hover-underline {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n}\n.hover-underline::after {\n  content: '';\n  position: absolute;\n  bottom: -2px;\n  left: 50%; right: 50%;\n  height: 2px;\n  background: #B8FB3C;\n  transition: all 0.3s ease;\n}\n.hover-underline:hover::after { left: 0; right: 0; }`
	},
	{
		id: 'hover-neon-border', name: 'Neon Border', tag: 'glow', description: 'Pulsing neon border appears on hover.',
		css: `.hover-neon-border {\n  border: 2px solid transparent;\n  border-radius: 12px;\n  transition: all 0.3s ease;\n  cursor: pointer;\n}\n.hover-neon-border:hover {\n  border-color: #B8FB3C;\n  box-shadow: 0 0 6px #B8FB3C, 0 0 12px rgba(184,251,60,0.5), inset 0 0 6px rgba(184,251,60,0.1);\n}`
	},
	{
		id: 'hover-rotate', name: 'Rotate Icon', tag: 'icon', description: 'Element rotates 45° on hover — great for + / × icons.',
		css: `.hover-rotate {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  cursor: pointer;\n}\n.hover-rotate:hover { transform: rotate(45deg); }`
	},
	{
		id: 'hover-border-draw', name: 'Border Draw', tag: 'border', description: 'Border draws in from top-left corner on hover.',
		css: `.hover-border-draw {\n  position: relative;\n  cursor: pointer;\n}\n.hover-border-draw::before,\n.hover-border-draw::after {\n  content: '';\n  position: absolute;\n  width: 0; height: 0;\n  transition: all 0.3s ease;\n}\n.hover-border-draw::before {\n  top: 0; left: 0;\n  border-top: 2px solid #B8FB3C;\n  border-right: 2px solid #B8FB3C;\n}\n.hover-border-draw::after {\n  bottom: 0; right: 0;\n  border-bottom: 2px solid #B8FB3C;\n  border-left: 2px solid #B8FB3C;\n}\n.hover-border-draw:hover::before,\n.hover-border-draw:hover::after { width: 100%; height: 100%; }`
	},
	{
		id: 'hover-flip', name: 'Card Flip', tag: '3d', description: 'Card flips to reveal back face — CSS 3D perspective.',
		css: `.flip-card { perspective: 1000px; cursor: pointer; }\n.flip-inner {\n  position: relative;\n  transform-style: preserve-3d;\n  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);\n}\n.flip-card:hover .flip-inner { transform: rotateY(180deg); }\n.flip-front, .flip-back {\n  position: absolute; inset: 0;\n  backface-visibility: hidden;\n  border-radius: 16px;\n}\n.flip-back {\n  transform: rotateY(180deg);\n  background: linear-gradient(135deg, #B8FB3C, #06b6d4);\n}`
	},
	{
		id: 'hover-blur-reveal', name: 'Blur & Reveal', tag: 'reveal', description: 'Content blurs and a hidden label fades in on hover.',
		css: `.hover-reveal {\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n}\n.hover-reveal .default { transition: all 0.25s ease; }\n.hover-reveal .on-hover {\n  position: absolute; inset: 0;\n  display: flex; align-items: center; justify-content: center;\n  opacity: 0; filter: blur(4px);\n  transition: all 0.25s ease;\n}\n.hover-reveal:hover .default { opacity: 0; filter: blur(4px); }\n.hover-reveal:hover .on-hover { opacity: 1; filter: blur(0); }`
	},
	{
		id: 'hover-ripple', name: 'Ripple Click', tag: 'ripple', description: 'Ripple emanates from click point on interaction.',
		css: `.hover-ripple { position: relative; overflow: hidden; cursor: pointer; }\n.ripple-circle {\n  position: absolute;\n  border-radius: 50%;\n  transform: scale(0);\n  animation: ripple-expand 0.6s linear;\n  background: rgba(255,255,255,0.3);\n  pointer-events: none;\n}\n@keyframes ripple-expand { to { transform: scale(4); opacity: 0; } }`
	},
	{
		id: 'hover-tilt', name: '3D Tilt', tag: '3d', description: 'Element tilts in perspective on mouse move (needs JS).',
		css: `.hover-tilt {\n  transition: transform 0.15s ease;\n  transform-style: preserve-3d;\n  cursor: pointer;\n}\n/* JS: track mouse and apply rotateX/Y transforms */`
	},
	{
		id: 'hover-spotlight', name: 'Spotlight', tag: 'light', description: 'Radial light spotlight follows the cursor in the card.',
		css: `.hover-spotlight {\n  position: relative;\n  overflow: hidden;\n  cursor: pointer;\n}\n.hover-spotlight::before {\n  content: '';\n  position: absolute;\n  width: 200px; height: 200px;\n  background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n.hover-spotlight:hover::before { opacity: 1; }\n/* JS: update left/top from mousemove event */`
	},
	{
		id: 'hover-magnetic', name: 'Magnetic Pull', tag: 'magnetic', description: 'Element is pulled toward the cursor (needs JS mousemove).',
		css: `.hover-magnetic {\n  transition: transform 0.2s ease;\n  cursor: pointer;\n  display: inline-block;\n}\n/* JS: calculate offset from element center\n   apply translateX/Y proportional to cursor distance */`
	},
];

function Preview({ item }: { item: HoverItem }) {
	return (
		<div className="h-44 flex items-center justify-center bg-[#0a0a0f] rounded-t-2xl overflow-hidden">
			{item.id === 'hover-lift' && <div className="px-8 py-5 rounded-2xl bg-white/8 border border-white/10 text-white font-semibold text-sm cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">Hover to lift</div>}
			{item.id === 'hover-glow' && <div className="px-8 py-5 rounded-2xl bg-white/6 border border-white/10 text-white font-semibold text-sm cursor-pointer transition-all duration-300 hover:border-[#B8FB3C] hover:shadow-[0_0_0_2px_#B8FB3C,0_0_20px_rgba(184,251,60,0.3)]">Glow ring</div>}
			{item.id === 'hover-shimmer' && <div className="relative px-8 py-5 rounded-2xl bg-white/8 border border-white/10 text-white font-semibold text-sm cursor-pointer overflow-hidden group"><span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.15) 50%,transparent 70%)' }} />Shimmer</div>}
			{item.id === 'hover-fill' && <div className="relative px-8 py-5 rounded-2xl border border-[#B8FB3C]/40 text-[#B8FB3C] font-semibold text-sm cursor-pointer overflow-hidden group transition-colors hover:text-[#0a0a0f]"><span className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-350 bg-[#B8FB3C]" /><span className="relative z-10">Fill ↑</span></div>}
			{item.id === 'hover-scale' && <div className="px-8 py-5 rounded-2xl bg-white/8 border border-white/10 text-white font-semibold text-sm cursor-pointer transition-all duration-250 hover:scale-105">Scale ↑</div>}
			{item.id === 'hover-underline' && <span className="relative text-white font-bold text-xl cursor-pointer group">Underline<span className="absolute bottom-0 left-[50%] right-[50%] h-0.5 bg-[#B8FB3C] group-hover:left-0 group-hover:right-0 transition-all duration-300" /></span>}
			{item.id === 'hover-neon-border' && <div className="px-8 py-5 rounded-2xl border-2 border-transparent text-white font-semibold text-sm cursor-pointer transition-all duration-300 hover:border-[#B8FB3C] hover:shadow-[0_0_6px_#B8FB3C,0_0_20px_rgba(184,251,60,0.4)]">Neon Border</div>}
			{item.id === 'hover-rotate' && <div className="w-14 h-14 rounded-xl bg-white/8 border border-white/10 text-white text-2xl cursor-pointer flex items-center justify-center transition-all duration-300 hover:rotate-45">+</div>}
			{item.id === 'hover-border-draw' && <div className="relative px-8 py-5 text-white font-semibold text-sm cursor-pointer group"><span className="absolute top-0 left-0 w-0 h-0 border-t-2 border-r-2 border-[#B8FB3C] group-hover:w-full group-hover:h-full transition-all duration-300" /><span className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-l-2 border-[#B8FB3C] group-hover:w-full group-hover:h-full transition-all duration-300" />Draw border</div>}
			{item.id === 'hover-flip' && <div className="w-36 h-20 cursor-pointer group" style={{ perspective: 1000 }}><div className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d' }}><div className="absolute inset-0 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white font-semibold text-sm" style={{ backfaceVisibility: 'hidden' }}>Front</div><div className="absolute inset-0 rounded-xl flex items-center justify-center font-bold text-[#0a0a0f]" style={{ background: 'linear-gradient(135deg,#B8FB3C,#06b6d4)', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>Back!</div></div></div>}
			{item.id === 'hover-blur-reveal' && <div className="relative w-36 h-20 rounded-xl bg-white/8 border border-white/10 cursor-pointer overflow-hidden group flex items-center justify-center"><span className="text-white font-semibold text-sm transition-all duration-250 group-hover:opacity-0 group-hover:blur-sm">Default</span><span className="absolute inset-0 flex items-center justify-center text-[#B8FB3C] font-bold text-sm transition-all duration-250 opacity-0 blur-sm group-hover:opacity-100 group-hover:blur-none">Revealed!</span></div>}
			{item.id === 'hover-ripple' && <div className="relative px-8 py-5 rounded-2xl bg-[#B8FB3C] text-[#0a0a0f] font-bold text-sm cursor-pointer overflow-hidden group">Click ripple<span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/30 opacity-0 group-active:animate-ping" /></div>}
			{['hover-tilt', 'hover-spotlight', 'hover-magnetic'].includes(item.id) && <div className="flex flex-col items-center gap-2 text-center"><div className="px-8 py-5 rounded-2xl bg-white/8 border border-white/10 text-white font-semibold text-sm">{item.name}</div><p className="text-xs text-white/30">Requires JS</p></div>}
		</div>
	);
}

export default function HoverEffects() {
	const [sel, setSel] = useState<HoverItem | null>(null);
	return (
		<>
			<PageSEO
				title="CSS Hover Effects – Interactive Micro-Animations Copy-Paste – UIXplor"
				description="20 CSS hover effects including lift, glow, shimmer, flip, border draw and slide animations. All pure CSS — click any card to copy the HTML and CSS instantly."
				path="/collections/hover-effects"
				keywords={['CSS hover effects', 'hover animation CSS', 'CSS micro-animations', 'hover card effect', 'CSS transition effects', 'interactive UI CSS', 'hover button effects']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Hover Effects Collection – UIXplor',
						description: '20 CSS hover effects for buttons, cards, links and images including lift, glow, shimmer, flip, and slide animations.',
						url: 'https://uixplor.com/collections/hover-effects',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'Hover Effects', item: 'https://uixplor.com/collections/hover-effects' },
						],
					},
				]}
			/>
			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					<nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Hover Effects</li></ol></nav>
					<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Hover Effects</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">Polished hover interactions — live demos in each card, then copy the CSS.</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-pink-400 bg-pink-500/10 rounded-full border border-pink-500/20"><span className="w-1.5 h-1.5 rounded-full bg-pink-400" />{items.length} effects</span>
					</motion.div>
					<GlowGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, i) => (
							<motion.div key={item.id} className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
								<Preview item={item} />
								<div className="px-5 py-4 border-t border-white/6">
									<h3 className="text-sm font-semibold text-white mb-0.5">{item.name}</h3>
									<p className="text-xs text-white/40 mb-3 leading-relaxed">{item.description}</p>
									<div className="flex items-center justify-between">
										<span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider">{item.tag}</span>
										<button onClick={() => setSel(item)} className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-pink-400 hover:text-white hover:border-pink-400 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(236,72,153,0.2)] transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=hover-effects`}
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
