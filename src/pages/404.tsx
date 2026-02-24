import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 — Page Not Found — UIXplor</title>
			</Head>

			<div className="min-h-[80vh] flex items-center justify-center px-4">
				<motion.div
					className="text-center max-w-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: 'easeOut' }}
				>
					{/* 404 Number */}
					<motion.div
						className="text-[120px] sm:text-[160px] font-bold leading-none tracking-tighter text-white/[0.04] select-none"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						404
					</motion.div>

					{/* Floating accent line */}
					<motion.div
						className="w-16 h-1 bg-[#B8FB3C] rounded-full mx-auto -mt-8 mb-8"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
					/>

					<h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
						Page not found
					</h1>
					<p className="text-white/40 mb-8 text-sm sm:text-base leading-relaxed">
						The page you&apos;re looking for doesn&apos;t exist or has been moved.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
						<Link
							href="/"
							className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#B8FB3C] text-[#0a0a0f] font-semibold text-sm transition-all duration-250 hover:shadow-[0_0_24px_rgba(184,251,60,0.25)]"
						>
							Go Home
						</Link>
						<Link
							href="/collections"
							className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white font-medium text-sm hover:bg-white/[0.08] transition-all duration-250"
						>
							Browse Collections
						</Link>
					</div>
				</motion.div>
			</div>
		</>
	);
}
