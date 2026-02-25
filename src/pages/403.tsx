import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

const glitchFrames = ['403', '4Θ3', '403', 'Θ03', '403', '4ΘΘ3'];

export default function Forbidden403() {
	const router = useRouter();
	const [glitch, setGlitch] = useState('403');
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
				title="403 — Forbidden"
				description="You don't have permission to access this page on UIXplor."
				path="/403"
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
						background: `radial-gradient(600px circle at ${cursor.x}% ${cursor.y}%, rgba(251,113,60,0.05), transparent 60%)`,
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
					style={{ width: 420, height: 420, background: 'radial-gradient(circle, rgba(239,68,68,0.09) 0%, transparent 70%)', top: '-12%', right: '-5%' }}
					animate={{ x: [0, -30, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
					transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
				/>
				<motion.div
					className="absolute rounded-full pointer-events-none"
					style={{ width: 360, height: 360, background: 'radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)', bottom: '-5%', left: '-5%' }}
					animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
					transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
				/>
				<motion.div
					className="absolute rounded-full pointer-events-none"
					style={{ width: 200, height: 200, background: 'radial-gradient(circle, rgba(251,113,60,0.07) 0%, transparent 70%)', top: '55%', right: '8%' }}
					animate={{ x: [0, -15, 0], y: [0, -25, 0] }}
					transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
				/>

				{/* Badge */}
				<motion.div
					className="mb-8 px-4 py-1.5 rounded-full border text-[11px] font-semibold tracking-widest uppercase"
					style={{ borderColor: 'rgba(251,113,60,0.35)', color: '#fb7c3c', background: 'rgba(251,113,60,0.08)' }}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Error 403 · vip zone
				</motion.div>

				{/* Lock icon */}
				<motion.div
					className="mb-6"
					initial={{ opacity: 0, scale: 0.7 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
				>
					<motion.div
						animate={{ boxShadow: ['0 0 0px rgba(251,113,60,0)', '0 0 40px rgba(251,113,60,0.35)', '0 0 0px rgba(251,113,60,0)'] }}
						transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
						className="inline-flex items-center justify-center w-20 h-20 rounded-3xl border"
						style={{ background: 'rgba(251,113,60,0.08)', borderColor: 'rgba(251,113,60,0.25)' }}
					>
						<svg className="w-9 h-9" fill="none" stroke="#fb7c3c" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</motion.div>
				</motion.div>

				{/* 403 number */}
				<motion.div
					className="relative mb-6 select-none"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.05 }}
				>
					<div
						className="text-[100px] sm:text-[160px] lg:text-[200px] font-black leading-none tracking-tighter"
						style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.05)' }}
					>
						{glitch}
					</div>
					<div
						className="absolute inset-0 flex items-center justify-center text-[100px] sm:text-[160px] lg:text-[200px] font-black leading-none tracking-tighter"
						style={{
							background: 'linear-gradient(135deg, #ef4444 0%, #fb923c 50%, #fbbf24 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter: 'drop-shadow(0 0 60px rgba(239,68,68,0.3))',
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
						Access Denied
					</h1>
					<p className="text-white/50 text-sm sm:text-base leading-relaxed mb-1">
						Oops. This area is VIP only.
					</p>
					<p className="text-white/30 text-xs sm:text-sm">
						You&apos;re cool… but not <em>that</em> cool.
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
						<Link
							href="/"
							className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300"
							style={{ background: 'linear-gradient(135deg, #ef4444, #fb923c)', color: '#fff' }}
							onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(239,68,68,0.4)')}
							onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
							Back to Safety
						</Link>
					</motion.div>
					<motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
						<button
							onClick={() => router.back()}
							className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 border"
							style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.03)' }}
						>
							Go Back
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
					UIXplor · 403 · Forbidden
				</motion.p>
			</div>
		</>
	);
}
