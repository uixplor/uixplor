import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

const collections = [
	{
		id: 'box-shadows',
		title: 'Box Shadows',
		description: 'Beautiful CSS box shadow examples ready to copy',
		icon: (
			<svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
			</svg>
		),
		count: 93,
		href: '/collections/box-shadows'
	},
	{
		id: 'buttons',
		title: 'Buttons',
		description: 'Stunning CSS button styles from top designers',
		icon: (
			<svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
			</svg>
		),
		count: 92,
		href: '/collections/buttons'
	},
	{
		id: 'cards',
		title: 'Cards',
		description: 'Modern card components for your projects',
		icon: (
			<svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
			</svg>
		),
		count: 0,
		href: '/collections/cards',
		comingSoon: true
	},
	{
		id: 'text-animations',
		title: 'Text Animations',
		description: 'Eye-catching text animation effects',
		icon: (
			<svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
		),
		count: 0,
		href: '/collections/text-animations',
		comingSoon: true
	}
];

export default function Collections() {
	return (
		<>
			<Head>
				<title>Collections - UIXplor</title>
				<meta name="description" content="Browse our curated collections of UI elements" />
			</Head>

			<main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<div className="text-center mb-16">
						<motion.h1
							className="text-5xl sm:text-6xl font-bold text-white mb-4"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							Collections
						</motion.h1>
						<motion.p
							className="text-xl text-white/70 max-w-2xl mx-auto"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							Explore our curated collections of beautiful UI elements, ready to copy and use in your projects
						</motion.p>
					</div>

					{/* Collections Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{collections.map((collection, index) => (
							<motion.div
								key={collection.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Link href={collection.href}>
									<div className={`relative group h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl bg-black/60 backdrop-blur-md border border-white/30 hover:border-[#B8FB3C]/50 ${collection.comingSoon ? 'opacity-75' : ''}`}>
										{/* Content */}
										<div className="relative h-full p-8 flex flex-col justify-between text-white">
											<div>
												<div className="text-[#B8FB3C] mb-4 group-hover:-translate-y-1 transition-transform duration-300">
													{collection.icon}
												</div>
												<h2 className="text-3xl font-bold mb-2">{collection.title}</h2>
												<p className="text-white/70 text-lg">{collection.description}</p>
											</div>

											<div className="flex items-center justify-between">
												{collection.comingSoon ? (
													<span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold border border-white/10">
														Coming Soon
													</span>
												) : (
													<span className="inline-flex items-center px-4 py-2 rounded-full bg-[#B8FB3C]/20 backdrop-blur-sm text-sm font-semibold border border-[#B8FB3C]/30 text-[#B8FB3C]">
														{collection.count} items
													</span>
												)}

												<span className="text-white/70 group-hover:text-[#B8FB3C] transition-colors font-semibold">
													View Collection →
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
