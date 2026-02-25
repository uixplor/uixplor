import PageSEO from '@/components/seo/PageSEO';
import Link from 'next/link';
import { motion } from 'motion/react';
import PageBackground from '@/components/ui/PageBackground';

const fadeUp = (delay = 0) => ({
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.5, delay },
});

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<motion.section className="mb-12" {...fadeUp(0.05)}>
		<h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3">
			<span className="w-1.5 h-6 rounded-full bg-[#B8FB3C] shrink-0" />
			{title}
		</h2>
		<div className="text-white/55 leading-relaxed space-y-3 text-sm sm:text-base pl-5">
			{children}
		</div>
	</motion.section>
);

export default function Disclaimer() {
	return (
		<>
			<PageSEO
				title="Disclaimer – UIXplor"
				description="UIXplor's Disclaimer — our CSS code snippets are provided for educational and inspirational use. No guarantees of fitness for a particular purpose."
				path="/disclaimer"
			/>

			<main className="min-h-screen px-4 sm:px-6 py-16 sm:py-24 relative">
				<PageBackground />
				<div className="max-w-3xl mx-auto relative z-10">

					{/* Header */}
					<motion.div className="mb-14" {...fadeUp()}>
						<Link href="/" className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-[#B8FB3C] transition-colors mb-8 group">
							<svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
							Back to Home
						</Link>
						<p className="text-xs font-semibold uppercase tracking-widest text-[#B8FB3C] mb-3">Legal</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Disclaimer</h1>
						<p className="text-white/40 text-sm">Last updated: February 25, 2026</p>
					</motion.div>

					<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

					<Section title="1. Informational Purpose">
						<p>All content published on UIXplor — including CSS snippets, UI component examples, blog articles, tutorials, and design guides — is provided for <strong className="text-white/80">informational and educational purposes only</strong>.</p>
						<p>UIXplor is a design reference and inspiration tool. It is not a substitute for professional software engineering consultation, legal advice, or any other professional service.</p>
					</Section>

					<Section title="2. No Guarantees">
						<p>While we strive to keep our content accurate, up to date, and functional, UIXplor makes <strong className="text-white/80">no warranties</strong> of any kind — express or implied — regarding:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>The accuracy, completeness, or currentness of any content</li>
							<li>The fitness of any code snippet for a particular use case or browser environment</li>
							<li>The availability or uptime of the website</li>
							<li>That using our code will achieve specific design results in your project</li>
						</ul>
						<p className="mt-3">Web technologies evolve rapidly. Code snippets that work today may require updates for future browser versions or CSS specifications.</p>
					</Section>

					<Section title="3. Limitation of Responsibility">
						<p>UIXplor and its contributors accept no responsibility or liability for:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>Errors or omissions in any content</li>
							<li>Bugs or issues arising from the use of our code in your projects</li>
							<li>Any damage to your systems or data as a result of visiting or using UIXplor</li>
							<li>Decisions made based on information found on this website</li>
						</ul>
						<div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
							<p className="text-sm text-amber-300/80">You use all content from UIXplor at your own risk. Always test code in a development environment before deploying to production.</p>
						</div>
					</Section>

					<Section title="4. External Links Disclaimer">
						<p>UIXplor may contain links to third-party websites, resources, or tools. These links are provided for convenience and informational purposes only.</p>
						<p>We have no control over the content, privacy policies, or availability of external sites. The inclusion of any link does not imply endorsement, recommendation, or approval by UIXplor.</p>
						<p>We strongly recommend reviewing the terms and privacy policies of any third-party website you visit through links on UIXplor.</p>
					</Section>

					<Section title="5. Professional Advice">
						<p>Nothing on UIXplor should be interpreted as professional legal, financial, or technical advice. For complex or mission-critical implementations, we recommend consulting qualified professionals in the relevant field.</p>
					</Section>

					<Section title="6. Contact">
						<p>If you spot inaccurate content or have concerns about anything on UIXplor, please let us know:</p>
						<div className="mt-3 p-4 rounded-xl bg-white/3 border border-white/6">
							<p className="text-sm text-[#B8FB3C]">hello@uixplor.com</p>
						</div>
					</Section>

				</div>
			</main>
		</>
	);
}
