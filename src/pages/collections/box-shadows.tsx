import Head from 'next/head';
import Link from 'next/link';
import ShadowCardGrid from '@/components/homepage/ShadowCardGrid';

export default function BoxShadows() {
	return (
		<>
			<Head>
				<title>Box Shadows - Collections - UIXplor</title>
				<meta name="description" content="93 beautiful CSS box shadow examples ready to copy" />
			</Head>

			<main className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
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
							<li className="text-white font-semibold">Box Shadows</li>
						</ol>
					</nav>

					{/* Header */}
					<div className="text-center mb-12">
						<div className="text-6xl mb-4">📦</div>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
							Box Shadows
						</h1>
						<p className="text-lg text-white/70 max-w-2xl mx-auto">
							93 beautiful CSS box shadow examples. Click any shadow to copy its CSS code.
						</p>
					</div>

					{/* Shadow Grid */}
					<ShadowCardGrid />
				</div>
			</main>
		</>
	);
}
