import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

const fadeUp = (delay: number = 0) => ({
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, amount: 0.2 as const },
	transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export default function About() {
	return (
		<>
			<Head>
				<title>About — UIXplor</title>
				<meta name="description" content="Learn about UIXplor — a curated library of open-source UI elements for developers and designers." />
			</Head>

			<main className="min-h-screen">
				{/* Hero */}
				<section className="pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 text-center px-4 sm:px-6">
					<motion.div {...fadeUp()}>
						<span className="inline-block text-sm font-medium uppercase tracking-widest text-white/30 mb-4">
							About Us
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
							Building the UI
							<br />
							<span className="text-white/30">Inspiration Layer</span>
						</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
							UIXplor is a curated, community-driven library of beautiful UI elements
							— ready to browse, copy, and integrate into your next project.
						</p>
					</motion.div>
				</section>

				{/* Divider */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
				</div>

				{/* What is UIXplor */}
				<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
					<motion.div {...fadeUp(0.1)}>
						<div className="flex items-center gap-3 mb-6">
							<div className="w-10 h-10 rounded-xl bg-[#B8FB3C]/10 flex items-center justify-center border border-[#B8FB3C]/20">
								<svg className="w-5 h-5 text-[#B8FB3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							</div>
							<h2 className="text-2xl sm:text-3xl font-bold text-white">What is UIXplor?</h2>
						</div>
						<div className="space-y-4 text-white/50 text-base sm:text-lg leading-relaxed">
							<p>
								UIXplor is a design reference and code snippet library for modern web interfaces.
								We curate CSS box shadows, button styles, card layouts, text animations, and more —
								all organized into clean, browsable collections.
							</p>
							<p>
								Every element is presented with a live preview and can be copied with a single click.
								No sign-up, no paywall. Just open-source UI pieces built for developers who
								care about the details.
							</p>
						</div>
					</motion.div>
				</section>

				{/* Mission */}
				<section className="bg-white/[0.02]">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
						<motion.div {...fadeUp(0.1)}>
							<div className="flex items-center gap-3 mb-6">
								<div className="w-10 h-10 rounded-xl bg-[#B8FB3C]/10 flex items-center justify-center border border-[#B8FB3C]/20">
									<svg className="w-5 h-5 text-[#B8FB3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								</div>
								<h2 className="text-2xl sm:text-3xl font-bold text-white">Our Mission</h2>
							</div>
							<div className="space-y-4 text-white/50 text-base sm:text-lg leading-relaxed">
								<p>
									Good UI shouldn&apos;t be locked behind premium templates or scattered across dozens of
									CodePen links. We believe design inspiration should be accessible, organized, and
									easy to use.
								</p>
								<p>
									UIXplor bridges the gap between raw CSS documentation and real-world,
									production-quality UI. Every shadow, button, and component is designed to look
									great on day one — no tweaking required.
								</p>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Why This Exists */}
				<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
					<motion.div {...fadeUp(0.1)}>
						<div className="flex items-center gap-3 mb-6">
							<div className="w-10 h-10 rounded-xl bg-[#B8FB3C]/10 flex items-center justify-center border border-[#B8FB3C]/20">
								<svg className="w-5 h-5 text-[#B8FB3C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
								</svg>
							</div>
							<h2 className="text-2xl sm:text-3xl font-bold text-white">Why This Exists</h2>
						</div>
						<div className="space-y-4 text-white/50 text-base sm:text-lg leading-relaxed">
							<p>
								As developers, we spend too much time searching for that &ldquo;perfect shadow&rdquo; or
								&ldquo;clean button style&rdquo;. UIXplor was born from frustration — the gap between
								wanting a polished UI and having an accessible library to pull from.
							</p>
							<p>
								This project is a love letter to the small details that make interfaces feel
								premium. The subtle shadow that lifts a card. The button that responds just right.
								The typography that breathes.
							</p>
						</div>
					</motion.div>
				</section>

				{/* Divider */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
				</div>


				{/* CTA */}
				<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 text-center">
					<motion.div {...fadeUp(0.1)}>
						<Link
							href="/collections"
							className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-full bg-[#B8FB3C] text-[#0a0a0f] transition-all duration-250 hover:shadow-[0_0_24px_rgba(184,251,60,0.25)]"
						>
							Explore Collections
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</Link>
					</motion.div>
				</section>
			</main>
		</>
	);
}
