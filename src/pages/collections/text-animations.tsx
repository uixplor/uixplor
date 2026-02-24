import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface TextEffect {
	id: string;
	name: string;
	category: string;
	text: string;
	css: string;
}

const textEffects: TextEffect[] = [
	// ── Typewriter ──
	{
		id: 'typewriter-basic', name: 'Typewriter', category: 'typewriter', text: 'Hello World',
		css: `.typewriter {\n  font-family: monospace;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 2px solid #B8FB3C;\n  animation: typing 2s steps(11) infinite, blink 0.6s step-end infinite;\n}\n@keyframes typing {\n  from { width: 0 }\n  to { width: 11ch }\n}\n@keyframes blink {\n  50% { border-color: transparent }\n}`
	},
	{
		id: 'typewriter-delete', name: 'Type & Delete', category: 'typewriter', text: 'UIXplor',
		css: `.type-delete {\n  font-family: monospace;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 2px solid #a855f7;\n  animation: type-del 4s steps(7) infinite;\n}\n@keyframes type-del {\n  0%, 10% { width: 0 }\n  40%, 60% { width: 7ch }\n  90%, 100% { width: 0 }\n}`
	},
	{
		id: 'typewriter-multi', name: 'Multi-line Type', category: 'typewriter', text: 'Code',
		css: `.multi-type {\n  font-family: monospace;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 3px solid #06b6d4;\n  width: 0;\n  animation: multi-typing 2s steps(4) forwards, blink-cursor 0.7s infinite;\n}\n@keyframes multi-typing {\n  to { width: 4ch }\n}\n@keyframes blink-cursor {\n  50% { border-color: transparent }\n}`
	},

	// ── Gradient ──
	{
		id: 'gradient-sweep', name: 'Gradient Sweep', category: 'gradient', text: 'UIXplor',
		css: `.gradient-sweep {\n  background: linear-gradient(to right, #B8FB3C, #a855f7, #06b6d4);\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: gradient-move 3s linear infinite;\n}\n@keyframes gradient-move {\n  to { background-position: 200% center }\n}`
	},
	{
		id: 'gradient-pulse', name: 'Gradient Pulse', category: 'gradient', text: 'Pulse',
		css: `.gradient-pulse {\n  background: linear-gradient(90deg, #f093fb, #f5576c, #4facfe);\n  background-size: 300% 100%;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: pulse-gradient 2s ease infinite;\n}\n@keyframes pulse-gradient {\n  0%, 100% { background-position: 0% 50% }\n  50% { background-position: 100% 50% }\n}`
	},
	{
		id: 'gradient-rainbow', name: 'Rainbow Flow', category: 'gradient', text: 'Rainbow',
		css: `.rainbow-flow {\n  background: linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00ff00, #0077ff, #8b00ff, #ff0000);\n  background-size: 400% 100%;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  animation: rainbow 4s linear infinite;\n}\n@keyframes rainbow {\n  to { background-position: 400% 0 }\n}`
	},

	// ── Glow ──
	{
		id: 'neon-glow', name: 'Neon Glow', category: 'glow', text: 'Neon',
		css: `.neon-glow {\n  color: #B8FB3C;\n  animation: neon-pulse 2s ease-in-out infinite;\n}\n@keyframes neon-pulse {\n  0%, 100% { text-shadow: 0 0 8px rgba(184,251,60,0.3) }\n  50% { text-shadow: 0 0 24px rgba(184,251,60,0.6), 0 0 48px rgba(184,251,60,0.3) }\n}`
	},
	{
		id: 'glow-flicker', name: 'Flicker Glow', category: 'glow', text: 'Flicker',
		css: `.flicker-glow {\n  color: #06b6d4;\n  animation: flicker 3s linear infinite;\n}\n@keyframes flicker {\n  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {\n    text-shadow: 0 0 10px #06b6d4, 0 0 20px #06b6d4;\n  }\n  20%, 24%, 55% {\n    text-shadow: none;\n  }\n}`
	},
	{
		id: 'glow-breathe', name: 'Breathe Glow', category: 'glow', text: 'Breathe',
		css: `.breathe-glow {\n  color: #a855f7;\n  animation: breathe 3s ease-in-out infinite;\n}\n@keyframes breathe {\n  0%, 100% { text-shadow: 0 0 4px rgba(168,85,247,0.2); opacity: 0.8 }\n  50% { text-shadow: 0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(168,85,247,0.3); opacity: 1 }\n}`
	},

	// ── Bounce ──
	{
		id: 'bounce-letters', name: 'Bounce Letters', category: 'bounce', text: 'Bounce',
		css: `.bounce-letters span {\n  display: inline-block;\n  animation: bounce-up 0.6s ease infinite;\n}\n.bounce-letters span:nth-child(2) { animation-delay: 0.08s }\n.bounce-letters span:nth-child(3) { animation-delay: 0.16s }\n.bounce-letters span:nth-child(4) { animation-delay: 0.24s }\n@keyframes bounce-up {\n  0%, 100% { transform: translateY(0) }\n  50% { transform: translateY(-12px) }\n}`
	},
	{
		id: 'bounce-scale', name: 'Bounce Scale', category: 'bounce', text: 'Pop',
		css: `.bounce-scale {\n  display: inline-block;\n  animation: pop-bounce 1s ease infinite;\n}\n@keyframes pop-bounce {\n  0%, 100% { transform: scale(1) }\n  30% { transform: scale(1.15) }\n  50% { transform: scale(0.95) }\n  70% { transform: scale(1.05) }\n}`
	},
	{
		id: 'bounce-elastic', name: 'Elastic Drop', category: 'bounce', text: 'Drop',
		css: `.elastic-drop {\n  display: inline-block;\n  animation: elastic 2s ease infinite;\n}\n@keyframes elastic {\n  0% { transform: translateY(-40px); opacity: 0 }\n  30% { transform: translateY(8px) }\n  50% { transform: translateY(-4px) }\n  70% { transform: translateY(2px) }\n  100% { transform: translateY(0); opacity: 1 }\n}`
	},

	// ── Slide ──
	{
		id: 'slide-reveal', name: 'Slide Reveal', category: 'slide', text: 'Reveal',
		css: `.slide-reveal {\n  overflow: hidden;\n}\n.slide-reveal span {\n  display: block;\n  animation: slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n  animation-delay: 2s;\n}\n@keyframes slide-in {\n  from { transform: translateX(-100%) }\n  to { transform: translateX(0) }\n}`
	},
	{
		id: 'slide-up', name: 'Slide Up', category: 'slide', text: 'Rise',
		css: `.slide-up {\n  overflow: hidden;\n}\n.slide-up span {\n  display: block;\n  animation: rise 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n}\n@keyframes rise {\n  from { transform: translateY(100%); opacity: 0 }\n  to { transform: translateY(0); opacity: 1 }\n}`
	},
	{
		id: 'slide-split', name: 'Split Reveal', category: 'slide', text: 'Split',
		css: `.split-reveal {\n  position: relative;\n  overflow: hidden;\n}\n.split-reveal::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: #0a0a0f;\n  animation: split-wipe 1.5s ease forwards infinite;\n}\n@keyframes split-wipe {\n  0% { transform: translateX(0) }\n  100% { transform: translateX(101%) }\n}`
	},

	// ── Blur ──
	{
		id: 'blur-in', name: 'Blur In', category: 'blur', text: 'Focus',
		css: `.blur-in {\n  animation: blur-focus 1.2s ease infinite;\n}\n@keyframes blur-focus {\n  0% { filter: blur(8px); opacity: 0 }\n  100% { filter: blur(0); opacity: 1 }\n}`
	},
	{
		id: 'blur-wave', name: 'Blur Wave', category: 'blur', text: 'Wave',
		css: `.blur-wave span {\n  display: inline-block;\n  animation: blur-letter 2s ease infinite;\n}\n.blur-wave span:nth-child(2) { animation-delay: 0.1s }\n.blur-wave span:nth-child(3) { animation-delay: 0.2s }\n@keyframes blur-letter {\n  0%, 100% { filter: blur(0) }\n  50% { filter: blur(4px) }\n}`
	},

	// ── Fade ──
	{
		id: 'fade-in', name: 'Fade In', category: 'fade', text: 'Appear',
		css: `.fade-in {\n  animation: fade-appear 1s ease forwards;\n}\n@keyframes fade-appear {\n  from { opacity: 0; transform: translateY(10px) }\n  to { opacity: 1; transform: translateY(0) }\n}`
	},
	{
		id: 'fade-letters', name: 'Fade Letters', category: 'fade', text: 'Hello',
		css: `.fade-letters span {\n  display: inline-block;\n  opacity: 0;\n  animation: letter-fade 0.4s ease forwards;\n}\n.fade-letters span:nth-child(2) { animation-delay: 0.1s }\n.fade-letters span:nth-child(3) { animation-delay: 0.2s }\n@keyframes letter-fade {\n  to { opacity: 1 }\n}`
	},
	{
		id: 'fade-scale', name: 'Fade Scale', category: 'fade', text: 'Zoom',
		css: `.fade-scale {\n  animation: scale-fade 1.5s ease infinite;\n}\n@keyframes scale-fade {\n  0% { opacity: 0; transform: scale(0.8) }\n  50% { opacity: 1; transform: scale(1) }\n  100% { opacity: 0; transform: scale(1.1) }\n}`
	},

	// ── Wave ──
	{
		id: 'wave-text', name: 'Wave Text', category: 'wave', text: 'Wave',
		css: `.wave-text span {\n  display: inline-block;\n  animation: wave 1.5s ease-in-out infinite;\n}\n.wave-text span:nth-child(2) { animation-delay: 0.1s }\n.wave-text span:nth-child(3) { animation-delay: 0.2s }\n@keyframes wave {\n  0%, 100% { transform: translateY(0) }\n  25% { transform: translateY(-8px) }\n  75% { transform: translateY(4px) }\n}`
	},
	{
		id: 'wave-color', name: 'Color Wave', category: 'wave', text: 'Color',
		css: `.color-wave span {\n  display: inline-block;\n  animation: color-shift 2s ease infinite;\n}\n.color-wave span:nth-child(2) { animation-delay: 0.15s }\n.color-wave span:nth-child(3) { animation-delay: 0.3s }\n@keyframes color-shift {\n  0%, 100% { color: #B8FB3C }\n  33% { color: #a855f7 }\n  66% { color: #06b6d4 }\n}`
	},

	// ── Glitch ──
	{
		id: 'glitch-basic', name: 'Glitch', category: 'glitch', text: 'Glitch',
		css: `.glitch {\n  position: relative;\n  animation: glitch-skew 1s infinite linear;\n}\n.glitch::before,\n.glitch::after {\n  content: attr(data-text);\n  position: absolute;\n  top: 0; left: 0;\n}\n.glitch::before {\n  color: #ff00c1;\n  animation: glitch-1 0.5s infinite;\n  clip-path: inset(40% 0 60% 0);\n}\n.glitch::after {\n  color: #00fff9;\n  animation: glitch-2 0.5s infinite;\n  clip-path: inset(20% 0 40% 0);\n}\n@keyframes glitch-1 {\n  20% { transform: translate(-2px, 2px) }\n  40% { transform: translate(2px, -2px) }\n  60% { transform: translate(-2px, 0) }\n}\n@keyframes glitch-2 {\n  20% { transform: translate(2px, -2px) }\n  40% { transform: translate(-2px, 2px) }\n  60% { transform: translate(2px, 0) }\n}`
	},
	{
		id: 'glitch-distort', name: 'Distortion', category: 'glitch', text: 'Error',
		css: `.distortion {\n  animation: distort 3s infinite;\n}\n@keyframes distort {\n  0%, 100% { text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9 }\n  25% { text-shadow: -2px 2px #ff00c1, 2px -2px #00fff9 }\n  50% { text-shadow: 2px -2px #ff00c1, -2px 2px #00fff9 }\n  75% { text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9 }\n}`
	},

	// ── Rotate ──
	{
		id: 'rotate-in', name: 'Rotate In', category: 'rotate', text: 'Spin',
		css: `.rotate-in {\n  display: inline-block;\n  animation: rotate-enter 1s ease infinite;\n}\n@keyframes rotate-enter {\n  from { transform: rotate(-180deg); opacity: 0 }\n  to { transform: rotate(0); opacity: 1 }\n}`
	},
	{
		id: 'rotate-letters', name: 'Letter Spin', category: 'rotate', text: 'Turn',
		css: `.letter-spin span {\n  display: inline-block;\n  animation: spin-letter 2s ease infinite;\n}\n.letter-spin span:nth-child(2) { animation-delay: 0.1s }\n.letter-spin span:nth-child(3) { animation-delay: 0.2s }\n@keyframes spin-letter {\n  0%, 100% { transform: rotateY(0) }\n  50% { transform: rotateY(360deg) }\n}`
	},
	{
		id: 'rotate-3d', name: '3D Flip', category: 'rotate', text: 'Flip',
		css: `.flip-3d {\n  display: inline-block;\n  animation: flip-text 2s ease infinite;\n  perspective: 500px;\n}\n@keyframes flip-text {\n  0%, 100% { transform: rotateX(0) }\n  50% { transform: rotateX(180deg) }\n}`
	},

	// ── Scale ──
	{
		id: 'scale-in', name: 'Scale In', category: 'scale', text: 'Grow',
		css: `.scale-in {\n  display: inline-block;\n  animation: grow-in 1s ease forwards;\n}\n@keyframes grow-in {\n  from { transform: scale(0); opacity: 0 }\n  to { transform: scale(1); opacity: 1 }\n}`
	},
	{
		id: 'scale-pulse', name: 'Scale Pulse', category: 'scale', text: 'Pulse',
		css: `.scale-pulse {\n  display: inline-block;\n  animation: pulse-scale 1.5s ease infinite;\n}\n@keyframes pulse-scale {\n  0%, 100% { transform: scale(1) }\n  50% { transform: scale(1.08) }\n}`
	},
	{
		id: 'scale-letters', name: 'Pop Letters', category: 'scale', text: 'Bang',
		css: `.pop-letters span {\n  display: inline-block;\n  animation: pop-letter 0.5s ease forwards;\n  transform: scale(0);\n}\n.pop-letters span:nth-child(2) { animation-delay: 0.1s }\n.pop-letters span:nth-child(3) { animation-delay: 0.2s }\n@keyframes pop-letter {\n  0% { transform: scale(0) }\n  70% { transform: scale(1.2) }\n  100% { transform: scale(1) }\n}`
	},

	// ── Shadow ──
	{
		id: 'shadow-lift', name: 'Shadow Lift', category: 'shadow', text: 'Lift',
		css: `.shadow-lift {\n  animation: lift-shadow 2s ease infinite;\n}\n@keyframes lift-shadow {\n  0%, 100% { text-shadow: 0 2px 4px rgba(0,0,0,0.2) }\n  50% { text-shadow: 0 8px 16px rgba(0,0,0,0.3); transform: translateY(-4px) }\n}`
	},
	{
		id: 'shadow-long', name: 'Long Shadow', category: 'shadow', text: 'Deep',
		css: `.long-shadow {\n  color: #fff;\n  animation: long-shad 3s ease infinite;\n}\n@keyframes long-shad {\n  0%, 100% { text-shadow: 1px 1px #0003, 2px 2px #0003, 3px 3px #0003 }\n  50% { text-shadow: 2px 2px #0003, 4px 4px #0003, 6px 6px #0003, 8px 8px #0002, 10px 10px #0001 }\n}`
	},

	// ── Underline ──
	{
		id: 'underline-grow', name: 'Underline Grow', category: 'underline', text: 'Underline',
		css: `.underline-grow {\n  position: relative;\n  display: inline-block;\n}\n.underline-grow::after {\n  content: '';\n  position: absolute;\n  bottom: -2px; left: 0;\n  width: 0; height: 2px;\n  background: #B8FB3C;\n  animation: grow-line 2s ease infinite;\n}\n@keyframes grow-line {\n  0% { width: 0 }\n  50% { width: 100% }\n  100% { width: 0 }\n}`
	},
	{
		id: 'underline-slide', name: 'Slide Underline', category: 'underline', text: 'Slide',
		css: `.slide-underline {\n  position: relative;\n  display: inline-block;\n}\n.slide-underline::after {\n  content: '';\n  position: absolute;\n  bottom: -2px; left: 0;\n  width: 100%; height: 2px;\n  background: #a855f7;\n  transform: translateX(-100%);\n  animation: slide-line 2s ease infinite;\n}\n@keyframes slide-line {\n  0% { transform: translateX(-100%) }\n  50% { transform: translateX(0) }\n  100% { transform: translateX(100%) }\n}`
	},

	// ── Stroke ──
	{
		id: 'stroke-fill', name: 'Stroke Fill', category: 'stroke', text: 'Stroke',
		css: `.stroke-fill {\n  -webkit-text-stroke: 1px #B8FB3C;\n  color: transparent;\n  animation: fill-stroke 3s ease infinite;\n}\n@keyframes fill-stroke {\n  0%, 100% { color: transparent }\n  50% { color: #B8FB3C }\n}`
	},
	{
		id: 'stroke-draw', name: 'Draw Outline', category: 'stroke', text: 'Draw',
		css: `.draw-outline {\n  -webkit-text-stroke: 2px #06b6d4;\n  color: transparent;\n  animation: draw-text 2s ease infinite;\n}\n@keyframes draw-text {\n  0% { -webkit-text-stroke-dashoffset: 100% }\n  50% { color: #06b6d4 }\n  100% { color: transparent }\n}`
	},

	// ── Scramble / Morph ──
	{
		id: 'morph-text', name: 'Morph Blur', category: 'morph', text: 'Morph',
		css: `.morph-blur {\n  animation: morph-anim 3s ease infinite;\n}\n@keyframes morph-anim {\n  0%, 100% { filter: blur(0); transform: scale(1) }\n  25% { filter: blur(2px); transform: scale(1.02) }\n  50% { filter: blur(0); transform: scale(0.98) }\n  75% { filter: blur(1px); transform: scale(1.01) }\n}`
	},
	{
		id: 'scramble-shake', name: 'Scramble Shake', category: 'morph', text: 'Shake',
		css: `.scramble-shake {\n  display: inline-block;\n  animation: shake-text 0.3s ease infinite;\n}\n@keyframes shake-text {\n  0% { transform: translate(0) }\n  25% { transform: translate(-2px, 1px) }\n  50% { transform: translate(2px, -1px) }\n  75% { transform: translate(-1px, 2px) }\n  100% { transform: translate(0) }\n}`
	},
	{
		id: 'jelly-wobble', name: 'Jelly Wobble', category: 'scale', text: 'Jelly',
		css: `.jelly-wobble {\n  display: inline-block;\n  animation: jelly 1.5s ease infinite;\n}\n@keyframes jelly {\n  0%, 100% { transform: scale(1, 1) }\n  25% { transform: scale(0.9, 1.1) }\n  50% { transform: scale(1.1, 0.9) }\n  75% { transform: scale(0.95, 1.05) }\n}`
	},
	{
		id: 'stagger-reveal', name: 'Stagger Reveal', category: 'fade', text: 'Magic',
		css: `.stagger-reveal span {\n  display: inline-block;\n  opacity: 0;\n  transform: translateY(20px);\n  animation: stagger-up 0.5s ease forwards;\n}\n.stagger-reveal span:nth-child(2) { animation-delay: 0.1s }\n.stagger-reveal span:nth-child(3) { animation-delay: 0.2s }\n.stagger-reveal span:nth-child(4) { animation-delay: 0.3s }\n.stagger-reveal span:nth-child(5) { animation-delay: 0.4s }\n@keyframes stagger-up {\n  to { opacity: 1; transform: translateY(0) }\n}`
	},
];

const CATEGORIES = [
	{ key: 'all', label: 'All' },
	{ key: 'typewriter', label: 'Typewriter' },
	{ key: 'gradient', label: 'Gradient' },
	{ key: 'glow', label: 'Glow' },
	{ key: 'bounce', label: 'Bounce' },
	{ key: 'slide', label: 'Slide' },
	{ key: 'blur', label: 'Blur' },
	{ key: 'fade', label: 'Fade' },
	{ key: 'wave', label: 'Wave' },
	{ key: 'glitch', label: 'Glitch' },
	{ key: 'rotate', label: 'Rotate' },
	{ key: 'scale', label: 'Scale' },
	{ key: 'shadow', label: 'Shadow' },
	{ key: 'underline', label: 'Underline' },
	{ key: 'stroke', label: 'Stroke' },
	{ key: 'morph', label: 'Morph' },
];

export default function TextAnimations() {
	const [activeCategory, setActiveCategory] = useState('all');
	const [selectedEffect, setSelectedEffect] = useState<TextEffect | null>(null);

	const filtered = activeCategory === 'all'
		? textEffects
		: textEffects.filter((e) => e.category === activeCategory);

	return (
		<>
			<Head>
				<title>Text Animations — UIXplor</title>
				<meta name="description" content="A curated collection of 40 CSS text animation effects. Copy any animation with one click." />
			</Head>

			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					{/* Breadcrumbs */}
					<nav className="mb-8">
						<ol className="flex items-center gap-2 text-sm text-white/40">
							<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
							<li>/</li>
							<li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li>
							<li>/</li>
							<li className="text-white font-medium">Text Animations</li>
						</ol>
					</nav>

					{/* Hero */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
							Text Animations
						</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">
							Eye-catching CSS text effects — click any card to view & copy code.
						</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
							<span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
							{textEffects.length} animations
						</span>
					</motion.div>

					{/* Category Filters */}
					<div className="flex flex-wrap gap-2 mb-10 justify-center">
						{CATEGORIES.map((cat) => {
							const isActive = activeCategory === cat.key;
							const count = cat.key === 'all'
								? textEffects.length
								: textEffects.filter((e) => e.category === cat.key).length;
							return (
								<button
									key={cat.key}
									onClick={() => setActiveCategory(cat.key)}
									className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-250 ${isActive
										? 'bg-orange-400 text-[#0a0a0f]'
										: 'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/[0.06]'
										}`}
								>
									{cat.label}
									<span className={`ml-1 text-[10px] ${isActive ? 'text-[#0a0a0f]/60' : 'text-white/30'}`}>
										{count}
									</span>
								</button>
							);
						})}
					</div>

					{/* Animation Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filtered.map((effect, index) => (
							<motion.div
								key={effect.id}
								className="rounded-2xl overflow-hidden bg-white/4 border border-white/8 transition-colors duration-300"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.04 }}
							>
								{/* Preview area */}
								<div className="h-36 sm:h-44 flex items-center justify-center p-6 bg-[#0a0a0f]">
									<TextPreview type={effect.id} text={effect.text} category={effect.category} />
								</div>
								{/* Info */}
								<div className="px-5 py-4 flex items-center justify-between border-t border-white/6">
									<div className="min-w-0 mr-3">
										<h3 className="text-sm font-semibold text-white">{effect.name}</h3>
										<p className="text-xs text-white/30 mt-0.5 capitalize">{effect.category}</p>
									</div>
									<button
										onClick={() => setSelectedEffect(effect)}
										className="relative z-10 shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-orange-400 hover:text-[#0a0a0f] hover:border-orange-400 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(251,146,60,0.2)] transition-all duration-300 cursor-pointer"
									>
										View Code →
									</button>
								</div>
							</motion.div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link
							href="/collections"
							className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white/40 hover:text-orange-400 transition-colors"
						>
							← Back to Collections
						</Link>
					</div>
				</div>
			</main>

			{/* Code Viewer Overlay */}
			<CodeViewerOverlay
				isOpen={!!selectedEffect}
				onClose={() => setSelectedEffect(null)}
				title={selectedEffect?.name || ''}
				sections={selectedEffect ? [
					{ label: 'HTML', language: 'html', code: `<span class="${selectedEffect.id}">${selectedEffect.text}</span>` },
					{ label: 'CSS', language: 'css', code: selectedEffect.css },
				] as CodeSection[] : []}
			/>
		</>
	);
}

function TextPreview({ type, text, category }: { type: string; text: string; category: string }) {
	const baseClass = 'text-3xl sm:text-4xl font-bold';

	switch (category) {
		case 'gradient':
			if (type === 'gradient-sweep') {
				return (
					<motion.span
						className={`${baseClass} bg-clip-text text-transparent`}
						style={{ backgroundImage: 'linear-gradient(to right, #B8FB3C, #a855f7, #06b6d4)', backgroundSize: '200% auto' }}
						animate={{ backgroundPosition: ['0% center', '200% center'] }}
						transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
					>{text}</motion.span>
				);
			}
			if (type === 'gradient-pulse') {
				return (
					<motion.span
						className={`${baseClass} bg-clip-text text-transparent`}
						style={{ backgroundImage: 'linear-gradient(90deg, #f093fb, #f5576c, #4facfe)', backgroundSize: '300% 100%' }}
						animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
						transition={{ duration: 2, repeat: Infinity }}
					>{text}</motion.span>
				);
			}
			return (
				<motion.span
					className={`${baseClass} bg-clip-text text-transparent`}
					style={{ backgroundImage: 'linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00ff00, #0077ff, #8b00ff, #ff0000)', backgroundSize: '400% 100%' }}
					animate={{ backgroundPosition: ['0% 0', '400% 0'] }}
					transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
				>{text}</motion.span>
			);

		case 'glow':
			const glowColors: Record<string, string> = {
				'neon-glow': 'rgba(184,251,60,',
				'glow-flicker': 'rgba(6,182,212,',
				'glow-breathe': 'rgba(168,85,247,',
			};
			const colorBase = glowColors[type] || 'rgba(184,251,60,';
			const textColor = type === 'glow-flicker' ? '#06b6d4' : type === 'glow-breathe' ? '#a855f7' : '#B8FB3C';
			return (
				<motion.span
					className={`${baseClass}`}
					style={{ color: textColor }}
					animate={{ textShadow: [`0 0 8px ${colorBase}0.3)`, `0 0 24px ${colorBase}0.6)`, `0 0 8px ${colorBase}0.3)`] }}
					transition={{ duration: 2, repeat: Infinity }}
				>{text}</motion.span>
			);

		case 'bounce':
			return (
				<span className={`${baseClass} text-white flex`}>
					{text.split('').map((char, i) => (
						<motion.span
							key={i}
							animate={{ y: [0, -12, 0] }}
							transition={{ duration: 0.6, delay: i * 0.08, repeat: Infinity, repeatDelay: 1.5 }}
						>{char}</motion.span>
					))}
				</span>
			);

		case 'slide':
			return (
				<div className="overflow-hidden">
					<motion.span
						className={`${baseClass} text-white block`}
						animate={{ x: ['-100%', '0%'] }}
						transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2, ease: [0.4, 0, 0.2, 1] as const }}
					>{text}</motion.span>
				</div>
			);

		case 'blur':
			if (type === 'blur-wave') {
				return (
					<span className={`${baseClass} text-white flex`}>
						{text.split('').map((char, i) => (
							<motion.span
								key={i}
								animate={{ filter: ['blur(0px)', 'blur(4px)', 'blur(0px)'] }}
								transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
							>{char}</motion.span>
						))}
					</span>
				);
			}
			return (
				<motion.span
					className={`${baseClass} text-white`}
					animate={{ filter: ['blur(8px)', 'blur(0px)'], opacity: [0, 1] }}
					transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
				>{text}</motion.span>
			);

		case 'fade':
			if (type === 'fade-letters') {
				return (
					<span className={`${baseClass} text-white flex`}>
						{text.split('').map((char, i) => (
							<motion.span
								key={i}
								animate={{ opacity: [0, 1] }}
								transition={{ duration: 0.4, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
							>{char}</motion.span>
						))}
					</span>
				);
			}
			if (type === 'fade-scale') {
				return (
					<motion.span
						className={`${baseClass} text-white`}
						animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1.1] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					>{text}</motion.span>
				);
			}
			if (type === 'stagger-reveal') {
				return (
					<span className={`${baseClass} text-white flex`}>
						{text.split('').map((char, i) => (
							<motion.span
								key={i}
								animate={{ opacity: [0, 1], y: [20, 0] }}
								transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
							>{char}</motion.span>
						))}
					</span>
				);
			}
			return (
				<motion.span
					className={`${baseClass} text-white`}
					animate={{ opacity: [0, 1], y: [10, 0] }}
					transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
				>{text}</motion.span>
			);

		case 'wave':
			if (type === 'wave-color') {
				return (
					<span className={`${baseClass} flex`}>
						{text.split('').map((char, i) => (
							<motion.span
								key={i}
								animate={{ color: ['#B8FB3C', '#a855f7', '#06b6d4', '#B8FB3C'] }}
								transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
							>{char}</motion.span>
						))}
					</span>
				);
			}
			return (
				<span className={`${baseClass} text-white flex`}>
					{text.split('').map((char, i) => (
						<motion.span
							key={i}
							animate={{ y: [0, -8, 4, 0] }}
							transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
						>{char}</motion.span>
					))}
				</span>
			);

		case 'glitch':
			return (
				<motion.span
					className={`${baseClass} text-white relative`}
					animate={{
						textShadow: [
							'2px 0 #ff00c1, -2px 0 #00fff9',
							'-2px 2px #ff00c1, 2px -2px #00fff9',
							'2px -2px #ff00c1, -2px 2px #00fff9',
							'-2px 0 #ff00c1, 2px 0 #00fff9',
						],
					}}
					transition={{ duration: 3, repeat: Infinity }}
				>{text}</motion.span>
			);

		case 'rotate':
			if (type === 'rotate-letters') {
				return (
					<span className={`${baseClass} text-white flex`}>
						{text.split('').map((char, i) => (
							<motion.span
								key={i}
								style={{ display: 'inline-block' }}
								animate={{ rotateY: [0, 360, 0] }}
								transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
							>{char}</motion.span>
						))}
					</span>
				);
			}
			if (type === 'rotate-3d') {
				return (
					<motion.span
						className={`${baseClass} text-white`}
						style={{ display: 'inline-block' }}
						animate={{ rotateX: [0, 180, 0] }}
						transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
					>{text}</motion.span>
				);
			}
			return (
				<motion.span
					className={`${baseClass} text-white`}
					style={{ display: 'inline-block' }}
					animate={{ rotate: [-180, 0], opacity: [0, 1] }}
					transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
				>{text}</motion.span>
			);

		case 'scale':
			if (type === 'scale-letters') {
				return (
					<span className={`${baseClass} text-white flex`}>
						{text.split('').map((char, i) => (
							<motion.span
								key={i}
								style={{ display: 'inline-block' }}
								animate={{ scale: [0, 1.2, 1] }}
								transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
							>{char}</motion.span>
						))}
					</span>
				);
			}
			if (type === 'scale-pulse') {
				return (
					<motion.span
						className={`${baseClass} text-white`}
						style={{ display: 'inline-block' }}
						animate={{ scale: [1, 1.08, 1] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					>{text}</motion.span>
				);
			}
			if (type === 'jelly-wobble') {
				return (
					<motion.span
						className={`${baseClass} text-white`}
						style={{ display: 'inline-block' }}
						animate={{ scaleX: [1, 0.9, 1.1, 0.95, 1], scaleY: [1, 1.1, 0.9, 1.05, 1] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					>{text}</motion.span>
				);
			}
			return (
				<motion.span
					className={`${baseClass} text-white`}
					style={{ display: 'inline-block' }}
					animate={{ scale: [0, 1], opacity: [0, 1] }}
					transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
				>{text}</motion.span>
			);

		case 'shadow':
			return (
				<motion.span
					className={`${baseClass} text-white`}
					animate={{
						textShadow: ['0 2px 4px rgba(0,0,0,0.2)', '0 8px 16px rgba(0,0,0,0.3)', '0 2px 4px rgba(0,0,0,0.2)'],
						y: [0, -4, 0],
					}}
					transition={{ duration: 2, repeat: Infinity }}
				>{text}</motion.span>
			);

		case 'underline':
			return (
				<span className="relative inline-block">
					<span className={`${baseClass} text-white`}>{text}</span>
					<motion.span
						className="absolute bottom-0 left-0 h-[3px] rounded-full"
						style={{ background: type === 'underline-slide' ? '#a855f7' : '#B8FB3C' }}
						animate={{ width: ['0%', '100%', '0%'] }}
						transition={{ duration: 2, repeat: Infinity }}
					/>
				</span>
			);

		case 'stroke':
			return (
				<motion.span
					className={`${baseClass}`}
					style={{ WebkitTextStroke: `1px ${type === 'stroke-draw' ? '#06b6d4' : '#B8FB3C'}`, color: 'transparent' }}
					animate={{ color: ['transparent', type === 'stroke-draw' ? '#06b6d4' : '#B8FB3C', 'transparent'] }}
					transition={{ duration: 3, repeat: Infinity }}
				>{text}</motion.span>
			);

		case 'morph':
			if (type === 'scramble-shake') {
				return (
					<motion.span
						className={`${baseClass} text-white`}
						style={{ display: 'inline-block' }}
						animate={{ x: [0, -2, 2, -1, 1, 0], y: [0, 1, -1, 2, -2, 0] }}
						transition={{ duration: 0.3, repeat: Infinity }}
					>{text}</motion.span>
				);
			}
			return (
				<motion.span
					className={`${baseClass} text-white`}
					animate={{ filter: ['blur(0px)', 'blur(2px)', 'blur(0px)', 'blur(1px)', 'blur(0px)'], scale: [1, 1.02, 0.98, 1.01, 1] }}
					transition={{ duration: 3, repeat: Infinity }}
				>{text}</motion.span>
			);

		default:
			return (
				<motion.span
					className={`${baseClass} text-white font-mono`}
					initial={{ width: 0 }}
					animate={{ width: 'auto' }}
					transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
					style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', borderRight: '2px solid #B8FB3C' }}
				>{text}</motion.span>
			);
	}
}
