import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { motion } from 'motion/react';

const collections = [
	{
		id: 'box-shadows', title: 'Box Shadows', description: 'Soft layered CSS shadows for white backgrounds', count: 33, href: '/collections/box-shadows',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>),
	},
	{
		id: 'buttons', title: 'Buttons', description: 'Premium CSS button styles with hover & active states', count: 40, href: '/collections/buttons',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" /></svg>),
	},
	{
		id: 'cards', title: 'Cards', description: 'Modern card components for your projects', count: 20, href: '/collections/cards',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>),
	},
	{
		id: 'text-animations', title: 'Text Animations', description: 'Eye-catching CSS text animation effects with JS init', count: 40, href: '/collections/text-animations',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>),
	},
	{
		id: 'glass-effects', title: 'Glass Effects', description: 'Frosted glass cards, navbars, modals and more', count: 15, href: '/collections/glass-effects',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1v-5M9 3l6 6M9 3v6h6M9 9l11-6" /></svg>),
	},
	{
		id: 'hover-effects', title: 'Hover Effects', description: 'Polished hover interactions — lift, glow, shimmer and more', count: 15, href: '/collections/hover-effects',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>),
	},
	{
		id: 'inputs', title: 'Input Styles', description: 'Custom form controls — fields, toggles, checkboxes and more', count: 15, href: '/collections/inputs',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>),
	},
	{
		id: 'loaders', title: 'Loaders', description: 'CSS loading animations — spinners, skeletons, progress bars', count: 15, href: '/collections/loaders',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>),
	},
	{
		id: 'gradients', title: 'Gradients', description: 'Aurora, mesh, holographic, conic and animated backgrounds', count: 15, href: '/collections/gradients',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>),
	},
	{
		id: 'ui-tokens', title: 'UI Tokens', description: 'Design tokens — colors, spacing, typography and shadows', count: 30, href: '/collections/ui-tokens',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>),
	},
	{
		id: 'microinteractions', title: 'Microinteractions', description: 'Small moments that make your UI feel alive', count: 15, href: '/collections/microinteractions',
		icon: (<svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>),
	},
];



export default function Collections() {
	return (
		<>
			<PageSEO
				title="CSS UI Collections – Copy-Paste Snippets & Components – UIXplor"
				description="Browse 10 curated CSS UI collections — box shadows, button styles, glassmorphism, hover effects, loaders, gradients and more. Free copy-paste snippets for developers."
				path="/collections"
				keywords={['CSS UI components', 'copy paste CSS', 'CSS snippets', 'UI design inspiration', 'CSS examples', 'web design components', 'CSS component library']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS UI Collections – UIXplor',
						description: 'Browse 10 curated CSS UI element collections including box shadows, buttons, glassmorphism, hover effects, loaders, gradients, inputs, and text animations.',
						url: 'https://uixplor.com/collections',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
						],
					},
				]}
			/>

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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
						{collections.filter(c => c.id !== 'ui-tokens').map((collection, index) => (
							<motion.div
								key={collection.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Link href={collection.href}>
									<div className="relative group h-52 sm:h-60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-white/3 border border-white/6 hover:border-[#B8FB3C]/40 hover:shadow-[0_0_40px_rgba(184,251,60,0.08)]">
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
												<span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#B8FB3C]/10 text-xs font-semibold border border-[#B8FB3C]/20 text-[#B8FB3C]">
													{collection.count} items
												</span>

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
