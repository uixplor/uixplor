'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface CodeSection {
	label: string;
	language: string;
	code: string;
}

interface CodeViewerOverlayProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	/** Single code string (backward-compatible) */
	code?: string;
	/** Multi-section tabs: HTML / CSS / JS */
	sections?: CodeSection[];
	language?: string;
}

/* ── Formatting ── */

function formatCode(raw: string): string[] {
	return raw
		.replace(/;\s*/g, ';\n')
		.replace(/{\s*/g, '{\n')
		.replace(/}\s*/g, '\n}\n')
		.split('\n')
		.filter((l) => l.trim() !== '');
}

/* ── Syntax highlighting ── */

function highlight(line: string, lang: string): React.JSX.Element {
	const t = line.trim();

	// Comments
	if (t.startsWith('/*') || t.startsWith('*') || t.startsWith('//')) {
		return <span className="text-white/30 italic">{line}</span>;
	}

	if (lang === 'html') {
		// Tags
		if (t.startsWith('<')) {
			return (
				<span>
					<span className="text-[#B8FB3C]/70">{'<'}</span>
					<span className="text-[#B8FB3C]">{t.slice(1).replace('>', '')}</span>
					{t.includes('>') && <span className="text-[#B8FB3C]/70">{'>'}</span>}
				</span>
			);
		}
		return <span className="text-white/60">{line}</span>;
	}

	// CSS / JS property: value
	const prop = t.match(/^([\w-]+)\s*:\s*(.+?)(?:;?)$/);
	if (prop) {
		const indent = line.match(/^(\s*)/)?.[0] || '';
		return (
			<span>
				{indent}
				<span className="text-[#B8FB3C]">{prop[1]}</span>
				<span className="text-white/30">: </span>
				<span className="text-[#e2e8f0]">{prop[2]}</span>
				{t.endsWith(';') && <span className="text-white/30">;</span>}
			</span>
		);
	}

	// Selectors / braces
	if (t.endsWith('{') || t === '}') {
		return <span className="text-white/60">{line}</span>;
	}

	return <span className="text-white/50">{line}</span>;
}

/* ── Component ── */

export default function CodeViewerOverlay({
	isOpen,
	onClose,
	title,
	code,
	sections,
	language = 'css',
}: CodeViewerOverlayProps) {
	// Build tabs from either `sections` or the legacy `code` prop
	const tabs: CodeSection[] = sections && sections.length > 0
		? sections
		: code
			? [{ label: language.toUpperCase(), language, code }]
			: [];

	const [activeTab, setActiveTab] = useState(0);
	const [copied, setCopied] = useState(false);
	const codeRef = useRef<HTMLDivElement>(null);

	// Reset tab when overlay opens with new content
	useEffect(() => { setActiveTab(0); }, [title]);

	const currentCode = tabs[activeTab]?.code || '';
	const currentLang = tabs[activeTab]?.language || language;
	const lines = formatCode(currentCode);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(currentCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [currentCode]);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			// Ctrl+A / Cmd+A: select only code content
			if ((e.ctrlKey || e.metaKey) && e.key === 'a' && codeRef.current) {
				e.preventDefault();
				const selection = window.getSelection();
				const range = document.createRange();
				range.selectNodeContents(codeRef.current);
				selection?.removeAllRanges();
				selection?.addRange(range);
			}
		};
		if (isOpen) {
			document.addEventListener('keydown', handleKey);
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.removeEventListener('keydown', handleKey);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						onClick={onClose}
					/>

					{/* Side Panel */}
					<motion.div
						className="fixed top-0 right-0 bottom-0 z-70 w-full sm:w-[520px] md:w-[580px] flex flex-col"
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 320 }}
					>
						<div className="h-full flex flex-col bg-[#0a0a0f] border-l border-white/10 shadow-[-8px_0_40px_rgba(0,0,0,0.6)] select-none">

							{/* ─ Header ─ */}
							<div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
								<div className="flex items-center gap-2.5 min-w-0">
									<div className="w-2 h-2 rounded-full bg-[#B8FB3C] shrink-0" />
									<span className="text-sm font-semibold text-white truncate">{title}</span>
								</div>
								<div className="flex items-center gap-2 shrink-0">
									<button
										onClick={handleCopy}
										className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${copied
											? 'bg-[#B8FB3C] text-[#0a0a0f]'
											: 'bg-[#B8FB3C]/10 text-[#B8FB3C] hover:bg-[#B8FB3C]/20 border border-[#B8FB3C]/20'
											}`}
									>
										{copied ? (
											<>
												<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
												</svg>
												Copied!
											</>
										) : (
											<>
												<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
												</svg>
												Copy
											</>
										)}
									</button>
									<button
										onClick={onClose}
										className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-colors"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							</div>

							{/* ─ Tab Bar ─ */}
							{tabs.length > 1 && (
								<div className="flex gap-1 px-5 pt-3 pb-1">
									{tabs.map((tab, i) => (
										<button
											key={tab.label}
											onClick={() => { setActiveTab(i); setCopied(false); }}
											className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${activeTab === i
												? 'bg-[#B8FB3C] text-[#0a0a0f]'
												: 'bg-white/6 text-white/50 hover:bg-white/10 hover:text-white/70'
												}`}
										>
											{tab.label}
										</button>
									))}
								</div>
							)}

							{/* ─ Code ─ */}
							<div className="flex-1 overflow-auto select-text">
								<div ref={codeRef} className="p-5 font-mono text-[13px] leading-7">
									{lines.map((line, i) => (
										<div key={`${activeTab}-${i}`} className="flex hover:bg-white/3 -mx-5 px-5 rounded">
											<span className="w-8 shrink-0 text-right pr-4 text-white/15 select-none text-xs leading-7">
												{i + 1}
											</span>
											<span className="flex-1 whitespace-pre-wrap break-all">
												{highlight(line, currentLang)}
											</span>
										</div>
									))}
								</div>
							</div>

							{/* ─ Status Bar ─ */}
							<div className="flex items-center justify-between px-5 py-2 border-t border-white/6 text-[10px] text-white/25">
								<div className="flex items-center gap-3">
									<span className="flex items-center gap-1.5">
										<span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]" />
										UIXplor
									</span>
									<span>{currentLang.toUpperCase()}</span>
								</div>
								<div className="flex items-center gap-3">
									<span>{lines.length} lines</span>
									<span>UTF-8</span>
								</div>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
