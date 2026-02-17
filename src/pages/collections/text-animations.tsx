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
							<div className="text-8xl mb-6">✨</div>
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
