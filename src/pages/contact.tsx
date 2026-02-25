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

const faqs = [
	{
		q: 'Can I use UIXplor snippets in commercial projects?',
		a: 'Yes, absolutely. All CSS snippets on UIXplor are free for use in both personal and commercial projects. Attribution is appreciated but not required.',
	},
	{
		q: 'Do you take feature requests or content suggestions?',
		a: 'We love hearing from the community. Send your suggestions to hello@uixplor.com and we review all feedback when planning new collections or blog posts.',
	},
	{
		q: 'I found a bug — how do I report it?',
		a: 'Email us at hello@uixplor.com with a description of the issue, the page URL, and your browser/OS. Screenshots are always helpful.',
	},
	{
		q: 'Can I contribute a snippet or article?',
		a: 'We are working on a contribution system. For now, reach out via email with your submission and we will review it for inclusion.',
	},
	{
		q: 'How long does it take to get a response?',
		a: 'We typically respond to all enquiries within 3–5 business days. During busy periods it may take a little longer, but we read every message.',
	},
];

export default function Contact() {
	return (
		<>
			<PageSEO
				title="Contact – UIXplor"
				description="Get in touch with UIXplor — for questions, feedback, collaborations, or bug reports. We'd love to hear from you at uixplor@gmail.com."
				path="/contact"
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
						<p className="text-xs font-semibold uppercase tracking-widest text-[#B8FB3C] mb-3">Get in Touch</p>
						<h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">Contact & Support</h1>
						<p className="text-white/50 text-base sm:text-lg max-w-xl">
							Have a question, found a bug, or just want to say hello? We&apos;d love to hear from you.
						</p>
					</motion.div>

					<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

					{/* Contact cards */}
					<motion.div className="grid sm:grid-cols-3 gap-4 mb-14" {...fadeUp(0.1)}>
						{[
							{
								icon: (
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
								),
								title: 'General Enquiries',
								value: 'hello@uixplor.com',
								desc: 'Feedback, questions, suggestions',
							},
							{
								icon: (
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
								),
								title: 'Bug Reports',
								value: 'hello@uixplor.com',
								desc: 'Include browser, OS & URL',
							},
							{
								icon: (
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
								),
								title: 'Partnerships',
								value: 'hello@uixplor.com',
								desc: 'Collaborations & sponsorships',
							},
						].map(c => (
							<div key={c.title} className="p-5 rounded-2xl bg-white/3 border border-white/6 hover:border-[#B8FB3C]/20 hover:bg-[#B8FB3C]/3 transition-all">
								<div className="w-9 h-9 rounded-xl bg-[#B8FB3C]/10 border border-[#B8FB3C]/20 flex items-center justify-center text-[#B8FB3C] mb-4">
									{c.icon}
								</div>
								<p className="text-sm font-semibold text-white mb-1">{c.title}</p>
								<p className="text-sm text-[#B8FB3C] mb-1">{c.value}</p>
								<p className="text-xs text-white/35">{c.desc}</p>
							</div>
						))}
					</motion.div>

					{/* Response expectations */}
					<motion.div className="mb-14 p-6 rounded-2xl bg-white/3 border border-white/6" {...fadeUp(0.15)}>
						<h2 className="text-lg font-bold text-white mb-4">What to Expect</h2>
						<div className="grid sm:grid-cols-3 gap-4">
							{[
								{ time: '< 24 hrs', label: 'Bug reports', note: 'Critical issues prioritised' },
								{ time: '3–5 days', label: 'General enquiries', note: 'We read every message' },
								{ time: '1–2 weeks', label: 'Content requests', note: 'Reviewed against roadmap' },
							].map(r => (
								<div key={r.label} className="text-center">
									<p className="text-2xl font-bold text-[#B8FB3C] mb-1">{r.time}</p>
									<p className="text-sm font-medium text-white/70">{r.label}</p>
									<p className="text-xs text-white/35 mt-0.5">{r.note}</p>
								</div>
							))}
						</div>
					</motion.div>

					<div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-12" />

					{/* FAQ */}
					<motion.div {...fadeUp(0.2)}>
						<h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
						<div className="space-y-4">
							{faqs.map((faq, i) => (
								<motion.div
									key={faq.q}
									className="p-5 rounded-2xl bg-white/3 border border-white/6 hover:border-white/10 transition-all"
									{...fadeUp(0.05 * i)}
								>
									<p className="text-sm font-semibold text-white mb-2">{faq.q}</p>
									<p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Bottom CTA */}
					<motion.div className="mt-14 text-center p-8 rounded-2xl bg-white/2 border border-white/5" {...fadeUp(0.3)}>
						<p className="text-white/50 text-sm mb-4">Couldn&apos;t find the answer you were looking for?</p>
						<a
							href="mailto:hello@uixplor.com"
							className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B8FB3C] text-[#0a0a0f] font-semibold text-sm hover:shadow-[0_0_24px_rgba(184,251,60,0.25)] transition-all"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
							Email Us Directly
						</a>
					</motion.div>

				</div>
			</main>
		</>
	);
}
