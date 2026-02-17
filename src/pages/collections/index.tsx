import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

const collections = [
	{
		id: 'box-shadows',
		title: 'Box Shadows',
		description: 'Beautiful CSS box shadow examples ready to copy',
		icon: '📦',
		count: 93,
		href: '/collections/box-shadows',
		gradient: 'from-purple-500 to-pink-500'
	},
	{
		id: 'buttons',
		title: 'Buttons',
		description: 'Stunning CSS button styles from top designers',
		icon: '🎨',
		count: 92,
		href: '/collections/buttons',
		gradient: 'from-blue-500 to-cyan-500'
	},
	{
		id: 'cards',
		title: 'Cards',
		description: 'Modern card components for your projects',
		icon: '🃏',
		count: 0,
		href: '/collections/cards',
		gradient: 'from-green-500 to-emerald-500',
		comingSoon: true
	},
	{
		id: 'text-animations',
		title: 'Text Animations',
		description: 'Eye-catching text animation effects',
		icon: '✨',
		count: 0,
		href: '/collections/text-animations',
		gradient: 'from-orange-500 to-red-500',
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

			<main className="min-h-screen   py-16 px-4 sm:px-6 lg:px-8">
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
									<div className={`relative group h-64 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl ${collection.comingSoon ? 'opacity-75' : ''}`}>
										{/* Gradient Background */}
										<div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />

										{/* Content */}
										<div className="relative h-full p-8 flex flex-col justify-between text-white">
											<div>
												<div className="text-6xl mb-4">{collection.icon}</div>
												<h2 className="text-3xl font-bold mb-2">{collection.title}</h2>
												<p className="text-white/90 text-lg">{collection.description}</p>
											</div>

											<div className="flex items-center justify-between">
												{collection.comingSoon ? (
													<span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
														Coming Soon
													</span>
												) : (
													<span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
														{collection.count} items
													</span>
												)}

												<span className="text-white/80 group-hover:text-white transition-colors">
													View Collection →
												</span>
											</div>
										</div>

										{/* Hover Effect */}
										<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
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
