import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Cards() {
	return (
		<>
			<Head>
				<title>Cards - Collections - UIXplor</title>
				<meta name="description" content="Modern card components for your projects - Coming Soon" />
			</Head>

			<main className="  py-12 px-4 sm:px-6 lg:px-8">
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
							<li className="text-white font-semibold">Cards</li>
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
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							</div>
							<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
								Card Components
							</h1>
							<p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
								Modern card components are coming soon!
							</p>

							<div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold">
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
