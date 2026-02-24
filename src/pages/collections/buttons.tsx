import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import buttons from '../../../data/buttons.json';
import CodeViewerOverlay, { type CodeSection } from '@/components/ui/CodeViewerOverlay';

/** Parse a CSS declaration string like "background: red; transform: translateY(-2px);" into a React style object */
function parseCssToStyle(css: string): React.CSSProperties {
	const style: Record<string, string> = {};
	css.split(';').forEach((decl) => {
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

/** Interactive button preview that applies hover/active styles from the JSON data */
function ButtonPreview({ btn, isLightBg }: { btn: typeof buttons[number]; isLightBg: boolean }) {
	const [hovered, setHovered] = useState(false);
	const [pressed, setPressed] = useState(false);

	const baseStyle: React.CSSProperties = {
		background: btn.background,
		boxShadow: btn.shadow,
		color: isLightBg ? '#1a1a2e' : '#ffffff',
		transition: 'all 0.3s ease',
		cursor: 'pointer',
	};

	const hoverStyle = parseCssToStyle(btn.hover);
	const activeStyle = parseCssToStyle(btn.active);

	const mergedStyle: React.CSSProperties = {
		...baseStyle,
		...(hovered ? hoverStyle : {}),
		...(pressed ? activeStyle : {}),
	};

	return (
		<div
			className="px-6 py-3 rounded-lg text-sm font-semibold select-none"
			style={mergedStyle}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => { setHovered(false); setPressed(false); }}
			onMouseDown={() => setPressed(true)}
			onMouseUp={() => setPressed(false)}
		>
			{btn.name}
		</div>
	);
}

function buildSections(btn: typeof buttons[number]): CodeSection[] {
	const className = btn.name.toLowerCase().replace(/\s+/g, '-');
	return [
		{
			label: 'HTML',
			language: 'html',
			code: `<button class="${className}">Click Me</button>`,
		},
		{
			label: 'CSS',
			language: 'css',
			code: `.${className} {\n  background: ${btn.background};\n  box-shadow: ${btn.shadow};\n  padding: 12px 28px;\n  border-radius: 8px;\n  font-weight: 600;\n  border: none;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\n/* Hover */\n.${className}:hover {\n  ${btn.hover}\n}\n\n/* Active */\n.${className}:active {\n  ${btn.active}\n}`,
		},
	];
}

export default function Buttons() {
	const [selectedBtn, setSelectedBtn] = useState<typeof buttons[number] | null>(null);

	return (
		<>
			<Head>
				<title>CSS Buttons Collection — UIXplor</title>
				<meta name="description" content="A curated collection of premium CSS button styles. Copy any button with one click." />
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
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
							CSS Buttons
						</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">
							Premium button styles with hover & active states — click to view & copy code.
						</p>
						<span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
							<span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
							{buttons.length} buttons
						</span>
					</motion.div>

					{/* Button Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
						{buttons.map((btn, index) => {
							const isLightBg = ['transparent', '#ffffff', '#f0f0f3', '#e8efe5'].includes(btn.background) || btn.background.includes('rgba');
							return (
								<motion.div
									key={btn.id}
									className={`rounded-2xl overflow-hidden transition-colors duration-300 ${isLightBg
										? 'bg-white border border-gray-200/60'
										: 'bg-white/4 border border-white/8'
										}`}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.04 }}
								>
									{/* Button preview — interactive with hover/active states */}
									<div className={`p-8 flex items-center justify-center h-32 sm:h-36 ${isLightBg ? 'bg-gray-50' : 'bg-white/2'}`}>
										<ButtonPreview btn={btn} isLightBg={isLightBg} />
									</div>
									{/* Info bar */}
									<div className={`px-4 py-3 flex items-center justify-between ${isLightBg ? 'border-t border-gray-100' : 'border-t border-white/6'}`}>
										<span className={`text-xs font-medium ${isLightBg ? 'text-gray-600' : 'text-white/60'}`}>
											{btn.name}
										</span>
										<button
											onClick={() => setSelectedBtn(btn)}
											className={`relative z-10 shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all duration-300 cursor-pointer hover:-translate-y-0.5 ${isLightBg
												? 'bg-gray-100 text-gray-500 border-gray-200 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-[0_8px_20px_rgba(168,85,247,0.2)]'
												: 'bg-white/6 text-white/50 border-white/8 hover:bg-purple-500 hover:text-white hover:border-purple-500 hover:shadow-[0_8px_20px_rgba(168,85,247,0.2)]'
												}`}
										>
											View Code →
										</button>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</main>

			{/* Code Viewer Overlay */}
			<CodeViewerOverlay
				isOpen={!!selectedBtn}
				onClose={() => setSelectedBtn(null)}
				title={selectedBtn?.name || ''}
				sections={selectedBtn ? buildSections(selectedBtn) : []}
			/>
		</>
	);
}
