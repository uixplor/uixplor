import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

const glitchFrames = ['400', '4ΘΘ', '400', 'Θ00', '400', '4Θ0'];

export default function BadRequest400() {
	const router = useRouter();
	const [glitch, setGlitch] = useState('400');
	const [cursor, setCursor] = useState({ x: 50, y: 50 });

	useEffect(() => {
		let i = 0;
		const shake = setInterval(() => {
			setGlitch(glitchFrames[i % glitchFrames.length]);
			i++;
			if (i >= glitchFrames.length * 3) clearInterval(shake);
		}, 90);
		return () => clearInterval(shake);
	}, []);

	useEffect(() => {
		const move = (e: MouseEvent) =>
			setCursor({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
		window.addEventListener('mousemove', move);
		return () => window.removeEventListener('mousemove', move);
	}, []);

	return (
		<>
			<PageSEO
				title="400 — Bad Request"
				description="Something went wrong with that request on UIXplor."
				path="/400"
				noindex
			/>

			<div
				className="min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden relative"
				style={{ background: '#0a0a0f' }}
			>
				{/* Cursor glow */}
				<div
					className="fixed inset-0 pointer-events-none"
					style={{
						background: `radial-gradient(600px circle at ${cursor.x}% ${cursor.y}%, rgba(251,191,36,0.05), transparent 60%)`,
						transition: 'background 0.3s ease',
					}}
				/>

				{/* Grid */}
				<div
					className="fixed inset-0 pointer-events-none opacity-[0.03]"
					style={{
						backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
						backgroundSize: '64px 64px',
					}}
				/>

				{/* Floating blobs */}
				<motion.div
					className="absolute rounded-full pointer-events-none"
					style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 70%)', top: '-8%', left: '-8%' }}
					animate={{ x: [0, 35, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
					transition={{ duration: 9, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
				/>
				<motion.div
					className="absolute rounded-full pointer-events-none"
					style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%)', bottom: '5%', right: '-5%' }}
					animate={{ x: [0, -20, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
					transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 3 }}
				/>
				{/* Floating question mark icons */}
				{[0, 1, 2].map((i) => (
					<motion.div
						key={i}
						className="absolute select-none pointer-events-none"
						style={{
							color: `rgba(251,191,36,${0.1 + i * 0.04})`,
							left: `${15 + i * 25}%`,
							top: `${20 + i * 15}%`,
						}}
						animate={{ y: [0, -18, 0], rotate: [0, 15, 0], opacity: [0.15, 0.25, 0.15] }}
						transition={{ duration: 4 + i, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.8 }}
					>
						<svg style={{ width: 24 + i * 8, height: 24 + i * 8 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</motion.div>
				))}

				{/* Badge */}
				<motion.div
					className="mb-8 px-4 py-1.5 rounded-full border text-[11px] font-semibold tracking-widest uppercase"
					style={{ borderColor: 'rgba(251,191,36,0.35)', color: '#fbbf24', background: 'rgba(251,191,36,0.08)' }}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Error 400 · what was that?
				</motion.div>

				{/* 400 number */}
				<motion.div
					className="relative mb-6 select-none"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div
						className="text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
						style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.05)' }}
					>
						{glitch}
					</div>
					<div
						className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
						style={{
							background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #fde68a 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter: 'drop-shadow(0 0 60px rgba(251,191,36,0.3))',
						}}
					>
						{glitch}
					</div>
				</motion.div>

				{/* Message */}
				<motion.div
					className="mb-10 max-w-md"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
						That didn&apos;t make sense
					</h1>
					<p className="text-white/50 text-sm sm:text-base leading-relaxed mb-1">
						Your browser sent vibes we couldn&apos;t understand.
					</p>
					<p className="text-white/30 text-xs sm:text-sm">
						Try again, but like… properly.
					</p>
				</motion.div>

				{/* CTAs */}
				<motion.div
					className="flex items-center gap-3 flex-wrap justify-center"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.45 }}
				>
					<motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
						<button
							onClick={() => router.reload()}
							className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300"
							style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', color: '#0a0a0f' }}
							onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(251,191,36,0.4)')}
							onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
							Retry
						</button>
					</motion.div>
					<motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
						<button
							onClick={() => router.push('/')}
							className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 border"
							style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.03)' }}
						>
							Go Home
						</button>
					</motion.div>
				</motion.div>

				{/* Footer text */}
				<motion.p
					className="mt-14 text-[11px] text-white/15 tracking-widest uppercase"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8 }}
				>
					UIXplor · 400 · Bad Request
				</motion.p>
			</div>
		</>
	);
}
