import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import shadows from '../../../data/shadows.json';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

const CATEGORIES = [
	{ key: 'all', label: 'All' },
	{ key: 'token', label: 'Tokens' },
	{ key: 'soft', label: 'Soft' },
	{ key: 'layered', label: 'Layered' },
	{ key: 'deep', label: 'Deep' },
	{ key: 'neumorphic', label: 'Neumorphic' },
	{ key: 'glow', label: 'Glow' },
	{ key: 'inset', label: 'Inset' },
];

function buildSections(shadow: typeof shadows[number]): CodeSection[] {
	const className = shadow.name.toLowerCase().replace(/\s+/g, '-');
	return [
		{
			label: 'HTML',
			language: 'html',
			code: `<div class="${className}">\n  <!-- Your content -->\n</div>`,
		},
		{
			label: 'CSS',
			language: 'css',
			code: `.${className} {\n  ${shadow.css}\n}`,
		},
	];
}

export default function BoxShadows() {
	const [activeCategory, setActiveCategory] = useState('all');
	const [selectedShadow, setSelectedShadow] = useState<typeof shadows[number] | null>(null);

	const filtered = activeCategory === 'all'
		? shadows
		: shadows.filter((s) => s.category === activeCategory);

	return (
		<>
			<Head>
				<title>Box Shadows Collection — UIXplor</title>
				<meta name="description" content="A curated collection of beautiful CSS box shadows. Copy any shadow with one click." />
			</Head>

			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					{/* Breadcrumbs */}
					<nav className="mb-8">
						<ol className="flex items-center gap-2 text-sm text-white/40">
							<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
							<li>/</li>
							<li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li>
							<li>/</li>
							<li className="text-white font-medium">Box Shadows</li>
						</ol>
					</nav>

					{/* Hero */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
							Box Shadows
						</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">
							Soft, layered CSS shadows — click any card to view & copy code.
						</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20">
							<span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]" />
							{shadows.length} shadows
						</span>
					</motion.div>

					{/* Category Filters */}
					<div className="flex flex-wrap gap-2 mb-10 justify-center">
						{CATEGORIES.map((cat) => {
							const isActive = activeCategory === cat.key;
							const count = cat.key === 'all'
								? shadows.length
								: shadows.filter((s) => s.category === cat.key).length;
							return (
								<button
									key={cat.key}
									onClick={() => setActiveCategory(cat.key)}
									className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive
										? 'bg-[#B8FB3C] text-[#0a0a0f]'
										: 'bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6'
										}`}
								>
									{cat.label}
									<span className={`ml-1.5 text-xs ${isActive ? 'text-[#0a0a0f]/60' : 'text-white/30'}`}>
										{count}
									</span>
								</button>
							);
						})}
					</div>

					{/* Shadow Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
						<AnimatePresence mode="popLayout">
							{filtered.map((shadow, index) => {
								const shadowValue = shadow.css.replace('box-shadow: ', '').replace(';', '');
								return (
									<motion.div
										key={shadow.id}
										layout
										className="rounded-2xl overflow-hidden bg-white/4 border border-white/8 transition-colors duration-300"
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.3, delay: index * 0.02 }}
									>
										{/* Shadow preview */}
										<div className="p-6 flex items-center justify-center h-32 sm:h-36 bg-white rounded-t-2xl">
											<div
												className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/90"
												style={{ boxShadow: shadowValue }}
											/>
										</div>
										{/* Info bar */}
										<div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
											<div className="min-w-0 mr-3">
												<span className="text-xs font-medium text-white/60 truncate block">
													{shadow.name}
												</span>
												<span className="text-[10px] text-white/25 uppercase tracking-wider">
													{shadow.category}
												</span>
											</div>
											<button
												onClick={() => setSelectedShadow(shadow)}
												className="relative z-10 shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,255,255,0.18)] transition-all duration-300 cursor-pointer"
											>
												View Code →
											</button>
										</div>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>

					{filtered.length === 0 && (
						<div className="text-center py-20">
							<p className="text-white/40">No shadows in this category.</p>
						</div>
					)}
				</div>
			</main>

			{/* Code Viewer Overlay */}
			<CodeViewerOverlay
				isOpen={!!selectedShadow}
				onClose={() => setSelectedShadow(null)}
				title={selectedShadow?.name || ''}
				sections={selectedShadow ? buildSections(selectedShadow) : []}
			/>
		</>
	);
}
