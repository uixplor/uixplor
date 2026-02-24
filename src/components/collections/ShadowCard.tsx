'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

interface ShadowCardProps {
	id: string;
	name: string;
	css: string;
	category: string;
	index: number;
}

export default function ShadowCard({ id, name, css, category, index }: ShadowCardProps) {
	const [copied, setCopied] = useState(false);

	// Extract just the value from "box-shadow: ..."
	const shadowValue = css.replace('box-shadow: ', '').replace(';', '');

	const handleCopy = () => {
		navigator.clipboard.writeText(css);
		setCopied(true);
		setTimeout(() => setCopied(false), 1800);
	};

	return (
		<motion.div
			onClick={handleCopy}
			className="group relative bg-white rounded-[18px] cursor-pointer overflow-hidden"
			style={{
				boxShadow: shadowValue,
				border: '1px solid rgba(0, 0, 0, 0.04)',
			}}
			initial={{ opacity: 0, y: 24, scale: 0.96 }}
			whileInView={{
				opacity: 1,
				y: 0,
				scale: 1,
				transition: {
					type: 'spring',
					stiffness: 260,
					damping: 20,
					delay: index * 0.025,
				},
			}}
			viewport={{ once: true, amount: 0.15 }}
			whileHover={{
				scale: 1.02,
				transition: {
					duration: 0.25,
					ease: [0.4, 0, 0.2, 1],
				},
			}}
			whileTap={{
				scale: 0.98,
				transition: { duration: 0.1 },
			}}
		>
			{/* Shadow Demo Area */}
			<div className="p-5 sm:p-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px]">
				{/* Inner shadow preview box */}
				<div
					className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white mb-4 transition-shadow duration-300"
					style={{
						boxShadow: shadowValue,
						border: '1px solid rgba(0, 0, 0, 0.03)',
					}}
				/>

				{/* Shadow Name */}
				<h3 className="text-sm font-semibold text-[#1a1a2e] text-center leading-snug">
					{name}
				</h3>

				{/* Category Tag */}
				<span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[#1a1a2e]/40 bg-[#f0f1f4] px-2.5 py-0.5 rounded-full">
					{category}
				</span>
			</div>

			{/* Hover Overlay — shows CSS */}
			<div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col items-center justify-center p-4">
				<div className="text-[11px] font-mono text-[#1a1a2e]/60 text-center leading-relaxed max-w-full overflow-hidden break-all px-2">
					{css}
				</div>
				<div className="mt-3 text-xs font-semibold text-[#1a1a2e]/80">
					{copied ? '✓ Copied!' : 'Click to copy'}
				</div>
			</div>

			{/* Copied Toast */}
			{copied && (
				<motion.div
					className="absolute top-3 right-3 bg-[#B8FB3C] text-[#0a0a0f] text-[11px] font-bold px-3 py-1 rounded-full z-10"
					initial={{ opacity: 0, scale: 0.8, y: -4 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.2 }}
				>
					Copied!
				</motion.div>
			)}
		</motion.div>
	);
}
