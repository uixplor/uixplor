'use client';

import data from '@/utils/Data/buttons.json';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function ButtonCardGrid() {
	const buttons = data as { id: number; name: string; credits: string; css: string }[];
	const [copiedId, setCopiedId] = useState<number | null>(null);

	// Inject all button styles into the page
	useEffect(() => {
		const styleElement = document.createElement('style');
		styleElement.id = 'button-styles';

		// Combine all CSS from buttons
		const allStyles = buttons.map(button => button.css).join('\n\n');
		styleElement.textContent = allStyles;

		document.head.appendChild(styleElement);

		return () => {
			// Cleanup on unmount
			const existingStyle = document.getElementById('button-styles');
			if (existingStyle) {
				existingStyle.remove();
			}
		};
	}, [buttons]);

	const handleCopy = (css: string, id: number) => {
		navigator.clipboard.writeText(css);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 1500);
	};

	return (
		<div className="container px-4 sm:px-8 lg:px-18 py-16 sm:py-20 lg:py-28 bg-[#f8f9fa] rounded-2xl">
			{/* Header Section */}
			<div className="text-center mb-12">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
					Beautiful CSS Buttons
				</h2>
				<p className="text-gray-600 text-sm sm:text-base">
					Click any button to copy its CSS code
				</p>
			</div>

			{/* Button Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
				{buttons.map((button, index) => (
					<motion.div
						key={button.id}
						onClick={() => handleCopy(button.css, button.id)}
						className="button-showcase-card w-full max-w-[200px] h-[150px] mx-auto bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-visible p-4 hover:border-blue-300 transition-all"
						style={{ boxShadow: 'rgba(100, 100, 111, 0.15) 0px 7px 29px 0px' }}
						initial={{
							opacity: 0,
							y: 30,
							scale: 0.9
						}}
						whileInView={{
							opacity: 1,
							y: 0,
							scale: 1,
							transition: {
								type: "spring",
								stiffness: 200,
								damping: 15,
								delay: index * 0.02
							}
						}}
						viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
						whileHover={{
							scale: 1.03,
							transition: {
								duration: 0.2
							}
						}}
						whileTap={{
							scale: 0.98,
							transition: { duration: 0.1 }
						}}
					>
						{/* Actual Button Preview */}
						<div className="flex items-center justify-center mb-3 relative z-10">
							<button className={`button-${button.id}`}>
								{button.name}
							</button>
						</div>

						{/* Credits */}
						<span className="text-xs text-gray-500 relative z-10 mt-auto">
							{button.credits}
						</span>

						{/* Animated copied feedback */}
						{copiedId === button.id && (
							<motion.div
								className="absolute inset-0 bg-green-50 border-2 border-green-500 rounded-xl flex items-center justify-center"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
							>
								<div className="text-center">
									<div className="text-2xl mb-1">✓</div>
									<div className="text-sm font-semibold text-green-700">
										CSS Copied!
									</div>
								</div>
							</motion.div>
						)}
					</motion.div>
				))}
			</div>
		</div>
	);
}
