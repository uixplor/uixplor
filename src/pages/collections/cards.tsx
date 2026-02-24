import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'motion/react';

const sampleCards = [
	{
		id: 'card-glass',
		name: 'Glass Card',
		style: 'bg-white/10 backdrop-blur-xl border border-white/20',
		textColor: 'text-white',
	},
	{
		id: 'card-elevated',
		name: 'Elevated Card',
		style: 'bg-white/[0.05] border border-white/[0.08]',
		textColor: 'text-white',
		shadow: '0 4px 24px rgba(0,0,0,0.3)',
	},
	{
		id: 'card-gradient',
		name: 'Gradient Card',
		style: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border border-purple-500/20',
		textColor: 'text-white',
	},
	{
		id: 'card-neon',
		name: 'Neon Glow Card',
		style: 'bg-[#0a0a0f] border border-[#B8FB3C]/30',
		textColor: 'text-white',
		shadow: '0 0 30px rgba(184,251,60,0.1)',
	},
	{
		id: 'card-dark',
		name: 'Dark Surface Card',
		style: 'bg-[#12121a] border border-white/[0.06]',
		textColor: 'text-white',
	},
	{
		id: 'card-outline',
		name: 'Outline Card',
		style: 'bg-transparent border-2 border-white/20',
		textColor: 'text-white',
	},
];

export default function Cards() {
	return (
		<>
			<Head>
				<title>Card Components — UIXplor</title>
				<meta name="description" content="Modern card components for your projects — Coming Soon" />
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
							<li className="text-white font-medium">Cards</li>
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
							Card Components
						</h1>
						<p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-6">
							Modern card layouts for dark interfaces.
						</p>
						<span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] text-sm font-medium text-white/50 border border-white/[0.06]">
							<span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
							Coming Soon — Preview Below
						</span>
					</motion.div>

					{/* Preview Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{sampleCards.map((card, index) => (
							<motion.div
								key={card.id}
								className={`rounded-2xl p-6 sm:p-8 min-h-[220px] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] ${card.style} ${card.textColor}`}
								style={{ boxShadow: card.shadow || 'none' }}
								initial={{ opacity: 0, y: 24 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.08 }}
							>
								<div>
									<div className="w-8 h-1 bg-[#B8FB3C] rounded-full mb-4" />
									<h3 className="text-lg font-bold mb-2">{card.name}</h3>
									<p className="text-sm opacity-50">
										A preview of the {card.name.toLowerCase()} style.
									</p>
								</div>
								<div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
									<span className="text-xs font-medium opacity-40">Preview</span>
									<span className="text-[10px] font-medium bg-white/[0.05] px-2.5 py-0.5 rounded-full opacity-30">
										Soon
									</span>
								</div>
							</motion.div>
						))}
					</div>

					<div className="text-center mt-12">
						<Link
							href="/collections"
							className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white/40 hover:text-[#B8FB3C] transition-colors"
						>
							← Back to Collections
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
