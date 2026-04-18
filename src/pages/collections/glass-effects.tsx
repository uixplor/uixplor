import PageSEO from '@/components/seo/PageSEO';
import { GlowGrid } from '@/components/ui/GlowGrid';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { GetStaticProps } from 'next';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

interface GlassItem {
	id: string;
	name: string;
	tag: string;
	description: string;
	css: string;
	previewBg: string;
}

export default function GlassEffects({ items }: { items: GlassItem[] }) {
	const [sel, setSel] = useState<GlassItem | null>(null);
	return (
		<>
			<PageSEO
				title="Glassmorphism CSS Examples – Frosted Glass UI Components – UIXplor"
				description="15 glassmorphism CSS components — frosted cards, glass modals, blur navbars, and layered glass effects. Copy the backdrop-filter CSS code in one click."
				path="/collections/glass-effects"
				keywords={['glassmorphism CSS', 'frosted glass CSS', 'glass effect UI', 'backdrop filter CSS', 'glassmorphism card', 'blur card CSS', 'glass UI components']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Glass Effects Collection – UIXplor',
						description: '15 glassmorphism CSS components including frosted glass cards, glass buttons, blur overlays, and layered glass effects.',
						url: 'https://uixplor.com/collections/glass-effects',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'Glass Effects', item: 'https://uixplor.com/collections/glass-effects' },
						],
					},
				]}
			/>
			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					<nav className="mb-8"><ol className="flex items-center gap-2 text-sm text-white/40"><li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li><li>/</li><li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li><li>/</li><li className="text-white font-medium">Glass Effects</li></ol></nav>
					<motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">Glass Effects</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">Frosted glass cards, navbars, modals, buttons and layered glass — ready to copy.</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-sky-400 bg-sky-500/10 rounded-full border border-sky-500/20"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" />{items.length} effects</span>
					</motion.div>
					<GlowGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item, i) => (
							<motion.div key={item.id} className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
								{/* Preview */}
								<div className="h-44 flex items-center justify-center rounded-t-2xl" style={{ background: item.previewBg }}>
									<div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '14px 22px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)' }}>
										<div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 600 }}>{item.name}</div>
										<div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, marginTop: 2 }}>Glass component</div>
									</div>
								</div>
								<div className="px-5 py-4 border-t border-white/6">
									<h3 className="text-sm font-semibold text-white mb-0.5">{item.name}</h3>
									<p className="text-xs text-white/40 mb-3 leading-relaxed">{item.description}</p>
									<div className="flex items-center justify-between">
										<span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider">{item.tag}</span>
										<button onClick={() => setSel(item)} className="relative z-10 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-sky-400 hover:text-white hover:border-sky-400 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(56,189,248,0.2)] transition-all duration-300 cursor-pointer">View Code →</button>
                      <Link
                        href={`/component/${item.id}?collection=glass-effects`}
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
			<CodeViewerOverlay isOpen={!!sel} onClose={() => setSel(null)} title={sel?.name || ''} sections={sel ? [{ label: 'CSS', language: 'css', code: sel.css }] as CodeSection[] : []} />
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await import('../../../data/glass-effects.json');
	return { props: { items: data.default } };
};
