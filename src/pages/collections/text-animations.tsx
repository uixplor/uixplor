import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function TextAnimations() {
	return (
		<>
			<Head>
				<title>Text Animations - Collections - UIXplor</title>
				<meta name="description" content="Eye-catching text animation effects - Coming Soon" />
			</Head>

			<main className="min-h-screen   py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					{/* Breadcrumbs */}
					<nav className="mb-8 text-sm">
						<ol className="flex items-center space-x-2 text-white/60">
							<li>
								<Link href="/" className="hover:text-[#B8FB3C] transition-colors">
									Home
								</Link>
							</li>
							<li>/</li>
							<li>
								<Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">
									Collections
								</Link>
							</li>
							<li>/</li>
							<li className="text-white font-semibold">Text Animations</li>
						</ol>
					</nav>

					{/* Coming Soon Content */}
					<div className="text-center py-20">
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<div className="text-[#B8FB3C]">
								<svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
								</svg>
							</div>
							<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
								Text Animations
							</h1>
							<p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
								Eye-catching text animation effects are coming soon!
							</p>

							<div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
								🚧 Under Construction
							</div>

							<div className="mt-12">
								<Link
									href="/collections"
									className="text-[#B8FB3C] hover:text-[#B8FB3C]/80 font-semibold transition-colors"
								>
									← Back to Collections
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</main>
		</>
	);
}
