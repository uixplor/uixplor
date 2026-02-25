import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';

const glitchFrames = ['500', '5ΘΘ', 'Err', '5Θ0', '!!!', '500', 'Θ00', '500'];

export default function ServerError500() {
	const router = useRouter();
	const [glitch, setGlitch] = useState('500');
	const [cursor, setCursor] = useState({ x: 50, y: 50 });
	const [showAlt, setShowAlt] = useState(false);

	useEffect(() => {
		let i = 0;
		const shake = setInterval(() => {
			setGlitch(glitchFrames[i % glitchFrames.length]);
			setShowAlt(i % 4 === 1);
			i++;
			if (i >= glitchFrames.length * 3) {
				setGlitch('500');
				setShowAlt(false);
				clearInterval(shake);
			}
		}, 80);
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
				title="500 — Server Error"
				description="Something went wrong on our end. We're fixing it. Probably."
				path="/500"
				noindex
			/>

			<div
				className="min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden relative"
				style={{ background: '#0a0a0f' }}
			>
				{/* Cursor glow — red tint */}
				<div
					className="fixed inset-0 pointer-events-none"
					style={{
						background: `radial-gradient(600px circle at ${cursor.x}% ${cursor.y}%, rgba(239,68,68,0.06), transparent 60%)`,
						transition: 'background 0.3s ease',
					}}
				/>

				{/* Grid — slightly more visible for glitchy feel */}
				<div
					className="fixed inset-0 pointer-events-none opacity-[0.04]"
					style={{
						backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
						backgroundSize: '64px 64px',
					}}
				/>

				{/* Glitch scan line */}
				<AnimatePresence>
					{showAlt && (
						<motion.div
							className="fixed inset-0 pointer-events-none z-10"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.05 }}
							style={{
								background: 'linear-gradient(transparent 48%, rgba(239,68,68,0.04) 49%, rgba(239,68,68,0.04) 51%, transparent 52%)',
							}}
						/>
					)}
				</AnimatePresence>

				{/* Floating blobs — red/pink */}
				<motion.div
					className="absolute rounded-full pointer-events-none"
					style={{ width: 450, height: 450, background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)', top: '-15%', left: '-10%' }}
					animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
					transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
				/>
				<motion.div
					className="absolute rounded-full pointer-events-none"
					style={{ width: 380, height: 380, background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)', bottom: '-8%', right: '-8%' }}
					animate={{ x: [0, -30, 0], y: [0, -25, 0], scale: [1, 1.09, 1] }}
					transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
				/>
				<motion.div
					className="absolute rounded-full pointer-events-none"
					style={{ width: 250, height: 250, background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', top: '45%', right: '5%' }}
					animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
					transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
				/>

				{/* Badge */}
				<motion.div
					className="mb-8 px-4 py-1.5 rounded-full border text-[11px] font-semibold tracking-widest uppercase"
					style={{ borderColor: 'rgba(239,68,68,0.35)', color: '#ef4444', background: 'rgba(239,68,68,0.08)' }}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Error 500 · server moment
				</motion.div>

				{/* 500 number — more aggressive glitch */}
				<motion.div
					className="relative mb-6 select-none"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					{/* Glitch offset layer */}
					<div
						className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter pointer-events-none"
						style={{
							color: '#ef4444',
							opacity: showAlt ? 0.15 : 0,
							transform: showAlt ? 'translate(-4px, 2px)' : 'none',
							transition: 'opacity 0.05s',
							filter: 'blur(1px)',
						}}
					>
						{glitch}
					</div>
					<div
						className="text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
						style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.05)' }}
					>
						{glitch}
					</div>
					<div
						className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none tracking-tighter"
						style={{
							background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #f97316 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter: 'drop-shadow(0 0 60px rgba(239,68,68,0.35))',
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
						Well… this is awkward
					</h1>
					<p className="text-white/50 text-sm sm:text-base leading-relaxed mb-1">
						Our server just had a mini existential crisis.
					</p>
					<p className="text-white/30 text-xs sm:text-sm">
						We&apos;re fixing it. Probably.
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
							style={{ background: 'linear-gradient(135deg, #ef4444, #ec4899)', color: '#fff' }}
							onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(239,68,68,0.4)')}
							onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
							Refresh Like Nothing Happened
						</button>
					</motion.div>
					<motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
						<button
							onClick={() => router.push('/')}
							className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 border"
							style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.03)' }}
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
							Escape
						</button>
					</motion.div>
				</motion.div>

				{/* Funny microcopy */}
				<motion.p
					className="mt-6 text-[12px] italic"
					style={{ color: 'rgba(239,68,68,0.35)' }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
				>
					&quot;Something broke. Not saying it&apos;s your fault… but 👀&quot;
				</motion.p>

				{/* Footer text */}
				<motion.p
					className="mt-10 text-[11px] text-white/15 tracking-widest uppercase"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.9 }}
				>
					UIXplor · 500 · Server Error
				</motion.p>
			</div>
		</>
	);
}
