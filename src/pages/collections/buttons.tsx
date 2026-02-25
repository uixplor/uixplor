import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import buttons from '../../../data/buttons.json';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

/** Extract a single CSS property value from a full CSS block */
function extractCssProp(css: string, prop: string): string {
	const re = new RegExp(`${prop}\\s*:\\s*([^;]+)`, 'i');
	const m = css.match(re);
	return m ? m[1].trim() : '';
}

/** Build inline preview style from button CSS — strips height so it doesn't render as a plain rectangle */
function buildPreviewStyle(css: string): React.CSSProperties {
	const bg = extractCssProp(css, 'background(?:-color)?');
	const color = extractCssProp(css, '^\\s*color');
	const borderRadius = extractCssProp(css, 'border-radius');
	const border = extractCssProp(css, 'border(?!-)(?!-radius)');
	const boxShadow = extractCssProp(css, 'box-shadow');
	const fontSize = extractCssProp(css, 'font-size');
	const fontWeight = extractCssProp(css, 'font-weight');
	const padding = extractCssProp(css, 'padding(?!-)');
	const letterSpacing = extractCssProp(css, 'letter-spacing');
	return {
		background: bg || 'transparent',
		color: color || '#fff',
		borderRadius: borderRadius || '6px',
		border: border || 'none',
		boxShadow: boxShadow || 'none',
		fontSize: fontSize || '14px',
		fontWeight: fontWeight || '500',
		padding: padding || '9px 20px',
		letterSpacing: letterSpacing || 'normal',
		cursor: 'pointer',
		transition: 'all 0.25s ease',
		display: 'inline-block',
		fontFamily: 'inherit',
		// Never extract height — keeps buttons as text-pill shapes not rectangles
	};
}

/** Extract hover styles */
function buildHoverStyle(css: string): React.CSSProperties {
	const hoverBlock = css.match(/:hover\s*\{([^}]+)\}/);
	if (!hoverBlock) return {};
	const hoverCss = hoverBlock[1];
	const style: Record<string, string> = {};
	hoverCss.split(';').forEach((decl) => {
		const colon = decl.indexOf(':');
		if (colon === -1) return;
		const prop = decl.slice(0, colon).trim();
		const val = decl.slice(colon + 1).trim();
		if (!prop || !val) return;
		const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
		style[camel] = val;
	});
	return style as React.CSSProperties;
}

function ButtonPreview({ css }: { css: string }) {
	const [hovered, setHovered] = useState(false);
	const baseStyle = buildPreviewStyle(css);
	const hoverStyle = buildHoverStyle(css);

	const bgStr = (baseStyle.background || '').toString().toLowerCase();
	const isLight =
		bgStr.includes('#fff') ||
		bgStr.includes('ffffff') ||
		bgStr.includes('fafb') ||
		bgStr.includes('f3f4') ||
		bgStr.includes('rgba(51') ||
		bgStr.includes('#fef') ||
		bgStr.includes('#e8') ||
		bgStr.includes('#faf') ||
		bgStr === 'transparent' && (baseStyle.color || '').toString().includes('#');

	return {
		isLight, node: (
			<button
				type="button"
				style={{ ...baseStyle, ...(hovered ? hoverStyle : {}) }}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				className="select-none text-sm"
			>
				Click Me
			</button>
		)
	};
}

function buildSections(btn: typeof buttons[number]): CodeSection[] {
	const className = btn.name.toLowerCase().replace(/\s+/g, '-').replace(/#/g, '');
	return [
		{ label: 'HTML', language: 'html', code: `<button class="${className}">Click Me</button>` },
		{ label: 'CSS', language: 'css', code: btn.css },
	];
}

export default function Buttons() {
	const [selectedBtn, setSelectedBtn] = useState<typeof buttons[number] | null>(null);

	return (
		<>
			<PageSEO
				title="CSS Button Styles – 15 Modern UI Button Examples – UIXplor"
				description="15 premium CSS button styles with hover states and animations. From minimalist to neon, gradient to glass — copy any button instantly for your web project."
				path="/collections/buttons"
				keywords={['CSS button styles', 'modern UI buttons', 'button design CSS', 'hover button effects', 'CSS button examples', 'copy paste button CSS', 'web UI buttons']}
				jsonLd={[
					{
						'@context': 'https://schema.org',
						'@type': 'CollectionPage',
						name: 'CSS Buttons Collection – UIXplor',
						description: '15 premium CSS button styles including gradient, glass, neon, and animated buttons with hover effects.',
						url: 'https://uixplor.com/collections/buttons',
						isPartOf: { '@type': 'WebSite', name: 'UIXplor', url: 'https://uixplor.com' },
					},
					{
						'@context': 'https://schema.org',
						'@type': 'BreadcrumbList',
						itemListElement: [
							{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uixplor.com' },
							{ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://uixplor.com/collections' },
							{ '@type': 'ListItem', position: 3, name: 'CSS Buttons', item: 'https://uixplor.com/collections/buttons' },
						],
					},
				]}
			/>

			<main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
				<div className="max-w-7xl mx-auto">
					{/* Breadcrumbs */}
					<nav className="mb-8">
						<ol className="flex items-center gap-2 text-sm text-white/40">
							<li><Link href="/" className="hover:text-[#B8FB3C] transition-colors">Home</Link></li>
							<li>/</li>
							<li><Link href="/collections" className="hover:text-[#B8FB3C] transition-colors">Collections</Link></li>
							<li>/</li>
							<li className="text-white font-medium">Buttons</li>
						</ol>
					</nav>

					{/* Hero */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">CSS Buttons</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">
							Premium button styles — click any card to view &amp; copy the full CSS.
						</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
							<span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
							{buttons.length} buttons
						</span>
					</motion.div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
						{buttons.map((btn, index) => {
							const preview = ButtonPreview({ css: btn.css });
							const isLight = preview.isLight;
							return (
								<motion.div
									key={btn.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.03 }}
								>
									<div className={`rounded-2xl overflow-hidden h-full transition-all duration-300 border ${isLight
										? 'bg-white border-gray-200/60 hover:border-gray-300'
										: 'bg-linear-to-b from-white/4 to-black/25 border-white/6 hover:border-white/12'
										}`}>
										{/* Button preview */}
										<div className={`p-8 flex items-center justify-center h-32 sm:h-36 ${isLight ? 'bg-gray-50' : 'bg-white/2'}`}>
											{preview.node}
										</div>
										{/* Info bar */}
										<div className={`px-4 py-3 flex items-center justify-between ${isLight ? 'border-t border-gray-100' : 'border-t border-white/6'}`}>
											<div className="min-w-0 mr-3">
												<span className={`text-xs font-medium truncate block ${isLight ? 'text-gray-600' : 'text-white/60'}`}>
													{btn.name}
												</span>
												<span className={`text-[10px] ${isLight ? 'text-gray-400' : 'text-white/25'}`}>
													{btn.credits}
												</span>
											</div>
											<button
												onClick={() => setSelectedBtn(btn)}
												className={`relative z-10 shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ${isLight
													? 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200 hover:text-gray-700 hover:border-gray-300'
													: 'bg-white/6 text-white/50 border-white/8 hover:bg-white/10 hover:text-white/80 hover:border-white/20'
													}`}
											>
												View Code →
											</button>
										</div>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</main>

			<CodeViewerOverlay
				isOpen={!!selectedBtn}
				onClose={() => setSelectedBtn(null)}
				title={selectedBtn?.name || ''}
				sections={selectedBtn ? buildSections(selectedBtn) : []}
			/>
		</>
	);
}
