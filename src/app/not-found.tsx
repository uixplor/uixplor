'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const glitchFrames = ['4̷0̵4̸', '4̸0̸4̵', '404', '4̶0̶4̶', '404'];

export default function NotFound() {
	const [glitch, setGlitch] = useState('404');
	const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

	useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
			setGlitch(glitchFrames[i % glitchFrames.length]);
			i++;
			if (i > glitchFrames.length * 4) clearInterval(interval);
		}, 80);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const move = (e: MouseEvent) => {
			setCursorPos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
		};
		window.addEventListener('mousemove', move);
		return () => window.removeEventListener('mousemove', move);
	}, []);

	const pages = [
		{ href: '/collections', emoji: '🎨', label: 'Collections', sub: 'CSS bangers 🔥' },
		{ href: '/blog', emoji: '✍️', label: 'Blog', sub: 'Learn some CSS' },
		{ href: '/collections/buttons', emoji: '🔘', label: 'Buttons', sub: '15 styles' },
		{ href: '/collections/glass-effects', emoji: '🪟', label: 'Glass', sub: 'Glassmorphism' },
	];

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative"
			style={{ background: '#0a0a0f', fontFamily: "'Inter', system-ui, sans-serif" }}
		>
			{/* Ambient cursor glow */}
			<div
				className="fixed inset-0 pointer-events-none transition-all duration-700"
				style={{
					background: `radial-gradient(600px circle at ${cursorPos.x}% ${cursorPos.y}%, rgba(184,251,60,0.04), transparent 60%)`,
				}}
			/>

			{/* Background grid */}
			<div className="fixed inset-0 pointer-events-none opacity-[0.03]"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
					backgroundSize: '60px 60px',
				}}
			/>

			{/* Pill badge */}
			<div className="mb-8 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase"
				style={{ borderColor: 'rgba(184,251,60,0.3)', color: '#B8FB3C', background: 'rgba(184,251,60,0.06)' }}>
				Error 404 — ngl this page doesn&apos;t exist 💀
			</div>

			{/* Glitchy 404 */}
			<div className="relative mb-6 select-none">
				<div
					className="text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
					style={{
						color: 'transparent',
						WebkitTextStroke: '2px rgba(255,255,255,0.06)',
						position: 'relative',
					}}
				>
					{glitch}
				</div>
				{/* Lime overlay */}
				<div
					className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
					style={{
						background: 'linear-gradient(135deg, #B8FB3C 0%, #4ade80 50%, #06b6d4 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						filter: 'drop-shadow(0 0 60px rgba(184,251,60,0.25))',
					}}
				>
					{glitch}
				</div>
			</div>

			{/* Message */}
			<div className="text-center mb-10 max-w-md">
				<h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
					bro this page is cooked 💀
				</h1>
				<p className="text-white/40 text-sm sm:text-base leading-relaxed">
					whatever you typed in that URL bar ain&apos;t it chief.{' '}
					<span className="text-[#B8FB3C]">no cap</span>, this page doesn&apos;t exist.
				</p>
			</div>

			{/* Suggested pages */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 w-full max-w-xl">
				{pages.map(p => (
					<Link key={p.href} href={p.href}
						className="group flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 hover:scale-105"
						style={{
							background: 'rgba(255,255,255,0.02)',
							borderColor: 'rgba(255,255,255,0.07)',
						}}
						onMouseEnter={e => {
							(e.currentTarget as HTMLElement).style.borderColor = 'rgba(184,251,60,0.35)';
							(e.currentTarget as HTMLElement).style.background = 'rgba(184,251,60,0.05)';
						}}
						onMouseLeave={e => {
							(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
							(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
						}}
					>
						<span className="text-2xl">{p.emoji}</span>
						<span className="text-xs font-semibold text-white">{p.label}</span>
						<span className="text-[10px] text-white/30">{p.sub}</span>
					</Link>
				))}
			</div>

			{/* CTA */}
			<div className="flex items-center gap-3">
				<Link
					href="/"
					className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(184,251,60,0.3)]"
					style={{ background: '#B8FB3C', color: '#0a0a0f' }}
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					take me home fr 🏠
				</Link>
				<button
					onClick={() => window.history.back()}
					className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border hover:scale-105"
					style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', background: 'transparent' }}
				>
					go back bestie
				</button>
			</div>

			{/* Flavor text */}
			<p className="mt-10 text-xs text-white/15 tracking-wider">
				404 · page not found · skill issue detected
			</p>
		</div>
	);
}
