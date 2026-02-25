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

const cookieTypes = [
	{
		type: 'Essential Cookies',
		purpose: 'Required for basic site functionality. They cannot be disabled.',
		examples: 'Session management, security tokens',
		color: 'text-[#B8FB3C]',
		bg: 'bg-[#B8FB3C]/5 border-[#B8FB3C]/15',
	},
	{
		type: 'Analytics Cookies',
		purpose: 'Help us understand how visitors interact with the site — pages visited, time spent, traffic sources.',
		examples: 'Google Analytics, Plausible',
		color: 'text-sky-400',
		bg: 'bg-sky-500/5 border-sky-500/15',
	},
	{
		type: 'Preference Cookies',
		purpose: 'Remember your settings and preferences for a better return experience.',
		examples: 'Theme preference, last viewed collection',
		color: 'text-purple-400',
		bg: 'bg-purple-500/5 border-purple-500/15',
	},
];

export default function Cookies() {
	return (
		<>
			<PageSEO
				title="Cookie Policy – UIXplor"
				description="UIXplor's Cookie Policy — how we use cookies, which types we use, and how you can control them. Your preferences matter to us."
				path="/cookies"
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
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Cookie Policy</h1>
						<p className="text-white/40 text-sm">Last updated: February 25, 2026</p>
						<div className="mt-6 p-4 rounded-xl bg-[#B8FB3C]/5 border border-[#B8FB3C]/15">
							<p className="text-sm text-white/60">UIXplor uses a minimal number of cookies. We keep it lean: only what&apos;s needed to provide you a good experience and understand how our site is used.</p>
						</div>
					</motion.div>

					<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

					<Section title="1. What Are Cookies?">
						<p>Cookies are small text files that websites store on your device when you visit. They help the site remember information about your visit — like your preferences or which pages you viewed.</p>
						<p>Cookies don&apos;t give websites access to your files or personal information beyond what you share directly. They are widely used across the internet and are generally considered safe when used responsibly.</p>
					</Section>

					<Section title="2. Types of Cookies We Use">
						<p>UIXplor uses three types of cookies:</p>
						<div className="mt-4 space-y-3">
							{cookieTypes.map(c => (
								<div key={c.type} className={`p-4 rounded-xl border ${c.bg}`}>
									<p className={`font-semibold text-sm mb-1 ${c.color}`}>{c.type}</p>
									<p className="text-xs text-white/50 mb-1">{c.purpose}</p>
									<p className="text-xs text-white/30">Examples: {c.examples}</p>
								</div>
							))}
						</div>
					</Section>

					<Section title="3. Why We Use Cookies">
						<p>We use cookies to:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>Keep the site running smoothly and securely</li>
							<li>Understand which features and collections are most useful to our visitors</li>
							<li>Identify performance issues and fix them faster</li>
							<li>Remember preferences so you don&apos;t have to set them every visit</li>
						</ul>
						<p className="mt-3">We do <strong className="text-white/80">not</strong> use cookies for advertising, retargeting, or selling data.</p>
					</Section>

					<Section title="4. How to Control Cookies">
						<p>You have full control over cookies in your browser. Here&apos;s how to manage them in the most common browsers:</p>
						<div className="mt-3 grid sm:grid-cols-2 gap-3">
							{[
								{ browser: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
								{ browser: 'Firefox', url: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop' },
								{ browser: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471' },
								{ browser: 'Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406' },
							].map(b => (
								<a
									key={b.browser}
									href={b.url}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/6 hover:border-[#B8FB3C]/25 hover:bg-[#B8FB3C]/5 transition-all"
								>
									<span className="text-sm font-medium text-white/70">{b.browser}</span>
									<span className="text-xs text-[#B8FB3C]">Cookie Guide ↗</span>
								</a>
							))}
						</div>
						<p className="mt-4">Note: Disabling essential cookies may affect site functionality. Analytics cookies can be prevented by enabling &quot;Do Not Track&quot; in your browser.</p>
					</Section>

					<Section title="5. Third-Party Cookies">
						<p>Some third-party services we use (like analytics tools and Google Fonts) may set their own cookies. We don&apos;t control these cookies. Please refer to each service&apos;s own cookie policy for details.</p>
					</Section>

					<Section title="6. Contact">
						<p>Questions about our use of cookies?</p>
						<div className="mt-3 p-4 rounded-xl bg-white/3 border border-white/6">
							<p className="text-sm text-[#B8FB3C]">hello@uixplor.com</p>
						</div>
					</Section>

				</div>
			</main>
		</>
	);
}
