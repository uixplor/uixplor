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
								count: 93,
								href: '/collections/box-shadows',
								comingSoon: false,
								icon: (
									<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
									</svg>
								)
							},
							{
								title: 'Buttons',
								count: 92,
								href: '/collections/buttons',
								comingSoon: false,
								icon: (
									<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
									</svg>
								)
							},
							{
								title: 'Cards',
								count: 0,
								href: '/collections/cards',
								comingSoon: true,
								icon: (
									<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
								)
							},
							{
								title: 'Text Animations',
								count: 0,
								href: '/collections/text-animations',
								comingSoon: true,
								icon: (
									<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
									</svg>
								)
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
									<div className="relative group h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl bg-black/60 backdrop-blur-md border border-white/30 hover:border-[#B8FB3C]/50">
										<div className="relative h-full p-6 flex flex-col justify-between text-white">
											<div>
												<div className="text-[#B8FB3C] mb-3 group-hover:-translate-y-1 transition-transform duration-300">
													{collection.icon}
												</div>
												<h3 className="text-xl font-bold mb-1">{collection.title}</h3>
											</div>

											<div className="flex items-center justify-between">
												{collection.comingSoon ? (
													<span className="text-xs font-semibold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
														Coming Soon
													</span>
												) : (
													<span className="text-xs font-semibold bg-[#B8FB3C]/20 px-3 py-1 rounded-full backdrop-blur-md border border-[#B8FB3C]/30 text-[#B8FB3C]">
														{collection.count} items
													</span>
												)}

												<span className="text-white/70 group-hover:text-[#B8FB3C] text-sm font-semibold transition-colors">
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
							<div className="text-[#B8FB3C]">
								<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
							</div>
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
							<div className="text-[#B8FB3C]">
								<svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
								</svg>
							</div>
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
