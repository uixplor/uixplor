
import PageSEO from '@/components/seo/PageSEO';
import { GlowGrid } from '@/components/ui/GlowGrid';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { GetStaticProps } from 'next';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface Item {
	id: string;
	name: string;
	tag: string;
	description: string;
	css: string;
	previewStyle: Record<string, string>;
}

export default function Gradients({ items }: { items: Item[] }) {
	const [sel, setSel] = useState<Item | null>(null);
	return (
		<>
			<PageSEO
				title="CSS Gradients Collection – Beautiful Color Gradients – UIXplor"
				description="40 CSS gradient backgrounds — aurora, mesh, holographic, conic, linear and noise texture gradients. Copy any gradient CSS code instantly for your next project."
				path="/collections/gradients"
				keywords={['CSS gradients', 'CSS background gradient', 'linear gradient CSS', 'mesh gradient CSS', 'aurora gradient', 'holographic CSS', 'color gradient generator']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Gradients Collection – UIXplor',
						description: '40 CSS gradient backgrounds including aurora, mesh, holographic, conic, and noise texture gradients for modern web design.',
						url: 'https://uixplor.com/collections/gradients',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'CSS Gradients', item: 'https://uixplor.com/collections/gradients' },
						],
					},
				]}
			/>
			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					<nav className="mb-8">
						<ol className="flex items-center gap-2 text-sm text-white/40">
							<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
							<li>/</li>
							<li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li>
							<li>/</li>
							<li className="text-white font-medium">Gradients</li>
						</ol>
					</nav>
					<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Gradients</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">CSS gradient backgrounds — aurora, mesh, holographic, conic, noise texture and more.</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-rose-400 bg-rose-500/10 rounded-full border border-rose-500/20">
							<span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
							{items.length} gradients
						</span>
					</motion.div>
					<GlowGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, i) => (
							<motion.div
								key={item.id}
								className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)]"
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: i * 0.04 }}
							>
								<div className="h-44 w-full rounded-t-2xl" style={item.previewStyle as React.CSSProperties} />
								<div className="px-5 py-4 border-t border-white/6">
									<h3 className="text-sm font-semibold text-white mb-0.5">{item.name}</h3>
									<p className="text-xs text-white/40 mb-3 leading-relaxed">{item.description}</p>
									<div className="flex items-center justify-between">
										<span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider">{item.tag}</span>
										<button
											onClick={() => setSel(item)}
											className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-rose-400 hover:text-white hover:border-rose-400 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(251,113,133,0.2)] transition-all duration-300 cursor-pointer"
										>
											View Code →
										</button>
                      <Link
                        href={`/component/${item.id}?collection=gradients`}
                        className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-[#6C63FF]/10 text-[#a78bfa] border border-[#6C63FF]/20 hover:bg-[#6C63FF]/20 hover:border-[#6C63FF]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      >
                        Details
                      </Link>
									</div>
								</div>
							</motion.div>
						))}
					</GlowGrid>
				</div>
			</main >
			<CodeViewerOverlay
				isOpen={!!sel}
				onClose={() => setSel(null)}
				title={sel?.name || ''}
				sections={sel ? [{ label: 'CSS', language: 'css', code: sel.css }] as CodeSection[] : []}
			/>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await import('../../../data/gradients.json');
	return { props: { items: data.default } };
};
