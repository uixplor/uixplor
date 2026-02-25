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

export default function Privacy() {
	return (
		<>
			<PageSEO
				title="Privacy Policy – UIXplor"
				description="UIXplor's Privacy Policy — how we collect, use, and protect your data. We respect your privacy and are committed to transparency."
				path="/privacy"
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
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Privacy Policy</h1>
						<p className="text-white/40 text-sm">Last updated: February 25, 2026 · Effective immediately</p>
						<div className="mt-6 p-4 rounded-xl bg-[#B8FB3C]/5 border border-[#B8FB3C]/15">
							<p className="text-sm text-white/60">UIXplor respects your privacy. This policy explains exactly what data we collect, why we collect it, and how we protect it. We believe in plain language — no legal jargon.</p>
						</div>
					</motion.div>

					<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

					<Section title="1. What Data We Collect">
						<p>UIXplor is a static, frontend-only website. We collect <strong className="text-white/80">minimal data</strong>. Here is what may be gathered:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li><strong className="text-white/70">Usage data</strong> — Pages visited, time on page, referrer URL (via analytics, described below)</li>
							<li><strong className="text-white/70">Device/browser info</strong> — Browser type, screen resolution, operating system</li>
							<li><strong className="text-white/70">IP address</strong> — Approximate geographic location (country/city level only)</li>
							<li><strong className="text-white/70">Interaction data</strong> — Button clicks, collection views, search queries within the site</li>
						</ul>
						<p className="mt-3">We do <strong className="text-white/80">not</strong> collect names, email addresses, payment information, or any personally identifiable information unless you voluntarily contact us.</p>
					</Section>

					<Section title="2. How We Use Your Data">
						<p>Data we collect is used strictly to improve your experience on UIXplor:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>Understand which UI components and blog posts are most useful</li>
							<li>Identify and fix broken pages or performance issues</li>
							<li>Analyze traffic to improve site structure and content</li>
							<li>Prevent abuse and protect the platform&apos;s integrity</li>
						</ul>
						<p className="mt-3">We do not sell, rent, or trade your data with third parties for commercial purposes.</p>
					</Section>

					<Section title="3. Cookies & Local Storage">
						<p>UIXplor uses a small number of cookies and browser storage mechanisms:</p>
						<div className="mt-3 space-y-3">
							{[
								{ name: 'Analytics cookies', desc: 'Set by our analytics provider to track aggregate page views and navigation paths. No personal identity is stored.' },
								{ name: 'Preference storage', desc: 'Browser localStorage may store theme or UI preferences you set on the site.' },
								{ name: 'Session cookies', desc: 'Temporary session identifiers that expire when you close your browser.' },
							].map(c => (
								<div key={c.name} className="p-3 rounded-lg bg-white/3 border border-white/6">
									<p className="text-white/70 font-semibold text-sm mb-0.5">{c.name}</p>
									<p className="text-xs text-white/45">{c.desc}</p>
								</div>
							))}
						</div>
						<p className="mt-3">You can disable cookies in your browser settings. Most site functionality will remain available.</p>
					</Section>

					<Section title="4. Third-Party Services">
						<p>We may use the following third-party services, each with their own privacy policies:</p>
						<div className="mt-3 space-y-2">
							{[
								{ name: 'Vercel', role: 'Hosting & CDN', link: 'https://vercel.com/legal/privacy-policy' },
								{ name: 'Google Analytics / Plausible', role: 'Anonymous usage analytics', link: 'https://policies.google.com/privacy' },
								{ name: 'Google Fonts', role: 'Typography delivery via CDN', link: 'https://policies.google.com/privacy' },
							].map(s => (
								<div key={s.name} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/6">
									<div>
										<p className="text-white/70 font-semibold text-sm">{s.name}</p>
										<p className="text-xs text-white/40">{s.role}</p>
									</div>
									<a href={s.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#B8FB3C] hover:underline">Policy ↗</a>
								</div>
							))}
						</div>
					</Section>

					<Section title="5. Data Protection">
						<p>We take reasonable technical measures to protect data processed through UIXplor:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>All traffic is served over HTTPS with modern TLS encryption</li>
							<li>Security headers (X-Frame-Options, Content-Security-Policy) are applied at CDN level</li>
							<li>No user databases are stored — UIXplor is a static site with no backend server</li>
							<li>Third-party services are evaluated for their own security postures</li>
						</ul>
					</Section>

					<Section title="6. Your Rights">
						<p>Depending on your location, you may have the following rights regarding your data:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li><strong className="text-white/70">Right to access</strong> — Request what data we hold about you</li>
							<li><strong className="text-white/70">Right to erasure</strong> — Request deletion of your data</li>
							<li><strong className="text-white/70">Right to opt-out</strong> — Disable analytics via your browser&apos;s &quot;Do Not Track&quot; settings</li>
							<li><strong className="text-white/70">Right to object</strong> — Object to data processing for specific purposes</li>
						</ul>
						<p className="mt-3">To exercise any of these rights, contact us at the address below.</p>
					</Section>

					<Section title="7. Changes to This Policy">
						<p>We may update this Privacy Policy from time to time. Changes will be reflected on this page with an updated &quot;Last updated&quot; date. We encourage you to review this page periodically.</p>
					</Section>

					<Section title="8. Contact">
						<p>If you have any questions or concerns about this Privacy Policy, please reach out:</p>
						<div className="mt-3 p-4 rounded-xl bg-white/3 border border-white/6">
							<p className="text-white/70 font-semibold text-sm">UIXplor Team</p>
							<p className="text-sm text-[#B8FB3C] mt-1">hello@uixplor.com</p>
							<p className="text-xs text-white/35 mt-1">We aim to respond within 3–5 business days.</p>
						</div>
					</Section>

				</div>
			</main>
		</>
	);
}
