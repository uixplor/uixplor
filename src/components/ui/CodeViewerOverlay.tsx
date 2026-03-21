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

function monacoLang(lang: string): string {
	if (lang === 'html') return 'html';
	if (lang === 'css') return 'css';
	if (lang === 'tailwind') return 'css';
	if (lang === 'js' || lang === 'javascript') return 'javascript';
	if (lang === 'ts' || lang === 'typescript') return 'typescript';
	return 'css';
}

/* ————————————————————
   Minimal custom syntax highlighter (fallback / SSR)
———————————————————— */
function highlight(line: string, lang: string): React.JSX.Element {
	const t = line.trim();
	if (t.startsWith('/*') || t.startsWith('*') || t.startsWith('//')) {
		return <span style={{ color: '#555577', fontStyle: 'italic' }}>{line}</span>;
	}
	if (lang === 'html') {
		const tagMatch = t.match(/^(<\/?)([a-zA-Z][^\s>]*)([^>]*)(\/?>)(.*)$/);
		if (tagMatch) {
			const [, open, tagName, attrs, close, rest] = tagMatch;
			return (
				<span>
					<span style={{ color: 'rgba(255,255,255,0.35)' }}>{open}</span>
					<span style={{ color: '#B8FB3C' }}>{tagName}</span>
					{attrs && <span style={{ color: '#60a5fa' }}>{attrs}</span>}
					<span style={{ color: 'rgba(255,255,255,0.35)' }}>{close}</span>
					{rest && <span style={{ color: 'rgba(255,255,255,0.6)' }}>{rest}</span>}
				</span>
			);
		}
		return <span style={{ color: 'rgba(255,255,255,0.5)' }}>{line}</span>;
	}
	const prop = t.match(/^([\w-]+)\s*:\s*(.+?)(?:;?)$/);
	if (prop) {
		const indent = line.match(/^(\s*)/)?.[0] || '';
		return (
			<span>
				{indent}
				<span style={{ color: '#B8FB3C' }}>{prop[1]}</span>
				<span style={{ color: 'rgba(255,255,255,0.3)' }}>: </span>
				<span style={{ color: '#e2e8f0' }}>{prop[2]}</span>
				{t.endsWith(';') && <span style={{ color: 'rgba(255,255,255,0.3)' }}>;</span>}
			</span>
		);
	}
	if (t.endsWith('{') || t === '}') return <span style={{ color: '#a5d6ff' }}>{line}</span>;
	if (t.startsWith('@')) return <span style={{ color: '#a78bfa' }}>{line}</span>;
	return <span style={{ color: 'rgba(255,255,255,0.45)' }}>{line}</span>;
}

function formatCode(raw: string): string[] {
	return raw
		.replace(/;(?!\s*\n)/g, ';\n')
		.replace(/\{(?!\s*\n)/g, '{\n')
		.replace(/\}(?!\s*\n)/g, '\n}\n')
		.split('\n')
		.filter((l) => l.trim() !== '');
}

/* ————————————————————
   Monaco loader — loads once, then renders into a container div
———————————————————— */
interface MonacoPaneProps {
	code: string;
	language: string;
	containerId: string;
}

function MonacoPane({ code, language, containerId }: MonacoPaneProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const editorRef = useRef<any>(null);

	useEffect(() => {
		if (!containerRef.current) return;
		let destroyed = false;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const init = async () => {
			// Use the loader from @monaco-editor/react to get the raw Monaco instance
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const { loader } = (await import('@monaco-editor/react')) as any;
			const loader_instance = await loader.init();
			if (destroyed || !containerRef.current) return;

			loader_instance.editor.defineTheme('uixplor-dark', {
				base: 'vs-dark',
				inherit: true,
				rules: [
					{ token: 'comment', foreground: '555577', fontStyle: 'italic' },
					{ token: 'keyword', foreground: 'a78bfa' },
					{ token: 'string', foreground: 'fbbf24' },
					{ token: 'tag', foreground: 'B8FB3C' },
					{ token: 'attribute.name', foreground: '60a5fa' },
					{ token: 'property', foreground: 'B8FB3C' },
				],
				colors: {
					'editor.background': '#08080f',
					'editor.foreground': '#e2e8f0',
					'editor.lineHighlightBackground': '#ffffff08',
					'editorLineNumber.foreground': '#ffffff1a',
					'editorLineNumber.activeForeground': '#B8FB3C55',
					'editor.selectionBackground': '#6C63FF33',
					'editorCursor.foreground': '#B8FB3C',
					'scrollbarSlider.background': '#ffffff10',
				},
			});

			editorRef.current = loader_instance.editor.create(containerRef.current, {
				value: code,
				language: monacoLang(language),
				theme: 'uixplor-dark',
				readOnly: true,
				fontSize: 13,
				fontFamily: '"JetBrains Mono", "Fira Code", monospace',
				lineNumbers: 'on',
				lineNumbersMinChars: 3,
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				wordWrap: 'on',
				padding: { top: 16, bottom: 16 },
				renderLineHighlight: 'line',
				smoothScrolling: true,
				contextmenu: false,
				folding: true,
				glyphMargin: false,
				overviewRulerBorder: false,
				scrollbar: {
					vertical: 'auto',
					horizontal: 'auto',
					verticalScrollbarSize: 6,
					horizontalScrollbarSize: 6,
				},
			});

			const ro = new ResizeObserver(() => editorRef.current?.layout());
			ro.observe(containerRef.current);
			return () => ro.disconnect();
		};

		init().catch(() => {
			// Monaco failed to load — fallback is handled by the parent
		});

		return () => {
			destroyed = true;
			editorRef.current?.dispose();
			editorRef.current = null;
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Update content when tab changes
	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.setValue(code);
			const langId = monacoLang(language);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(window as any).monaco?.editor?.setModelLanguage(editorRef.current.getModel(), langId);
		}
	}, [code, language]);

	return <div ref={containerRef} id={containerId} className="w-full h-full" />;
}

/* ————————————————————
   Main overlay component
———————————————————— */
export default function CodeViewerOverlay({
	isOpen,
	onClose,
	title,
	code,
	sections,
	language = 'css',
}: CodeViewerOverlayProps) {
	const tabs: CodeSection[] = sections && sections.length > 0
		? sections
		: code
			? [{ label: language.toUpperCase(), language, code }]
			: [];

	const [activeTab, setActiveTab] = useState(0);
	const [copied, setCopied] = useState(false);
	const [useMonaco, setUseMonaco] = useState(false);

	useEffect(() => { setActiveTab(0); }, [title]);

	// Try to load Monaco; fall back to custom highlighter if it fails
	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('@monaco-editor/react').then(() => setUseMonaco(true)).catch(() => setUseMonaco(false));
		}
	}, []);

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
						className="fixed top-0 right-0 bottom-0 z-70 w-full sm:w-[560px] md:w-[620px] flex flex-col"
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 320 }}
					>
						<div className="h-full flex flex-col border-l shadow-[-8px_0_40px_rgba(0,0,0,0.7)]"
							style={{ background: '#08080f', borderColor: '#2A2A2A' }}>

							{/* ─ Header ─ */}
							<div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: '#2A2A2A' }}>
								<div className="flex items-center gap-3 min-w-0">
									<div className="flex gap-1.5">
										<div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
										<div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
										<div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
									</div>
									<span className="text-sm font-semibold text-white/80 truncate">{title}</span>
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
											<><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>Copied!</>
										) : (
											<><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
										)}
									</button>
									<button
										onClick={onClose}
										className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-colors"
									>
										<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
									</button>
								</div>
							</div>

							{/* ─ Tab Bar ─ */}
							{tabs.length > 1 && (
								<div className="flex gap-1 px-5 pt-3 pb-1 border-b" style={{ borderColor: '#1a1a2a' }}>
									{tabs.map((tab, i) => (
										<button
											key={tab.label}
											onClick={() => { setActiveTab(i); setCopied(false); }}
											className="px-4 py-1.5 text-xs font-semibold transition-all duration-200"
											style={{
												borderRadius: '8px 8px 0 0',
												background: activeTab === i ? '#111120' : 'transparent',
												color: activeTab === i ? '#B8FB3C' : 'rgba(255,255,255,0.4)',
												borderBottom: activeTab === i ? '2px solid #B8FB3C' : '2px solid transparent',
											}}
										>
											{tab.label}
										</button>
									))}
								</div>
							)}

							{/* ─ Code Area ─ */}
							<div className="flex-1 overflow-hidden relative">
								{/* Custom syntax highlighter (always visible, Monaco overlays when loaded) */}
								{!useMonaco && (
									<div className="absolute inset-0 overflow-auto p-5 font-mono text-[13px] leading-7">
										{lines.map((line, i) => (
											<div key={`${activeTab}-${i}`} className="flex hover:bg-white/2 -mx-5 px-5 rounded">
												<span className="w-8 shrink-0 text-right pr-4 select-none text-xs leading-7" style={{ color: 'rgba(255,255,255,0.15)' }}>
													{i + 1}
												</span>
												<span className="flex-1 whitespace-pre-wrap break-all">
													{highlight(line, currentLang)}
												</span>
											</div>
										))}
									</div>
								)}
								{useMonaco && isOpen && (
									<MonacoPane
										key={`${title}-${activeTab}`}
										code={currentCode}
										language={currentLang}
										containerId={`monaco-${title.replace(/\s/g, '-')}-${activeTab}`}
									/>
								)}
							</div>

							{/* ─ Status Bar ─ */}
							<div className="flex items-center justify-between px-5 py-2 border-t" style={{ borderColor: '#2A2A2A' }}>
								<div className="flex items-center gap-3 text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
									<span className="flex items-center gap-1.5">
										<span className="w-1.5 h-1.5 rounded-full" style={{ background: '#B8FB3C' }} />
										UIXplor
									</span>
									<span className="uppercase">{currentLang}</span>
								</div>
								<div className="flex items-center gap-3 text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
									<span>{useMonaco ? 'Monaco Editor' : 'Code Viewer'}</span>
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
