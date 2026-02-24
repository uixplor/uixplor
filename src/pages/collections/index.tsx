import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

const collections = [
	{
		id: 'box-shadows',
		title: 'Box Shadows',
		description: 'Soft layered CSS shadows for white backgrounds',
		count: 33,
		href: '/collections/box-shadows',
		icon: (
			<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
			</svg>
		),
	},
	{
		id: 'buttons',
		title: 'Buttons',
		description: 'Premium CSS button styles with hover & active states',
		count: 15,
		href: '/collections/buttons',
		icon: (
			<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
			</svg>
		),
	},
	{
		id: 'cards',
		title: 'Cards',
		description: 'Modern card components for your projects',
		count: 6,
		href: '/collections/cards',
		comingSoon: true,
		icon: (
			<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
			</svg>
		),
	},
	{
		id: 'text-animations',
		title: 'Text Animations',
		description: 'Eye-catching text animation effects',
		count: 6,
		href: '/collections/text-animations',
		comingSoon: true,
		icon: (
			<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
	},
];

export default function Collections() {
	return (
		<>
			<Head>
				<title>Collections — UIXplor</title>
				<meta name="description" content="Browse our curated collections of UI elements" />
			</Head>

			<main className="min-h-screen px-4 sm:px-6 py-12 sm:py-16">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12 sm:mb-16">
						<motion.h1
							className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							Collections
						</motion.h1>
						<motion.p
							className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Curated UI elements, ready to copy and use
						</motion.p>
					</div>

					{/* Collections Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
						{collections.map((collection, index) => (
							<motion.div
								key={collection.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Link href={collection.href}>
									<div className={`relative group h-52 sm:h-60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-white/[0.03] border border-white/[0.06] hover:border-[#B8FB3C]/40 hover:shadow-[0_0_40px_rgba(184,251,60,0.08)] ${collection.comingSoon ? 'opacity-80' : ''}`}>
										{/* Glow orb */}
										<div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#B8FB3C]/[0.03] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

										<div className="relative h-full p-6 sm:p-8 flex flex-col justify-between text-white">
											<div>
												<div className="text-[#B8FB3C] mb-3 sm:mb-4 group-hover:-translate-y-0.5 transition-transform duration-300">
													{collection.icon}
												</div>
												<h2 className="text-2xl sm:text-3xl font-bold mb-2">{collection.title}</h2>
												<p className="text-white/40 text-sm sm:text-base">{collection.description}</p>
											</div>

											<div className="flex items-center justify-between">
												{collection.comingSoon ? (
													<span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.06] text-xs font-semibold border border-white/[0.06] text-white/50">
														<span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
														Coming Soon
													</span>
												) : (
													<span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#B8FB3C]/10 text-xs font-semibold border border-[#B8FB3C]/20 text-[#B8FB3C]">
														{collection.count} items
													</span>
												)}

												<span className="text-white/30 group-hover:text-[#B8FB3C] transition-colors font-medium text-sm flex items-center gap-1">
													View Collection
													<svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
				</div>
			</main>
		</>
	);
}
