import PageSEO from '@/components/seo/PageSEO';
import { GlowGrid } from '@/components/ui/GlowGrid';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface Item { id: string; name: string; tag: string; description: string; css: string; html: string; }

const items: Item[] = [
	{
		id: 'loader-spinner', name: 'Ring Spinner', tag: 'spinner', description: 'Classic rotating ring spinner — universally understood.',
		html: `<div class="ring-spinner"></div>`,
		css: `.ring-spinner {\n  width: 40px; height: 40px;\n  border-radius: 50%;\n  border: 3px solid rgba(255,255,255,0.1);\n  border-top-color: #B8FB3C;\n  animation: ring-spin 0.7s linear infinite;\n}\n@keyframes ring-spin { to { transform: rotate(360deg); } }`
	},
	{
		id: 'loader-dots', name: 'Bouncing Dots', tag: 'dots', description: 'Three dots bounce in sequence — smooth loading indicator.',
		html: `<div class="bounce-dots">\n  <div></div><div></div><div></div>\n</div>`,
		css: `.bounce-dots {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.bounce-dots div {\n  width: 10px; height: 10px;\n  border-radius: 50%;\n  background: #B8FB3C;\n  animation: dot-bounce 1.2s ease infinite;\n}\n.bounce-dots div:nth-child(2) { animation-delay: 0.2s; }\n.bounce-dots div:nth-child(3) { animation-delay: 0.4s; }\n@keyframes dot-bounce {\n  0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }\n  40% { transform: scale(1); opacity: 1; }\n}`
	},
	{
		id: 'loader-bar', name: 'Progress Bar', tag: 'progress', description: 'Animated infinite progress bar — great for page loads.',
		html: `<div class="progress-bar">\n  <div class="progress-fill"></div>\n</div>`,
		css: `.progress-bar {\n  width: 200px; height: 4px;\n  background: rgba(255,255,255,0.1);\n  border-radius: 2px;\n  overflow: hidden;\n}\n.progress-fill {\n  height: 100%;\n  border-radius: 2px;\n  background: linear-gradient(to right, #B8FB3C, #06b6d4);\n  animation: progress-move 1.8s ease-in-out infinite;\n  transform-origin: left;\n}\n@keyframes progress-move {\n  0% { transform: scaleX(0) translateX(0); }\n  50% { transform: scaleX(1) translateX(0); }\n  100% { transform: scaleX(0) translateX(200px);\n}`
	},
	{
		id: 'loader-pulse', name: 'Pulse Ring', tag: 'pulse', description: 'Expanding pulse rings — like a radar or heartbeat.',
		html: `<div class="pulse-ring"></div>`,
		css: `.pulse-ring {\n  width: 40px; height: 40px;\n  border-radius: 50%;\n  background: rgba(184,251,60,0.3);\n  animation: pulse-expand 1.5s ease-out infinite;\n}\n@keyframes pulse-expand {\n  0% { transform: scale(0.5); opacity: 1; }\n  100% { transform: scale(2); opacity: 0; }\n}`
	},
	{
		id: 'loader-orbit', name: 'Orbit Ring', tag: 'spinner', description: 'Small dot orbits a center circle — elegant and unique.',
		html: `<div class="orbit-loader">\n  <div class="planet"></div>\n</div>`,
		css: `.orbit-loader {\n  position: relative;\n  width: 44px; height: 44px;\n  border-radius: 50%;\n  border: 2px solid rgba(255,255,255,0.1);\n  animation: orbit-spin 1.5s linear infinite;\n}\n.planet {\n  position: absolute;\n  width: 10px; height: 10px;\n  background: #B8FB3C;\n  border-radius: 50%;\n  top: -6px; left: 50%; transform: translateX(-50%);\n}\n@keyframes orbit-spin { to { transform: rotate(360deg); } }`
	},
	{
		id: 'loader-skeleton', name: 'Skeleton Loader', tag: 'skeleton', description: 'Content skeleton with shimmer — placeholder for async content.',
		html: `<div class="skeleton-card">\n  <div class="skel-line w-full"></div>\n  <div class="skel-line w-3/4"></div>\n  <div class="skel-line w-1/2"></div>\n</div>`,
		css: `.skel-line {\n  height: 14px;\n  border-radius: 6px;\n  background: rgba(255,255,255,0.07);\n  margin-bottom: 10px;\n  overflow: hidden;\n  position: relative;\n}\n.skel-line::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);\n  animation: shimmer-scan 1.4s infinite;\n}\n@keyframes shimmer-scan {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(100%); }\n}\n.skeleton-card { padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); }`
	},
	{
		id: 'loader-bars', name: 'Equalizer Bars', tag: 'bars', description: 'Equalizer-style animated bars — great for audio/voice states.',
		html: `<div class="eq-bars">\n  <div></div><div></div><div></div><div></div><div></div>\n</div>`,
		css: `.eq-bars {\n  display: flex;\n  align-items: flex-end;\n  gap: 4px;\n  height: 36px;\n}\n.eq-bars div {\n  width: 6px;\n  background: #B8FB3C;\n  border-radius: 3px 3px 0 0;\n  animation: eq-animate 1s ease infinite;\n}\n.eq-bars div:nth-child(1) { animation-delay: 0s; height: 60%; }\n.eq-bars div:nth-child(2) { animation-delay: 0.1s; height: 100%; }\n.eq-bars div:nth-child(3) { animation-delay: 0.2s; height: 40%; }\n.eq-bars div:nth-child(4) { animation-delay: 0.3s; height: 80%; }\n.eq-bars div:nth-child(5) { animation-delay: 0.4s; height: 60%; }\n@keyframes eq-animate {\n  0%, 100% { transform: scaleY(0.4); }\n  50% { transform: scaleY(1); }\n}`
	},
	{
		id: 'loader-ripple', name: 'Ripple Loader', tag: 'ripple', description: 'Two concentric ripple rings expand outward alternately.',
		html: `<div class="ripple-loader"><div></div><div></div></div>`,
		css: `.ripple-loader {\n  position: relative;\n  width: 50px; height: 50px;\n}\n.ripple-loader div {\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  border: 3px solid #B8FB3C;\n  animation: ripple-out 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n.ripple-loader div:nth-child(2) { animation-delay: -0.75s; }\n@keyframes ripple-out {\n  0% { transform: scale(0); opacity: 1; }\n  100% { transform: scale(1); opacity: 0; }\n}`
	},
	{
		id: 'loader-gradient-ring', name: 'Gradient Ring', tag: 'spinner', description: 'Conic gradient spinner with vivid color arc.',
		html: `<div class="gradient-ring"></div>`,
		css: `.gradient-ring {\n  width: 44px; height: 44px;\n  border-radius: 50%;\n  background: conic-gradient(#B8FB3C 0%, #a855f7 40%, transparent 40%);\n  animation: gradient-ring-spin 1s linear infinite;\n  mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 4px));\n  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 4px));\n}\n@keyframes gradient-ring-spin { to { transform: rotate(360deg); } }`
	},
	{
		id: 'loader-shimmer-card', name: 'Shimmer Card', tag: 'skeleton', description: 'Full card placeholder shimmer for article/image lists.',
		html: `<div class="shimmer-card">\n  <div class="shimmer-img"></div>\n  <div class="shimmer-body">\n    <div class="s-line full"></div>\n    <div class="s-line half"></div>\n  </div>\n</div>`,
		css: `.shimmer-card {\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.06);\n  border-radius: 14px;\n  overflow: hidden;\n}\n.shimmer-img {\n  height: 80px;\n  background: rgba(255,255,255,0.07);\n  position: relative;\n  overflow: hidden;\n}\n.shimmer-body { padding: 12px; }\n.s-line {\n  height: 10px;\n  border-radius: 5px;\n  background: rgba(255,255,255,0.07);\n  margin-bottom: 8px;\n  position: relative;\n  overflow: hidden;\n}\n.s-line.full { width: 100%; }\n.s-line.half { width: 60%; }\n.shimmer-img::after, .s-line::after {\n  content: '';\n  position: absolute; inset: 0;\n  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);\n  animation: shimmer-scan 1.4s infinite;\n}\n@keyframes shimmer-scan {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(100%); }\n}`
	},
	{
		id: 'loader-dots-typing', name: 'Typing Indicator', tag: 'dots', description: 'Chat typing indicator — three sequential jumping dots.',
		html: `<div class="typing-dots"><span></span><span></span><span></span></div>`,
		css: `.typing-dots {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 10px 16px;\n  background: rgba(255,255,255,0.06);\n  border-radius: 50px;\n  display: inline-flex;\n}\n.typing-dots span {\n  width: 8px; height: 8px;\n  border-radius: 50%;\n  background: rgba(255,255,255,0.4);\n  animation: typing-jump 1.4s ease infinite;\n}\n.typing-dots span:nth-child(2) { animation-delay: 0.2s; }\n.typing-dots span:nth-child(3) { animation-delay: 0.4s; }\n@keyframes typing-jump {\n  0%, 60%, 100% { transform: translateY(0); }\n  30% { transform: translateY(-6px); }\n}`
	},
	{
		id: 'loader-spinner-dual', name: 'Dual Ring', tag: 'spinner', description: 'Two counter-rotating rings for a layered spinner effect.',
		html: `<div class="dual-ring"></div>`,
		css: `.dual-ring {\n  position: relative;\n  width: 44px; height: 44px;\n}\n.dual-ring::before, .dual-ring::after {\n  content: '';\n  position: absolute;\n  border-radius: 50%;\n}\n.dual-ring::before {\n  inset: 0;\n  border: 3px solid transparent;\n  border-top-color: #B8FB3C;\n  animation: ring-spin 0.8s linear infinite;\n}\n.dual-ring::after {\n  inset: 6px;\n  border: 3px solid transparent;\n  border-bottom-color: #a855f7;\n  animation: ring-spin 1.2s linear infinite reverse;\n}\n@keyframes ring-spin { to { transform: rotate(360deg); } }`
	},
	{
		id: 'loader-text', name: 'Loading Text', tag: 'text', description: 'Animated "Loading..." text with fading trailing dots.',
		html: `<span class="loading-text">Loading<span class="dots"></span></span>`,
		css: `.loading-text {\n  color: rgba(255,255,255,0.7);\n  font-size: 15px;\n  font-family: monospace;\n}\n.dots::after {\n  content: '';\n  animation: loading-dots 1.5s steps(4, end) infinite;\n}\n@keyframes loading-dots {\n  0% { content: ''; }\n  25% { content: '.'; }\n  50% { content: '..'; }\n  75% { content: '...'; }\n  100% { content: ''; }\n}`
	},
	{
		id: 'loader-circular-progress', name: 'Circular Progress', tag: 'progress', description: 'SVG circular progress indicator with animated stroke.',
		html: `<svg class="circular-progress" viewBox="0 0 44 44">\n  <circle class="bg-circle" cx="22" cy="22" r="18" />\n  <circle class="progress-circle" cx="22" cy="22" r="18" />\n</svg>`,
		css: `.circular-progress {\n  width: 50px; height: 50px;\n  transform: rotate(-90deg);\n}\n.bg-circle {\n  fill: none;\n  stroke: rgba(255,255,255,0.1);\n  stroke-width: 3;\n}\n.progress-circle {\n  fill: none;\n  stroke: #B8FB3C;\n  stroke-width: 3;\n  stroke-linecap: round;\n  stroke-dasharray: 113;\n  stroke-dashoffset: 113;\n  animation: circle-progress 2s ease-in-out infinite;\n}\n@keyframes circle-progress {\n  0% { stroke-dashoffset: 113; }\n  50% { stroke-dashoffset: 30; }\n  100% { stroke-dashoffset: 113; }\n}`
	},
	{
		id: 'loader-wifi', name: 'WiFi Loader', tag: 'icon', description: 'Animated WiFi icon — arcs appear in sequence.',
		html: `<div class="wifi-loader"><div></div><div></div><div></div></div>`,
		css: `.wifi-loader {\n  position: relative;\n  width: 40px; height: 40px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n}\n.wifi-loader div {\n  position: absolute;\n  border-radius: 50%;\n  border: 3px solid rgba(255,255,255,0.1);\n  border-top-color: transparent;\n  border-bottom-color: transparent;\n  border-left-color: transparent;\n  animation: wifi-arc 1.5s ease infinite;\n}\n.wifi-loader div:nth-child(1) { width: 12px; height: 12px; border-right-color: #B8FB3C; animation-delay: 0s; }\n.wifi-loader div:nth-child(2) { width: 24px; height: 24px; border-right-color: #B8FB3C; animation-delay: 0.2s; }\n.wifi-loader div:nth-child(3) { width: 36px; height: 36px; border-right-color: #B8FB3C; animation-delay: 0.4s; }\n@keyframes wifi-arc {\n  0%, 100% { opacity: 0.2; }\n  50% { opacity: 1; }\n}`
	},
];

export default function Loaders() {
	const [sel, setSel] = useState<Item | null>(null);
	return (
		<>
			{/* Keyframes for previews that reference custom animations */}
			<style dangerouslySetInnerHTML={{
				__html: `
				@keyframes progress-slide {
					0% { transform: translateX(-100%) scaleX(0.4); }
					50% { transform: translateX(25%) scaleX(1); }
					100% { transform: translateX(150%) scaleX(0.4); }
				}
				@keyframes circle-progress-preview {
					0% { stroke-dashoffset: 113; }
					50% { stroke-dashoffset: 30; }
					100% { stroke-dashoffset: 113; }
				}
			` }} />
			<PageSEO
				title="CSS Loading Animations – Pure CSS Loaders & Spinners – UIXplor"
				description="30+ CSS loading animations — spinners, skeleton screens, progress bars, dot loaders and more. Zero JavaScript, pure CSS. Copy any loader with one click."
				path="/collections/loaders"
				keywords={['CSS loader', 'CSS loading animation', 'CSS spinner', 'skeleton loader CSS', 'progress bar CSS', 'pure CSS loader', 'loading indicator CSS']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Loaders Collection – UIXplor',
						description: '30+ CSS loading animations including spinners, skeleton screens, progress bars, and dot loaders — all pure CSS, no JavaScript required.',
						url: 'https://uixplor.com/collections/loaders',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'CSS Loaders', item: 'https://uixplor.com/collections/loaders' },
						],
					},
				]}
			/>
			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					<nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Loaders</li></ol></nav>
					<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Loaders</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">CSS loading animations — spinners, dots, skeletons, bars, and progress indicators.</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-teal-400 bg-teal-500/10 rounded-full border border-teal-500/20"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />{items.length} loaders</span>
					</motion.div>
					<GlowGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, i) => (
							<motion.div key={item.id} className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.04 }}>
								<div className="h-36 flex items-center justify-center bg-[#0a0a0f] rounded-t-2xl">
									<LoaderPreview item={item} />
								</div>
								<div className="px-5 py-4 border-t border-white/6">
									<h3 className="text-sm font-semibold text-white mb-0.5">{item.name}</h3>
									<p className="text-xs text-white/40 mb-3 leading-relaxed">{item.description}</p>
									<div className="flex items-center justify-between">
										<span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider">{item.tag}</span>
										<button onClick={() => setSel(item)} className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-teal-400 hover:text-[#0a0a0f] hover:border-teal-400 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(45,212,191,0.2)] transition-all duration-300 cursor-pointer">View Code →</button>
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

function LoaderPreview({ item }: { item: Item }) {
	if (item.id === 'loader-spinner') return <div className="w-10 h-10 rounded-full border-[3px] border-white/10 border-t-[#B8FB3C] animate-spin" />;
	if (item.id === 'loader-dots') return <div className="flex items-center gap-1.5">{[0, 200, 400].map((d, i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#B8FB3C] animate-bounce" style={{ animationDelay: `${d}ms` }} />)}</div>;
	if (item.id === 'loader-bar') return <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ background: 'linear-gradient(to right, #B8FB3C, #06b6d4)', animation: 'progress-slide 1.8s ease-in-out infinite' }} /></div>;
	if (item.id === 'loader-pulse') return <div className="w-10 h-10 rounded-full bg-[#B8FB3C]/30 animate-ping" />;
	if (item.id === 'loader-orbit') return <div className="relative w-11 h-11 rounded-full border-2 border-white/10 animate-spin"><div className="absolute w-2.5 h-2.5 bg-[#B8FB3C] rounded-full -top-1.5 left-1/2 -translate-x-1/2" /></div>;
	if (item.id === 'loader-skeleton') return <div className="w-3/4 p-3 rounded-xl bg-white/4 border border-white/6 space-y-2"><div className="h-3 w-full rounded bg-white/8 animate-pulse" /><div className="h-3 w-3/4 rounded bg-white/8 animate-pulse" /><div className="h-3 w-1/2 rounded bg-white/8 animate-pulse" /></div>;
	if (item.id === 'loader-bars') return <div className="flex items-end gap-1 h-9">{[60, 100, 40, 80, 60].map((h, i) => <div key={i} className="w-1.5 bg-[#B8FB3C] rounded-t animate-bounce" style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }} />)}</div>;
	if (item.id === 'loader-ripple') return <div className="relative w-12 h-12">{[0, -750].map((d, i) => <div key={i} className="absolute inset-0 rounded-full border-2 border-[#B8FB3C] animate-ping" style={{ animationDelay: `${d}ms` }} />)}</div>;
	if (item.id === 'loader-gradient-ring') return <div className="w-11 h-11 rounded-full animate-spin" style={{ background: 'conic-gradient(#B8FB3C 0%, #a855f7 40%, transparent 40%)', mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 4px))', WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 4px))' }} />;
	if (item.id === 'loader-shimmer-card') return <div className="w-3/4 rounded-xl bg-white/4 border border-white/6 overflow-hidden"><div className="h-12 bg-white/8 relative overflow-hidden"><div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/8 to-transparent" /></div><div className="p-2.5 space-y-1.5"><div className="h-2 w-full bg-white/8 rounded animate-pulse" /><div className="h-2 w-3/5 bg-white/8 rounded animate-pulse" /></div></div>;
	if (item.id === 'loader-dots-typing') return <div className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/6 rounded-full">{[0, 200, 400].map((d, i) => <div key={i} className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}</div>;
	if (item.id === 'loader-spinner-dual') return <div className="relative w-11 h-11"><div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#B8FB3C] animate-spin" /><div className="absolute inset-1.5 rounded-full border-[3px] border-transparent border-b-[#a855f7] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} /></div>;
	if (item.id === 'loader-text') return <span className="text-white/70 font-mono text-sm"><span className="animate-pulse">Loading</span><span className="animate-bounce">...</span></span>;
	if (item.id === 'loader-circular-progress') return <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" /><circle cx="22" cy="22" r="18" fill="none" stroke="#B8FB3C" strokeWidth="3" strokeLinecap="round" strokeDasharray="113" strokeDashoffset="40" style={{ animation: 'circle-progress-preview 2s ease-in-out infinite', transformOrigin: 'center' }} /></svg>;
	if (item.id === 'loader-wifi') return <div className="flex items-end justify-center gap-1 h-8">{[40, 65, 90].map((h, i) => <div key={i} className="w-1.5 rounded-full bg-[#B8FB3C] animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 200}ms` }} />)}</div>;
	return null;
}
