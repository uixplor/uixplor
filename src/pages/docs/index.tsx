import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageSEO from '@/components/seo/PageSEO';
import { PinGate } from '@/components/ui/PinGate';

const PIN = '2025';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const NAV = [
  { id: 'overview', label: '01 · Overview', icon: '◈' },
  { id: 'stack', label: '02 · Tech Stack', icon: '⚙' },
  { id: 'structure', label: '03 · Project Tree', icon: '🌲' },
  { id: 'pages', label: '04 · Pages & Routes', icon: '📄' },
  { id: 'data', label: '05 · Data System', icon: '🗄' },
  { id: 'components', label: '06 · Components', icon: '🧩' },
  { id: 'flow', label: '07 · Request Flow', icon: '🔄' },
  { id: 'security', label: '08 · Security', icon: '🔒' },
  { id: 'deploy', label: '09 · Build & Deploy', icon: '🚀' },
  { id: 'howto', label: '10 · How To Guide', icon: '📖' },
];

/* ─────────────────────────────────────────────
   SECTION CONTENT COMPONENTS
───────────────────────────────────────────── */

function SectionHeader({ icon, label, accent }: { icon: string; label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-8 pb-5 border-b border-white/8">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white">{label}</h2>
    </div>
  );
}

function Tag({ children, color = '#B8FB3C' }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-bold font-mono" style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}>
      {children}
    </span>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-4 rounded-xl bg-white/3 border border-white/7 ${className}`}>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-white/4 last:border-0">
      <span className="text-xs text-white/35 min-w-[130px] shrink-0">{label}</span>
      <span className="text-xs text-white/75 font-mono">{value}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: OVERVIEW
───────────────────────────────────────────── */
function Overview() {
  return (
    <div>
      <SectionHeader icon="◈" label="Project Overview" accent="#6C63FF" />
      <p className="text-white/55 text-sm leading-7 mb-6">
        <strong className="text-white">UIXplor</strong> is a premium CSS component library and UI inspiration platform. It ships as a <strong className="text-white">100% static website</strong> built with Next.js 16 (Pages Router) and deployed on Vercel. There is no backend, no database, and no API server — all content is baked into JSON files at build time and served as pre-rendered HTML.
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {[
          { k: 'Purpose', v: 'CSS snippet library + UI component playground for developers' },
          { k: 'Architecture', v: 'Static site (SSG) — fully pre-rendered, no server-side runtime' },
          { k: 'Deployment', v: 'Vercel CDN — auto-deploys on every push to main branch' },
          { k: 'Data Layer', v: 'JSON files under /data/ — no database, no CMS, no API calls' },
          { k: 'Auth / PIN', v: 'Internal pages use localStorage PIN gate (not real authentication)' },
          { k: 'Live URL', v: 'uixplor.com' },
        ].map(r => (
          <Card key={r.k}>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">{r.k}</p>
            <p className="text-xs text-white/70">{r.v}</p>
          </Card>
        ))}
      </div>
      <Card className="bg-amber-500/5 border-amber-500/20">
        <p className="text-xs text-amber-300 font-semibold mb-1">⚡ Key  Point</p>
        <p className="text-xs text-white/55 leading-6">
          Because <code className="text-amber-300 font-mono">output: &quot;export&quot;</code> is set in next.config.ts, the entire app compiles to a static <code className="text-amber-300 font-mono">/out</code> folder of HTML + JS + CSS files. Vercel serves these directly from a CDN with zero Node.js on the server. This means <strong className="text-white">getServerSideProps is not available</strong> — only <code className="text-amber-300 font-mono">getStaticProps</code> and <code className="text-amber-300 font-mono">getStaticPaths</code>.
        </p>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: TECH STACK
───────────────────────────────────────────── */
function Stack() {
  const deps = [
    { name: 'Next.js 16', role: 'Framework', desc: 'Pages Router, SSG, file-based routing', color: '#ffffff' },
    { name: 'React 19', role: 'UI Runtime', desc: 'Latest concurrent features, React 19 APIs', color: '#61dafb' },
    { name: 'TypeScript 5', role: 'Language', desc: 'Strict typing, path aliases via tsconfig', color: '#3178c6' },
    { name: 'Tailwind CSS v4', role: 'Styling', desc: 'Utility-first, PostCSS pipeline, no config file needed', color: '#38bdf8' },
    { name: 'Framer Motion (motion/react)', role: 'Animations', desc: 'Page transitions, scroll animations, AnimatePresence', color: '#bb86fc' },
    { name: '@monaco-editor/react', role: 'Code Editor', desc: 'VS Code-grade editor inside the Playground page', color: '#0098ff' },
    { name: '@codesandbox/sandpack-react', role: 'Live Preview', desc: 'In-browser code runner for the Playground', color: '#f0a500' },
    { name: '@vercel/analytics', role: 'Analytics', desc: 'Privacy-safe page view tracking via Vercel', color: '#B8FB3C' },
    { name: 'lucide-react', role: 'Icons', desc: 'SVG icon set used across UI', color: '#e2e8f0' },
    { name: 'next-sitemap', role: 'SEO', desc: 'Auto-generates sitemap.xml post build', color: '#34d399' },
    { name: 'firebase', role: 'Unused/Dormant', desc: 'Dependency present but not active in current build', color: '#f97316' },
  ];
  return (
    <div>
      <SectionHeader icon="⚙" label="Tech Stack" accent="#38bdf8" />
      <div className="grid sm:grid-cols-2 gap-2">
        {deps.map(d => (
          <div key={d.name} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/6">
            <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: d.color }} />
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-bold text-white">{d.name}</span>
                <Tag color={d.color}>{d.role}</Tag>
              </div>
              <p className="text-xs text-white/40">{d.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: PROJECT TREE
───────────────────────────────────────────── */
function Structure() {
  const tree = `uixplor/
├── data/                         ← All content JSON (no DB)
│   ├── blog.json                   26 blog posts (slug, sections[], tags)
│   ├── buttons.json                40 CSS button variants
│   ├── shadows.json                33+ box-shadow tokens
│   ├── glass-effects.json          15+ glassmorphism styles
│   ├── gradients.json              40+ gradient definitions
│   ├── hover-effects.json          20+ hover animations
│   ├── inputs.json                 20+ input styles
│   ├── loaders.json                30+ CSS loader animations
│   └── microinteractions.json      15+ micro-interaction snippets
│
├── src/
│   ├── pages/                    ← Next.js file-based routing
│   │   ├── _app.tsx                Global layout wrapper
│   │   ├── _document.tsx           Custom <html>, fonts, meta
│   │   ├── index.tsx               → /  (redirects to Home/)
│   │   ├── Home/
│   │   │   └── home.tsx            → /  Hero + grid + blog strip
│   │   ├── collections/
│   │   │   ├── index.tsx           → /collections  Category grid
│   │   │   ├── buttons.tsx         → /collections/buttons
│   │   │   ├── box-shadows.tsx     → /collections/box-shadows
│   │   │   ├── cards.tsx           → /collections/cards
│   │   │   ├── glass-effects.tsx   → /collections/glass-effects
│   │   │   ├── gradients.tsx       → /collections/gradients
│   │   │   ├── hover-effects.tsx   → /collections/hover-effects
│   │   │   ├── inputs.tsx          → /collections/inputs
│   │   │   ├── loaders.tsx         → /collections/loaders
│   │   │   ├── microinteractions.tsx
│   │   │   ├── text-animations.tsx
│   │   │   ├── dark-mode.tsx
│   │   │   ├── dashboard.tsx
│   │   │   ├── feedback.tsx
│   │   │   ├── forms-advanced.tsx
│   │   │   ├── layouts.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── ui-tokens.tsx
│   │   ├── blog/
│   │   │   ├── index.tsx           → /blog  Featured + tag filter
│   │   │   └── [slug].tsx          → /blog/:slug  Dynamic article
│   │   ├── playground/
│   │   │   └── index.tsx           → /playground  Monaco + Sandpack
│   │   ├── builder/
│   │   │   └── index.tsx           → /builder  Visual CSS builder
│   │   ├── toolkit/
│   │   │   └── index.tsx           → /toolkit  Dev utilities
│   │   ├── trends/
│   │   │   └── index.tsx           → /trends
│   │   ├── animations/
│   │   │   └── index.tsx           → /animations
│   │   ├── microinteractions/
│   │   │   └── index.tsx           → /microinteractions
│   │   ├── component/              → /component/:id (detail pages)
│   │   ├── admin/                  → /admin (protected)
│   │   ├── docs/
│   │   │   └── index.tsx           → /docs  ← YOU ARE HERE (PIN locked)
│   │   ├── docs.tsx                (fallback, also PIN locked)
│   │   ├── seo-docs.tsx            → /seo-docs (PIN locked)
│   │   ├── about.tsx, contact.tsx, etc.
│   │   └── 400.tsx, 403.tsx, 404.tsx, 500.tsx
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── header/             Navigation bar
│   │   │   └── footer/             Footer
│   │   ├── ui/
│   │   │   ├── CodeViewerOverlay   Monaco-based code viewer
│   │   │   ├── PinGate.tsx         PIN protection wrapper
│   │   │   ├── AnimatedButton.tsx
│   │   │   ├── GlowGrid.tsx
│   │   │   └── PageBackground.tsx
│   │   ├── blog/                   Blog card, article renderer
│   │   ├── collections/            Component card, preview
│   │   ├── homepage/               Hero, feature sections
│   │   ├── seo/
│   │   │   └── PageSEO.tsx         Unified SEO head component
│   │   └── icons/
│   │
│   ├── hooks/
│   │   └── usePinLock.ts           PIN logic + lockout logic
│   │
│   └── styles/                     Global CSS (index.css)
│
├── public/
│   ├── sitemap.xml                 55+ URLs for SEO
│   ├── robots.txt                  Blocks /admin, /docs, /seo-docs
│   └── (fonts, icons, images)
│
├── next.config.ts                  output: "export", images unoptimized
├── vercel.json                     Security headers + 302 redirects
├── tsconfig.json                   Path alias @/ → src/
└── package.json                    Scripts + dependencies`;

  return (
    <div>
      <SectionHeader icon="🌲" label="Full Project Tree" accent="#34d399" />
      <p className="text-white/45 text-xs mb-4">Every file and directory in the project, annotated with its purpose.</p>
      <div className="rounded-xl overflow-hidden border border-white/8">
        <div className="px-4 py-2 bg-white/4 border-b border-white/8 flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <span className="text-[10px] text-white/30 font-mono ml-2">uixplor/</span>
        </div>
        <pre className="p-4 overflow-x-auto text-[11px] leading-6 font-mono text-white/60 bg-[#0a0a0f]">
          {tree}
        </pre>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: PAGES & ROUTES
───────────────────────────────────────────── */
function Pages() {
  const routes = [
    { path: '/', file: 'pages/Home/home.tsx', type: 'Static', desc: 'Hero banner, collection preview cards, blog post strip, feature highlights' },
    { path: '/collections', file: 'pages/collections/index.tsx', type: 'Static', desc: 'Grid of all 18 collection categories with icons and counts' },
    { path: '/collections/buttons', file: 'pages/collections/buttons.tsx', type: 'Static', desc: 'Reads buttons.json → renders 40 CSS button previews with copy + code viewer' },
    { path: '/collections/box-shadows', file: 'pages/collections/box-shadows.tsx', type: 'Static', desc: 'Renders 33+ shadow tokens with live preview boxes' },
    { path: '/collections/[*]', file: 'pages/collections/*.tsx', type: 'Static', desc: '15 more collection pages (cards, glass, gradients, inputs, loaders, etc.)' },
    { path: '/blog', file: 'pages/blog/index.tsx', type: 'Static', desc: 'Featured post hero + tag filter pills + AnimatePresence grid of post cards' },
    { path: '/blog/[slug]', file: 'pages/blog/[slug].tsx', type: 'SSG (getStaticPaths)', desc: 'Dynamic — 26 routes generated at build time from blog.json slugs. Sticky ToC, IntersectionObserver for heading tracking, Article JSON-LD schema' },
    { path: '/playground', file: 'pages/playground/index.tsx', type: 'Static (CSR)', desc: 'Monaco editor left + Sandpack live iframe right. Runs entirely in browser' },
    { path: '/builder', file: 'pages/builder/index.tsx', type: 'Static (CSR)', desc: 'Visual CSS gradient/shadow builder with live preview' },
    { path: '/toolkit', file: 'pages/toolkit/index.tsx', type: 'Static (CSR)', desc: 'Dev tools: color converter, contrast checker, unit converter, etc.' },
    { path: '/trends', file: 'pages/trends/index.tsx', type: 'Static', desc: 'Trending CSS patterns and UI inspirations' },
    { path: '/about', file: 'pages/about.tsx', type: 'Static', desc: 'Project mission, team info, tech stack visual' },
    { path: '/docs', file: 'pages/docs/index.tsx', type: 'Static + PinGate', desc: 'Internal developer reference — this page. PIN: 2025' },
    { path: '/seo-docs', file: 'pages/seo-docs.tsx', type: 'Static + PinGate', desc: 'SEO audit sheet, page scores, meta review. Noindexed.' },
    { path: '/admin', file: 'pages/admin/', type: 'Static + protected', desc: 'Admin dashboard — protected, noindexed' },
    { path: '/404', file: 'pages/404.tsx', type: 'Static', desc: 'Custom 404 error page with navigation' },
  ];
  const typeColor: Record<string, string> = {
    'Static': '#34d399',
    'Static + PinGate': '#fbbf24',
    'Static (CSR)': '#38bdf8',
    'SSG (getStaticPaths)': '#a78bfa',
    'Static + protected': '#f87171',
  };
  return (
    <div>
      <SectionHeader icon="📄" label="Pages & Routes" accent="#34d399" />
      <p className="text-white/45 text-xs mb-4">All routes are statically generated at build time. No SSR or API routes exist.</p>
      <div className="space-y-1.5">
        {routes.map(r => (
          <div key={r.path} className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5">
            <code className="text-[#B8FB3C] font-mono text-xs min-w-[200px] shrink-0 pt-0.5">{r.path}</code>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <code className="text-[10px] font-mono text-white/30">{r.file}</code>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: `${typeColor[r.type] || '#888'}20`, color: typeColor[r.type] || '#888' }}>{r.type}</span>
              </div>
              <p className="text-xs text-white/45">{r.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: DATA SYSTEM
───────────────────────────────────────────── */
function DataSystem() {
  const files = [
    { file: 'data/blog.json', size: '~96 KB', count: '26 posts', shape: 'slug, title, excerpt, tags[], category, readingTime, publishedAt, sections[{heading, level, body}]' },
    { file: 'data/buttons.json', size: '~33 KB', count: '40 items', shape: 'id, name, category, css (full CSS string with .class-name {…})' },
    { file: 'data/shadows.json', size: '~19 KB', count: '33+ items', shape: 'id, name, value (box-shadow value), category, preview color' },
    { file: 'data/glass-effects.json', size: '~10 KB', count: '15+ items', shape: 'id, name, css, previewBg' },
    { file: 'data/gradients.json', size: '~8 KB', count: '40+ items', shape: 'id, name, value (CSS gradient string), tags[]' },
    { file: 'data/hover-effects.json', size: '~7 KB', count: '20+ items', shape: 'id, name, css (keyframe + class), label' },
    { file: 'data/inputs.json', size: '~13 KB', count: '20+ items', shape: 'id, name, htmlSnippet, css' },
    { file: 'data/loaders.json', size: '~11 KB', count: '30+ items', shape: 'id, name, html, css' },
    { file: 'data/microinteractions.json', size: '~10 KB', count: '15+ items', shape: 'id, name, css, html' },
  ];
  return (
    <div>
      <SectionHeader icon="🗄" label="Data System — JSON as a Database" accent="#fbbf24" />
      <Card className="bg-[#B8FB3C]/4 border-[#B8FB3C]/15 mb-6">
        <p className="text-xs text-[#B8FB3C] font-semibold mb-1">How it works</p>
        <p className="text-xs text-white/55 leading-6">
          UIXplor has <strong className="text-white">no database</strong>. All content is stored in JSON files under <code className="text-[#B8FB3C] font-mono">/data/</code>. At build time, Next.js imports these JSON files directly into page components using <code className="text-[#B8FB3C] font-mono">import data from &apos;../../data/buttons.json&apos;</code>. The data gets bundled into the static HTML output. Adding a new component means adding a JSON object to the correct file — no migrations, no API calls, no deployments required beyond a git push.
        </p>
      </Card>
      <div className="space-y-2">
        {files.map(f => (
          <div key={f.file} className="p-3 rounded-xl bg-white/2 border border-white/5">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <code className="text-[#B8FB3C] font-mono text-xs font-bold">{f.file}</code>
              <Tag color="#fbbf24">{f.count}</Tag>
              <Tag color="#888">{f.size}</Tag>
            </div>
            <p className="text-[11px] text-white/40 font-mono">{f.shape}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: COMPONENTS
───────────────────────────────────────────── */
function Components() {
  const comps = [
    { name: 'PageSEO', path: 'components/seo/PageSEO.tsx', desc: 'Renders <title>, <meta description>, canonical URL, Open Graph tags, Twitter card, JSON-LD structured data, and noindex control. Used on every single page.' },
    { name: 'PinGate', path: 'components/ui/PinGate.tsx', desc: 'A wrapper component that renders a PIN entry form until the correct PIN is entered. Uses usePinLock hook for lockout logic. Persists unlock state in component memory (not localStorage) so it resets on page refresh.' },
    { name: 'CodeViewerOverlay', path: 'components/ui/CodeViewerOverlay.tsx', desc: 'Full-screen overlay triggered when "View Code" is clicked on a component card. Uses Monaco editor to display HTML/CSS with syntax highlighting. Also supports multi-framework tabs (HTML, React, Vue).' },
    { name: 'AnimatedButton', path: 'components/ui/AnimatedButton.tsx', desc: 'Reusable button with motion/react hover and tap animations. Wraps children with a spring-animated scale effect.' },
    { name: 'GlowGrid', path: 'components/ui/GlowGrid.tsx', desc: 'Background decorative grid with animated glow spots. Used on hero sections for visual depth.' },
    { name: 'PageBackground', path: 'components/ui/PageBackground.tsx', desc: 'Renders the dark radial gradient + subtle dot-grid background pattern used consistently across internal pages.' },
    { name: 'Header', path: 'components/common/header/', desc: 'Main navigation bar. Contains logo, nav groups with dropdowns, mobile menu. navGroups array drives the menu structure — add a route here to have it appear in nav.' },
    { name: 'Footer', path: 'components/common/footer/', desc: 'Site footer with links, social icons, and copyright.' },
  ];
  return (
    <div>
      <SectionHeader icon="🧩" label="Component Library" accent="#a78bfa" />
      <div className="space-y-3">
        {comps.map(c => (
          <Card key={c.name}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-white">{c.name}</span>
              <code className="text-[10px] font-mono text-white/30">{c.path}</code>
            </div>
            <p className="text-xs text-white/50 leading-5">{c.desc}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-xl bg-white/2 border border-white/6">
        <p className="text-xs font-bold text-white mb-2">Custom Hook: <code className="text-[#B8FB3C] font-mono">usePinLock</code></p>
        <p className="text-xs text-white/45 leading-5">Located at <code className="font-mono text-white/60">src/hooks/usePinLock.ts</code>. Manages PIN entry state, failed attempt counting, and progressive lockout: 5 fails → 30s lockout, 8 fails → 5min lockout, 12 fails → 30min lockout. Lockout state is persisted in <code className="font-mono text-white/60">localStorage</code> under a key you pass in (e.g. <code className="font-mono text-[#B8FB3C]">uixplor__docs_lock</code>).</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: REQUEST FLOW
───────────────────────────────────────────── */
function Flow() {
  const steps = [
    { n: '1', title: 'User visits uixplor.com/collections/buttons', color: '#6C63FF', desc: 'Browser makes a request to Vercel CDN.' },
    { n: '2', title: 'Vercel serves pre-built static HTML', color: '#38bdf8', desc: 'No server-side processing. Vercel reads /out/collections/buttons.html from CDN edge. Security headers from vercel.json are added to the response.' },
    { n: '3', title: 'React hydrates in the browser', color: '#a78bfa', desc: 'The static HTML becomes interactive. React attaches event listeners. Framer Motion runs entrance animations.' },
    { n: '4', title: 'User clicks "View Code" on a button', color: '#fbbf24', desc: 'CodeViewerOverlay component mounts. The component\'s CSS string (already bundled from buttons.json at build time) is passed as a prop to Monaco editor.' },
    { n: '5', title: 'Monaco renders the code', color: '#34d399', desc: 'No API call needed. The code was already in the JavaScript bundle. Monaco syntax-highlights it client-side.' },
    { n: '6', title: 'User copies the CSS', color: '#B8FB3C', desc: 'navigator.clipboard.writeText() copies the CSS string. A toast notification confirms the copy.' },
  ];
  const blogSteps = [
    { n: 'Build', title: 'next build runs', desc: 'blog/[slug].tsx calls getStaticPaths → reads blog.json → returns all 26 slugs. getStaticProps runs for each slug → reads the matching post → returns it as props.' },
    { n: 'Output', title: '26 HTML files generated', desc: 'Each blog post becomes an individual .html file in /out/blog/. Zero runtime needed.' },
    { n: 'Visit', title: '/blog/css-glassmorphism-guide', desc: 'Vercel serves the pre-built HTML. The sticky ToC and IntersectionObserver for heading tracking are pure client-side JavaScript.' },
  ];
  return (
    <div>
      <SectionHeader icon="🔄" label="Request & Data Flow" accent="#6C63FF" />
      <p className="text-white/45 text-xs mb-4 font-semibold uppercase tracking-widest">Component Page Flow</p>
      <div className="space-y-2 mb-8">
        {steps.map(s => (
          <div key={s.n} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/2 border border-white/5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}>{s.n}</div>
            <div>
              <p className="text-sm font-semibold text-white/80 mb-0.5">{s.title}</p>
              <p className="text-xs text-white/40">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-white/45 text-xs mb-4 font-semibold uppercase tracking-widest">Blog Post Static Generation Flow</p>
      <div className="space-y-2">
        {blogSteps.map(s => (
          <div key={s.n} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/2 border border-white/5">
            <Tag color="#a78bfa">{s.n}</Tag>
            <div>
              <p className="text-sm font-semibold text-white/80 mb-0.5">{s.title}</p>
              <p className="text-xs text-white/40">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: SECURITY
───────────────────────────────────────────── */
function Security() {
  return (
    <div>
      <SectionHeader icon="🔒" label="Security Architecture" accent="#f87171" />
      <Card className="border-red-500/20 bg-red-500/4 mb-4">
        <p className="text-xs text-red-400 font-semibold mb-1">⚠ Important Distinction</p>
        <p className="text-xs text-white/55 leading-5">PinGate is <strong className="text-white">UI-level access control, not server-level auth</strong>. The HTML content of protected pages is still in the bundle — PinGate just conditionally renders it based on a React state. This is appropriate for internal team tools, not for protecting sensitive user data.</p>
      </Card>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        {[
          { k: 'PinGate', v: 'Wraps /docs and /seo-docs. PIN: 2025. Progressive lockout via localStorage.' },
          { k: 'robots.txt', v: 'Disallows /admin, /docs, /seo-docs from crawlers. Prevents Google indexing.' },
          { k: 'noindex meta', v: '<PageSEO noindex /> adds <meta name="robots" content="noindex"> on internal pages.' },
          { k: 'vercel.json headers', v: 'X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin.' },
          { k: 'vercel.json redirects', v: 'Known attack vectors (/phpmyadmin, /.git, /wp-admin, /xmlrpc.php) redirect to /404.' },
          { k: 'No secrets in client', v: 'No API keys, no env vars exposed — the app is fully static with no sensitive server logic.' },
        ].map(r => (
          <Card key={r.k}>
            <p className="text-xs font-bold text-white mb-1">{r.k}</p>
            <p className="text-xs text-white/45">{r.v}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: BUILD & DEPLOY
───────────────────────────────────────────── */
function Deploy() {
  return (
    <div>
      <SectionHeader icon="🚀" label="Build & Deploy Pipeline" accent="#B8FB3C" />
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Commands</p>
          <div className="rounded-xl overflow-hidden border border-white/8 font-mono text-xs">
            {[
              { cmd: 'npm run dev', note: '→ localhost:3000 (dev server, hot reload)' },
              { cmd: 'npm run build', note: '→ Runs next build + next-sitemap postbuild' },
              { cmd: 'npm run lint', note: '→ ESLint across all src/** files' },
            ].map(r => (
              <div key={r.cmd} className="px-4 py-2.5 border-b border-white/5 last:border-0">
                <p className="text-[#B8FB3C]">{r.cmd}</p>
                <p className="text-white/30 text-[10px] mt-0.5">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Build Output</p>
          <Card>
            <Row label="Output dir" value="/out/" />
            <Row label="Format" value="Static HTML + JS + CSS" />
            <Row label="Blog routes" value="26 pre-rendered /blog/:slug pages" />
            <Row label="Total pages" value="~55+ HTML files" />
            <Row label="Sitemap" value="auto-generated by next-sitemap" />
          </Card>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-white/3 border border-white/6">
        <p className="text-sm font-bold text-white mb-3">Git Branching Workflow</p>
        <div className="space-y-2">
          {[
            { b: 'main', c: 'Production — every push auto-deploys to uixplor.com via Vercel' },
            { b: 'newfeatures-testing', c: 'Development branch — push here to get Vercel preview URLs' },
          ].map(r => (
            <div key={r.b} className="flex items-start gap-3">
              <code className="text-[#B8FB3C] font-mono text-xs min-w-[160px]">{r.b}</code>
              <p className="text-xs text-white/45">{r.c}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION: HOW-TO GUIDE
───────────────────────────────────────────── */
function HowTo() {
  const guides = [
    {
      title: '➕ Add a New CSS Component',
      color: '#B8FB3C',
      steps: [
        'Open the relevant JSON file (e.g. data/buttons.json)',
        'Add a new object: { "id": "unique-id", "name": "Button Name", "category": "gradient", "css": ".my-btn { ... }" }',
        'Save the file — the collection page auto-renders it from the JSON array',
        'Run npm run dev to verify preview appears correctly',
        'Commit and push to trigger Vercel deploy',
      ],
    },
    {
      title: '📝 Add a New Blog Post',
      color: '#a78bfa',
      steps: [
        'Open data/blog.json and add a new object at the start of the array',
        'Required fields: slug (unique, hyphenated), title, excerpt, tags[], category, readingTime, publishedAt',
        'Add sections[] array: each section has heading, level (1 or 2), and body (plain text + **bold** + ```code```)',
        'Run npm run build (getStaticPaths reads blog.json to pre-render routes)',
        'Update public/sitemap.xml with the new /blog/your-slug URL',
      ],
    },
    {
      title: '🗂 Add a New Collection Category',
      color: '#38bdf8',
      steps: [
        'Create src/pages/collections/my-category.tsx',
        'Import your data JSON or define components inline (see glass-effects.tsx for inline example)',
        'Add <PageSEO title="..." description="..." path="/collections/my-category" />',
        'Add the category card to src/pages/collections/index.tsx',
        'Add nav link in src/components/common/header/header.tsx → navGroups',
        'Update public/sitemap.xml with the new route',
      ],
    },
    {
      title: '🔧 Add a New Developer Tool',
      color: '#fbbf24',
      steps: [
        'Open src/pages/toolkit/index.tsx',
        'Create a new function component inside the file (e.g. function ColorConverter() { ... })',
        'Add { id: "color-converter", label: "Color Converter", icon: "🎨", desc: "..." } to the TOOLS array',
        'Add {active === "color-converter" && <ColorConverter />} in the Tool Panel section',
        'Optionally add a homepage card linking to /toolkit?tool=color-converter',
      ],
    },
    {
      title: '📄 Add a New Standard Page',
      color: '#34d399',
      steps: [
        'Create src/pages/my-page.tsx — Next.js auto-routes it to /my-page',
        'Import PageSEO and add <PageSEO title="..." description="..." path="/my-page" />',
        'Add to navigation: edit navGroups in src/components/common/header/header.tsx',
        'Add to public/sitemap.xml',
        'Add to public/robots.txt if it should be blocked from crawlers',
      ],
    },
  ];
  return (
    <div>
      <SectionHeader icon="📖" label="How-To Guide" accent="#34d399" />
      <div className="space-y-4">
        {guides.map(g => (
          <Card key={g.title}>
            <p className="text-sm font-bold mb-3" style={{ color: g.color }}>{g.title}</p>
            <ol className="space-y-1.5">
              {g.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-white/50">
                  <span className="w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5" style={{ background: `${g.color}18`, color: g.color }}>{i + 1}</span>
                  <span className="leading-5">{s}</span>
                </li>
              ))}
            </ol>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION RENDERER
───────────────────────────────────────────── */
const SECTIONS: Record<string, React.ReactNode> = {
  overview: <Overview />,
  stack: <Stack />,
  structure: <Structure />,
  pages: <Pages />,
  data: <DataSystem />,
  components: <Components />,
  flow: <Flow />,
  security: <Security />,
  deploy: <Deploy />,
  howto: <HowTo />,
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
function DocsContent() {
  const [active, setActive] = useState('overview');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-60 shrink-0 lg:min-h-screen border-r border-white/6 bg-white/1">
        <div className="sticky top-0 p-4 pt-8">
          <div className="mb-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8FB3C] mb-1">UIXplor</p>
            <p className="text-white text-lg font-bold">Developer Docs</p>
            <p className="text-white/30 text-[11px] mt-0.5">doc reference · 2026</p>
          </div>
          <nav className="space-y-0.5">
            {NAV.map(n => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-all"
                style={{
                  background: active === n.id ? 'rgba(184,251,60,0.08)' : 'transparent',
                  color: active === n.id ? '#B8FB3C' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${active === n.id ? 'rgba(184,251,60,0.2)' : 'transparent'}`,
                }}
              >

                <span className="text-base leading-none">{n.icon}</span>
                <span className="font-medium text-xs">{n.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {SECTIONS[active]}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-white/6">
          {NAV.findIndex(n => n.id === active) > 0 ? (
            <button
              onClick={() => setActive(NAV[NAV.findIndex(n => n.id === active) - 1].id)}
              className="text-xs font-semibold text-white/35 hover:text-white transition-colors"
            >
              ← {NAV[NAV.findIndex(n => n.id === active) - 1].label}
            </button>
          ) : <div />}
          {NAV.findIndex(n => n.id === active) < NAV.length - 1 ? (
            <button
              onClick={() => setActive(NAV[NAV.findIndex(n => n.id === active) + 1].id)}
              className="text-xs font-semibold text-[#B8FB3C] hover:opacity-80 transition-opacity"
            >
              {NAV[NAV.findIndex(n => n.id === active) + 1].label} →
            </button>
          ) : (
            <span className="text-xs text-white/20">End of docs ✓</span>
          )}
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────────── */
export default function DocsPage() {
  return (
    <>
      <PageSEO
        title="Developer Docs — UIXplor Internal"
        description="Internal developer reference for UIXplor."
        path="/docs"
        noindex
      />
      <PinGate
        storageKey="uixplor__docs_lock"
        correctPin={PIN}
        title="Developer Docs"
        subtitle="Internal reference. UIXplor team only."
      >
        <DocsContent />
      </PinGate>
    </>
  );
}
