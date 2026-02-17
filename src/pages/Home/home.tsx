import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import RocketIcon from '@/components/icons/RocketIcon';
import AnimatedButton from '@/components/ui/AnimatedButton';

import shadowData from '@/utils/Data/shadow.json';
import buttonData from '@/utils/Data/buttons.json';

export default function Home() {
	const previewShadows = shadowData.slice(0, 8);
	const previewButtons = buttonData.slice(0, 8);

	return (
		<>
			<main className="main-border-around">
				{/* Hero Section */}
				<div className="container py-8 text-center justify-center relative">
					<h1 className="text-7xl font-bold gloock-regular text-white">
						The Largest Library of <br />Open-Source UI
					</h1>
					<p className="text-center mt-5 text-white/70">
						Community-built library of UI elements. <br /> Copy as HTML/CSS, Tailwind, React and Figma.
					</p>

					<div className="flex justify-center mt-5">
						<Link href="/collections">
							<AnimatedButton>
								<RocketIcon className="mr-2" />
								Browse all collections
							</AnimatedButton>
						</Link>
					</div>
				</div>
				<Image
					src="/images/bgs/bgStar.png"
					width={200}
					height={100}
					className="w-full absolute top-0 left-0 -z-10"
					alt=""
				/>

				{/* Collections Overview */}
				<section className="container py-16">
					<h2 className="text-4xl font-bold text-center mb-12 text-white">Explore Collections</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{
								title: 'Box Shadows',
								icon: '📦',
								count: 93,
								href: '/collections/box-shadows',
								gradient: 'from-purple-500 via-pink-500 to-purple-600',
								comingSoon: false
							},
							{
								title: 'Buttons',
								icon: '🎨',
								count: 92,
								href: '/collections/buttons',
								gradient: 'from-blue-500 via-cyan-500 to-blue-600',
								comingSoon: false
							},
							{
								title: 'Cards',
								icon: '🃏',
								count: 0,
								href: '/collections/cards',
								gradient: 'from-green-500 via-emerald-500 to-green-600',
								comingSoon: true
							},
							{
								title: 'Text Animations',
								icon: '✨',
								count: 0,
								href: '/collections/text-animations',
								gradient: 'from-orange-500 via-red-500 to-orange-600',
								comingSoon: true
							}
						].map((collection, index) => (
							<motion.div
								key={collection.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
							>
								<Link href={collection.href}>
									<div className="relative group h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border border-white/10">
										{/* Solid vibrant gradient background */}
										<div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient}`} />

										<div className="relative h-full p-6 flex flex-col justify-between text-white">
											<div>
												<div className="text-4xl mb-2">{collection.icon}</div>
												<h3 className="text-xl font-bold mb-1 drop-shadow-lg">{collection.title}</h3>
											</div>

											<div className="flex items-center justify-between">
												{collection.comingSoon ? (
													<span className="text-xs font-semibold bg-white/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
														Coming Soon
													</span>
												) : (
													<span className="text-xs font-semibold bg-white/30 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
														{collection.count} items
													</span>
												)}

												<span className="text-white/90 group-hover:text-white text-sm font-semibold drop-shadow-lg">
													View →
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
				<section className="container py-16">
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-4">
							<span className="text-5xl">📦</span>
							<div>
								<h2 className="text-3xl sm:text-4xl font-bold text-white">Box Shadows</h2>
								<p className="text-white/70 mt-1">Beautiful CSS box shadow examples</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
						{previewShadows.map((shadow, index) => (
							<motion.div
								key={shadow.id}
								className="shadow-card w-full h-[130px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center text-white cursor-pointer relative overflow-hidden hover:border-[#B8FB3C]/50 transition-all group"
								style={{ boxShadow: shadow.code }}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className="font-semibold text-sm text-white/90 group-hover:text-[#B8FB3C] transition-colors">
									{shadow.name}
								</span>
							</motion.div>
						))}
					</div>

					<div className="text-center">
						<Link href="/collections/box-shadows">
							<motion.button
								className="inline-flex items-center px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-[#B8FB3C]/50 transition-all"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								View All 93 Box Shadows
								<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</motion.button>
						</Link>
					</div>
				</section>

				{/* Buttons Preview */}
				<section className="container py-16">
					<div className="flex items-center justify-between mb-8">
						<div className="flex items-center gap-4">
							<span className="text-5xl">🎨</span>
							<div>
								<h2 className="text-3xl sm:text-4xl font-bold text-white">CSS Buttons</h2>
								<p className="text-white/70 mt-1">Stunning button styles from top designers</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
						{previewButtons.map((button, index) => (
							<motion.div
								key={button.id}
								className="button-preview-card w-full h-[130px] bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer p-4 hover:border-[#B8FB3C]/50 transition-all group"
								style={{ boxShadow: 'rgba(184, 251, 60, 0.1) 0px 7px 29px 0px' }}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.3, delay: index * 0.05 }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className="font-semibold text-sm text-center text-white/90 group-hover:text-[#B8FB3C] transition-colors">
									{button.name}
								</span>
								<span className="text-xs text-white/60 mt-1 group-hover:text-[#B8FB3C]/80 transition-colors">
									{button.credits}
								</span>
							</motion.div>
						))}
					</div>

					<div className="text-center">
						<Link href="/collections/buttons">
							<motion.button
								className="inline-flex items-center px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-lg hover:bg-white/10 hover:border-[#B8FB3C]/50 transition-all"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								View All 92 CSS Buttons
								<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
