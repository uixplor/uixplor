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
						<div className="text-6xl mb-4">🎨</div>
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
