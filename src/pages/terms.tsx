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

export default function Terms() {
	return (
		<>
			<PageSEO
				title="Terms & Conditions – UIXplor"
				description="UIXplor's Terms and Conditions — the rules governing use of our website and CSS UI element library. Please read before using our content."
				path="/terms"
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
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Terms & Conditions</h1>
						<p className="text-white/40 text-sm">Last updated: February 25, 2026 · Governs all use of UIXplor</p>
						<div className="mt-6 p-4 rounded-xl bg-[#B8FB3C]/5 border border-[#B8FB3C]/15">
							<p className="text-sm text-white/60">By using UIXplor, you agree to these Terms & Conditions. Please read them carefully. If you do not agree, please do not use this website.</p>
						</div>
					</motion.div>

					<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

					<Section title="1. Acceptance of Terms">
						<p>By accessing or using UIXplor (&quot;the Website&quot;), you confirm that you are at least 13 years of age and agree to be bound by these Terms & Conditions and our Privacy Policy. These terms apply to all visitors, users, and others who access or use the Website.</p>
					</Section>

					<Section title="2. Use of the Website">
						<p>UIXplor provides a library of CSS snippets, UI components, and educational blog content. You may use this content for:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>Personal and commercial projects</li>
							<li>Learning and educational purposes</li>
							<li>Inspiration and design reference</li>
						</ul>
						<p className="mt-3">You agree not to use the Website for any unlawful purpose or in violation of these Terms.</p>
					</Section>

					<Section title="3. Intellectual Property">
						<p>All content on UIXplor — including but not limited to the website design, code, text, graphics, logos, and UI components — is owned by or licensed to UIXplor.</p>
						<div className="mt-3 p-4 rounded-xl bg-white/3 border border-white/6">
							<p className="text-white/70 font-semibold text-sm mb-2">Code Snippets License</p>
							<p className="text-xs text-white/45">CSS snippets and UI components displayed on UIXplor are provided for free use in both personal and commercial projects. You are not required to attribute UIXplor, but it is appreciated. You may not resell our collections as-is or rebrand them as your own product.</p>
						</div>
						<p className="mt-3">The UIXplor brand, name, logo, and overall website design may not be reproduced, cloned, or repurposed without explicit written permission.</p>
					</Section>

					<Section title="4. User Responsibilities">
						<p>As a user of UIXplor, you agree to:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>Access the site with good faith and legitimate intent</li>
							<li>Not disrupt or interfere with the website&apos;s normal operation</li>
							<li>Not attempt to gain unauthorized access to any part of our infrastructure</li>
							<li>Not use automated tools to mass-download or scrape content without permission</li>
							<li>Respect the intellectual property rights described in Section 3</li>
						</ul>
					</Section>

					<Section title="5. Prohibited Actions">
						<p>The following actions are strictly prohibited:</p>
						<div className="mt-3 grid gap-2">
							{[
								['🚫', 'Scraping or crawling the site with bots for data harvesting'],
								['🚫', 'Reproducing and selling UIXplor content as a competing product'],
								['🚫', 'Attempting to reverse-engineer or clone UIXplor\'s architecture'],
								['🚫', 'Distributing malicious code or exploits through any means'],
								['🚫', 'Using the site to transmit spam, phishing, or fraudulent content'],
								['🚫', 'Attempting to bypass security measures or access restricted pages'],
							].map(([icon, text]) => (
								<div key={text} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
									<span className="text-sm shrink-0 mt-0.5">{icon}</span>
									<p className="text-sm text-white/50">{text}</p>
								</div>
							))}
						</div>
					</Section>

					<Section title="6. Limitation of Liability">
						<p>UIXplor is provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee:</p>
						<ul className="list-disc list-inside space-y-1.5 mt-2 text-white/50">
							<li>That the website will be available 100% of the time</li>
							<li>That code snippets will be error-free or suitable for every use case</li>
							<li>That blog content is always up to date with the latest standards</li>
						</ul>
						<p className="mt-3">To the fullest extent permitted by law, UIXplor and its team shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.</p>
					</Section>

					<Section title="7. External Links">
						<p>UIXplor may contain links to third-party websites. We are not responsible for the content, privacy practices, or reliability of those sites. Linking does not constitute endorsement.</p>
					</Section>

					<Section title="8. Changes to Terms">
						<p>We reserve the right to update these Terms at any time. Changes will be reflected on this page with a new &quot;Last updated&quot; date. Continued use of UIXplor after changes constitutes acceptance of the revised terms.</p>
					</Section>

					<Section title="9. Termination">
						<p>We reserve the right to restrict or terminate access to UIXplor for any user who violates these Terms, without notice or liability. This includes but is not limited to users who engage in abuse, scraping, or any prohibited actions listed above.</p>
					</Section>

					<Section title="10. Governing Law">
						<p>These Terms are governed by and construed in accordance with applicable law. Any disputes arising from use of UIXplor shall be resolved in good faith. For specific legal questions, please consult a qualified attorney.</p>
					</Section>

					<Section title="11. Contact">
						<p>Questions about these Terms? Reach out:</p>
						<div className="mt-3 p-4 rounded-xl bg-white/3 border border-white/6">
							<p className="text-white/70 font-semibold text-sm">UIXplor Team</p>
							<p className="text-sm text-[#B8FB3C] mt-1">hello@uixplor.com</p>
						</div>
					</Section>

				</div>
			</main>
		</>
	);
}
