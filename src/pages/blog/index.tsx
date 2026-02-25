import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GetStaticProps } from 'next';
import blogData from '../../../data/blog.json';
import PageBackground from '@/components/ui/PageBackground';

type Post = {
	slug: string;
	title: string;
	excerpt: string;
	author: string;
	date: string;
	readingTime: number;
	tags: string[];
};

const gradients = [
	'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
	'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
	'linear-gradient(135deg, #1e3a3a 0%, #0f2a2a 100%)',
	'linear-gradient(135deg, #2d1b69 0%, #1a0533 100%)',
	'linear-gradient(135deg, #0a2540 0%, #0f3460 100%)',
	'linear-gradient(135deg, #1a0000 0%, #3a0000 100%)',
];

const tagColors: Record<string, string> = {
	CSS: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
	'Box Shadows': 'text-[#B8FB3C] bg-[#B8FB3C]/10 border-[#B8FB3C]/20',
	Buttons: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
	Glassmorphism: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
	'UI Design': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
	Animations: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
	Gradients: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
	Forms: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
	UX: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
	Loaders: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
	Inputs: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
};
function tagClass(tag: string) {
	return tagColors[tag] || 'text-white/40 bg-white/5 border-white/8';
}

export default function BlogIndex({ posts, allTags }: { posts: Post[]; allTags: string[] }) {
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const filtered = activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts;
	const featured = filtered[0];
	const rest = filtered.slice(1);

	return (
		<>
			<PageSEO
				title="CSS Design Blog – Tutorials, Guides & UI Tips – UIXplor"
				description="In-depth CSS guides covering box shadows, glassmorphism, animations, gradients, scroll effects, and modern CSS features. Written for developers who love great UI."
				path="/blog"
				keywords={['CSS tutorials', 'CSS design guide', 'CSS blog', 'web design tips', 'CSS animations guide', 'modern CSS', 'UI development blog']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'Blog',
						name: 'UIXplor CSS Blog',
						description: 'In-depth CSS guides and UI design tutorials for modern web developers.',
						url: 'https://uixplor.com/blog',
						publisher: { '@type': 'Organization', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://uixplor.com/blog' },
						],
					},
				]}
			/>

			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 relative">
				<PageBackground />
				<div className="max-w-6xl mx-auto relative z-10">

					{/* Breadcrumbs */}
					<nav className="mb-8">
						<ol className="flex items-center gap-2 text-sm text-white/40">
							<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
							<li>/</li>
							<li className="text-white font-medium">Blog</li>
						</ol>
					</nav>

					{/* Header */}
					<motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">Blog</h1>
						<p className="text-white/50">Deep dives into modern CSS, UI patterns, and design systems.</p>
					</motion.div>

					{/* Tag Filter */}
					<motion.div className="flex flex-wrap gap-2 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.15 }}>
						<button
							onClick={() => setActiveTag(null)}
							className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${activeTag === null ? 'bg-[#B8FB3C] text-[#0a0a0f] border-[#B8FB3C]' : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white/70'}`}
						>
							All <span className="ml-1 opacity-60">{posts.length}</span>
						</button>
						{allTags.map(tag => (
							<button
								key={tag}
								onClick={() => setActiveTag(activeTag === tag ? null : tag)}
								className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${activeTag === tag ? 'bg-[#B8FB3C] text-[#0a0a0f] border-[#B8FB3C]' : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30 hover:text-white/70'}`}
							>
								{tag}
							</button>
						))}
					</motion.div>

					<AnimatePresence mode="wait">
						<motion.div key={activeTag ?? 'all'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
							{filtered.length === 0 ? (
								<p className="text-white/40 text-center py-20">No posts found for "{activeTag}"</p>
							) : (
								<>
									{/* Featured Post */}
									{featured && (
										<div className="mb-8">
											<Link href={`/blog/${featured.slug}`} className="group block">
												<div className="rounded-2xl overflow-hidden border border-white/6 hover:border-white/14 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,255,255,0.06)] flex flex-col sm:flex-row">
													<div className="sm:w-64 lg:w-80 shrink-0 h-40 sm:h-auto" style={{ background: gradients[0] }}>
														<div className="h-full flex items-center justify-center">
															<span className="text-white/20 font-black text-7xl select-none leading-none">CSS</span>
														</div>
													</div>
													<div className="flex-1 p-5 sm:p-6 bg-white/[0.025]">
														<div className="flex flex-wrap gap-1.5 mb-3">
															{featured.tags.slice(0, 3).map(tag => (
																<span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${tagClass(tag)}`}>{tag}</span>
															))}
															<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#B8FB3C]/10 text-[#B8FB3C] border border-[#B8FB3C]/20 uppercase tracking-wider">Featured</span>
														</div>
														<h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#B8FB3C] transition-colors duration-300 leading-snug">{featured.title}</h2>
														<p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{featured.excerpt}</p>
														<div className="flex items-center gap-3 text-xs text-white/30">
															<span>{new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
															<span>·</span>
															<span>{featured.readingTime} min read</span>
															<span className="ml-auto text-[#B8FB3C] font-semibold group-hover:translate-x-1 transition-transform duration-300">Read →</span>
														</div>
													</div>
												</div>
											</Link>
										</div>
									)}

									{/* Grid of rest */}
									{rest.length > 0 && (
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
											{rest.map((post, i) => (
												<motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
													<Link href={`/blog/${post.slug}`} className="group block h-full">
														<div className="h-full rounded-2xl overflow-hidden border border-white/6 hover:border-white/14 transition-all duration-300 hover:shadow-[0_4px_16px_rgba(255,255,255,0.05)] flex flex-col">
															<div className="h-28" style={{ background: gradients[(i + 1) % gradients.length] }}>
																<div className="h-full flex items-center justify-center">
																	<span className="text-white/15 font-black text-5xl select-none">{post.tags[0]?.[0] ?? 'C'}</span>
																</div>
															</div>
															<div className="flex-1 p-4 flex flex-col">
																<div className="flex flex-wrap gap-1 mb-2">
																	{post.tags.slice(0, 2).map(tag => (
																		<span key={tag} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border uppercase tracking-wider ${tagClass(tag)}`}>{tag}</span>
																	))}
																</div>
																<h2 className="text-sm font-semibold text-white mb-1.5 leading-snug group-hover:text-[#B8FB3C] transition-colors duration-300 line-clamp-2">{post.title}</h2>
																<p className="text-white/40 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{post.excerpt}</p>
																<div className="flex items-center justify-between text-[10px] text-white/25 pt-2 border-t border-white/5">
																	<span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
																	<span>{post.readingTime} min read</span>
																</div>
															</div>
														</div>
													</Link>
												</motion.article>
											))}
										</div>
									)}
								</>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = blogData.map(({ slug, title, excerpt, author, date, readingTime, tags }) => ({
		slug, title, excerpt, author, date, readingTime, tags,
	}));
	// Collect unique tags across all posts, sorted by frequency
	const tagCounts: Record<string, number> = {};
	blogData.forEach(p => p.tags.forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
	const allTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).map(([tag]) => tag);
	return { props: { posts, allTags } };
};
