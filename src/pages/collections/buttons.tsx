import Head from 'next/head';
import Link from 'next/link';
import ButtonCardGrid from '@/components/homepage/ButtonCardGrid';

export default function Buttons() {
	return (
		<>
			<Head>
				<title>Buttons - Collections - UIXplor</title>
				<meta name="description" content="92 stunning CSS button styles from top designers" />
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
							<li className="text-white font-semibold">Buttons</li>
						</ol>
					</nav>

					{/* Header */}
					<div className="text-center mb-12">
						<div className="text-[#B8FB3C]">
							<svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
							</svg>
						</div>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
							CSS Buttons
						</h1>
						<p className="text-lg text-white/70 max-w-2xl mx-auto">
							92 stunning CSS button styles from top designers. Click any button to copy its CSS code.
						</p>
					</div>

					{/* Button Grid */}
					<ButtonCardGrid />
				</div>
			</main>
		</>
	);
}
