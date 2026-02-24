import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import RocketIcon from '@/components/icons/RocketIcon';
import AnimatedButton from '@/components/ui/AnimatedButton';

import shadowData from '../../../data/shadows.json';
import buttonData from '../../../data/buttons.json';

/** Parse CSS declaration string into React style object */
function parseCssToStyle(css: string): React.CSSProperties {
	const style: Record<string, string> = {};
	css.split(';').forEach((decl) => {
		const colon = decl.indexOf(':');
		if (colon === -1) return;
		const prop = decl.slice(0, colon).trim();
		const val = decl.slice(colon + 1).trim();
		if (!prop || !val) return;
		const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
		style[camel] = val;
	});
	return style as React.CSSProperties;
}

function HomeButtonPreview({ btn }: { btn: typeof buttonData[number] }) {
	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);
	const isLightBg = ['transparent', '#ffffff', '#f0f0f3', '#e8efe5'].includes(btn.background) || btn.background.includes('rgba');

	const baseStyle: React.CSSProperties = {
		background: btn.background,
		boxShadow: btn.shadow,
		color: isLightBg ? '#1a1a2e' : '#ffffff',
		transition: 'all 0.3s ease',
		cursor: 'pointer',
	};

	const mergedStyle: React.CSSProperties = {
		...baseStyle,
		...(hovered ? parseCssToStyle(btn.hover) : {}),
		...(pressed ? parseCssToStyle(btn.active) : {}),
	};

	return (
		<div
			className="px-6 py-3 rounded-lg text-sm font-semibold select-none"
			style={mergedStyle}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => { setHovered(false); setPressed(false); }}
			onMouseDown={() => setPressed(true)}
			onMouseUp={() => setPressed(false)}
		>
			{btn.name}
		</div>
	);
}

const collections = [
	{
		title: 'Box Shadows',
		count: 33,
		href: '/collections/box-shadows',
		description: 'Soft layered shadows for white UIs',
		gradient: 'from-[#B8FB3C]/20 to-[#7ed321]/10',
		icon: (
			<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
			</svg>
		),
	},
	{
		title: 'Buttons',
		count: 15,
		href: '/collections/buttons',
		description: 'Premium button styles with hover states',
		gradient: 'from-purple-500/20 to-indigo-500/10',
		icon: (
			<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
			</svg>
		),
	},
	{
		title: 'Cards',
		count: 0,
		href: '/collections/cards',
		description: 'Modern card components',
		gradient: 'from-cyan-500/20 to-blue-500/10',
		comingSoon: true,
		icon: (
			<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
			</svg>
		),
	},
	{
		title: 'Text Animations',
		count: 40,
		href: '/collections/text-animations',
		description: 'Eye-catching text effects',
		gradient: 'from-orange-500/20 to-rose-500/10',
		icon: (
			<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
	},
];

export default function Home() {
	const previewShadows = shadowData.filter(s => s.category !== 'token').slice(0, 6);
	const previewButtons = buttonData.slice(0, 6);

	return (
		<>
			<main>
				{/* Hero Section */}
				<div className="container px-4 sm:px-6 py-16 sm:py-20 lg:py-28 text-center relative">
					<motion.h1
						className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold gloock-regular text-white leading-tight"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						The Largest Library of <br className="hidden sm:block" />
						Open-Source UI
					</motion.h1>
					<motion.p
						className="text-center mt-4 sm:mt-6 text-base sm:text-lg text-white/60 max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
					>
						Community-built library of UI elements. <br className="hidden sm:block" />
						Copy as HTML/CSS, Tailwind, React and Figma.
					</motion.p>

					<motion.div
						className="flex justify-center mt-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
					>
						<Link href="/collections">
							<AnimatedButton>
								<RocketIcon className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
								<span className="text-sm sm:text-base">Browse all collections</span>
							</AnimatedButton>
						</Link>
					</motion.div>
				</div>
				<Image
					src="/images/bgs/bgStar.png"
					width={200}
					height={100}
					className="w-full absolute top-0 left-0 -z-10"
					alt=""
				/>

				{/* Collections Grid */}
				<section className="container px-4 sm:px-6 py-12 sm:py-16">
					<motion.h2
						className="text-3xl sm:text-4xl font-bold text-center mb-3 text-white"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						Explore Collections
					</motion.h2>
					<motion.p
						className="text-white/40 text-center mb-10 sm:mb-14 text-sm sm:text-base"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						Curated UI elements ready to use
					</motion.p>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
						{collections.map((col, i) => (
							<motion.div
								key={col.title}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
							>
								<Link href={col.href}>
									<div className={`group relative h-44 sm:h-52 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-[#0e0e18] border border-white/10 hover:border-white/25 hover:shadow-[0_6px_18px_rgba(255,255,255,0.10),0_0_0_1px_rgba(255,255,255,0.08)]`}>
										{/* Glow orb */}
										<div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/3 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

										<div className="relative h-full p-5 sm:p-6 flex flex-col justify-between text-white">
											<div>
												<div className="text-[#B8FB3C] mb-3 group-hover:-translate-y-0.5 transition-transform duration-300">
													{col.icon}
												</div>
												<h3 className="text-lg sm:text-xl font-bold mb-1">{col.title}</h3>
												<p className="text-white/40 text-xs sm:text-sm">{col.description}</p>
											</div>
											<div className="flex items-center justify-between mt-auto pt-3">
												{col.comingSoon ? (
													<span className="text-[10px] font-semibold bg-white/[0.06] px-3 py-1 rounded-full border border-white/[0.06] text-white/50">
														Coming Soon
													</span>
												) : (
													<span className="text-[10px] font-semibold bg-[#B8FB3C]/10 px-3 py-1 rounded-full border border-[#B8FB3C]/20 text-[#B8FB3C]">
														{col.count} items
													</span>
												)}
												<span className="text-white/30 group-hover:text-[#B8FB3C] text-xs font-medium transition-colors duration-300 flex items-center gap-1">
													View
													<svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
													</svg>
												</span>
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))}
					</div>
				</section>

				{/* Box Shadows Preview */}
				<section className="container px-4 sm:px-6 py-12 sm:py-16">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-[#B8FB3C]/10 flex items-center justify-center border border-[#B8FB3C]/20">
								<svg className="w-5 h-5 text-[#B8FB3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
							</div>
							<div>
								<h2 className="text-2xl sm:text-3xl font-bold text-white">Box Shadows</h2>
								<p className="text-white/40 mt-0.5 text-sm">Soft layered shadows — click to preview</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
						{previewShadows.map((shadow, index) => {
							const shadowValue = shadow.css.replace('box-shadow: ', '').replace(';', '');
							return (
								<motion.div
									key={shadow.id}
									className="rounded-2xl overflow-hidden bg-white/4 border border-white/8 transition-colors duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.06 }}
								>
									{/* Shadow preview */}
									<div className="p-6 flex items-center justify-center h-28 sm:h-32 bg-white rounded-t-2xl">
										<div
											className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/90"
											style={{
												boxShadow: shadowValue,
											}}
										/>
									</div>
									<div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
										<div className="min-w-0 mr-3">
											<span className="text-xs font-medium text-white/60 truncate block">
												{shadow.name}
											</span>
											<span className="text-[10px] text-white/25 uppercase tracking-wider">
												{shadow.category}
											</span>
										</div>
										<Link href="/collections/box-shadows">
											<span className="relative z-10 shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,255,255,0.18)] transition-all duration-300 cursor-pointer">
												View →
											</span>
										</Link>
									</div>
								</motion.div>
							);
						})}
					</div>

					<div className="text-center">
						<Link href="/collections/box-shadows">
							<motion.button
								className="inline-flex items-center px-7 py-3 rounded-full bg-white/4 border border-white/8 text-white font-medium text-sm hover:bg-white/8 hover:border-white/25 transition-all duration-300"
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
							>
								View All {shadowData.length} Box Shadows
								<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</motion.button>
						</Link>
					</div>
				</section>

				{/* Buttons Preview */}
				<section className="container px-4 sm:px-6 py-12 sm:py-16">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
								<svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
								</svg>
							</div>
							<div>
								<h2 className="text-2xl sm:text-3xl font-bold text-white">CSS Buttons</h2>
								<p className="text-white/40 mt-0.5 text-sm">Premium button styles with hover states</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
						{previewButtons.map((btn, index) => (
							<motion.div
								key={btn.id}
								className="rounded-2xl overflow-hidden bg-white/4 border border-white/8 transition-colors duration-300"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.06 }}
							>
								{/* Button preview — interactive */}
								<div className="p-6 flex items-center justify-center h-28 sm:h-32 bg-white rounded-t-2xl">
									<HomeButtonPreview btn={btn} />
								</div>
								<div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
									<span className="text-xs font-medium text-white/60">
										{btn.name}
									</span>
									<Link href="/collections/buttons">
										<span className="relative z-10 shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(168,85,247,0.2)] transition-all duration-300 cursor-pointer">
											View →
										</span>
									</Link>
								</div>
							</motion.div>
						))}
					</div>

					<div className="text-center">
						<Link href="/collections/buttons">
							<motion.button
								className="inline-flex items-center px-7 py-3 rounded-full bg-white/4 border border-white/8 text-white font-medium text-sm hover:bg-white/8 hover:border-purple-400/30 transition-all duration-300"
								whileHover={{ scale: 1.03 }}
								whileTap={{ scale: 0.97 }}
							>
								View All {buttonData.length} CSS Buttons
								<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</motion.button>
						</Link>
					</div>
				</section>
			</main>
		</>
	);
}
