// next-sitemap.config.js
// ─────────────────────────────────────────────────────────────────────────────
// Automatically generates sitemap.xml on every `npm run build`.
//
// HOW TO ADD ROUTES:
//   • New STATIC page → Create file in src/pages/ — auto-discovered.
//   • New blog post   → Add entry to data/blog.json — auto-included below.
//   • New collection  → Add entry to COLLECTION_PAGES array below + create page.
//   • New dynamic section → Add a new block in additionalPaths() below.
//
// NEVER edit public/sitemap.xml or out/sitemap.xml manually.
// They are 100% generated. Source of truth: this file + data/*.json
// ─────────────────────────────────────────────────────────────────────────────

const fs = require('fs');
const path = require('path');

// ─── Data Adapter ─────────────────────────────────────────────────────────────
// ▸ Currently: local JSON file (zero dependencies).
// ▸ Future CMS: swap this function — no other change needed.
//
// async function getBlogPosts() {
//   const res = await fetch('https://your-cms.io/api/posts?fields=slug,date');
//   return (await res.json()).posts;
// }
//
// Future DB adapter:
// async function getBlogPosts() {
//   const rows = await db.query('SELECT slug, updated_at as date FROM posts');
//   return rows;
// }

function getBlogPosts() {
	try {
		const raw = fs.readFileSync(path.join(__dirname, 'data', 'blog.json'), 'utf8');
		return JSON.parse(raw);
	} catch {
		console.warn('[next-sitemap] ⚠ Could not read data/blog.json — blog URLs excluded');
		return [];
	}
}

// ─── Collection Pages ─────────────────────────────────────────────────────────
// Managed here for explicit priority/changefreq control.
// next-sitemap auto-discovers these from out/ BUT we exclude them below and
// re-add them here with our own metadata to avoid duplicates.
const COLLECTION_PAGES = [
	{ path: '/collections/box-shadows', priority: 0.85, changefreq: 'monthly' },
	{ path: '/collections/buttons', priority: 0.85, changefreq: 'monthly' },
	{ path: '/collections/glass-effects', priority: 0.85, changefreq: 'monthly' },
	{ path: '/collections/hover-effects', priority: 0.85, changefreq: 'monthly' },
	{ path: '/collections/loaders', priority: 0.85, changefreq: 'monthly' },
	{ path: '/collections/gradients', priority: 0.85, changefreq: 'monthly' },
	{ path: '/collections/inputs', priority: 0.80, changefreq: 'monthly' },
	{ path: '/collections/text-animations', priority: 0.80, changefreq: 'monthly' },
	{ path: '/collections/microinteractions', priority: 0.80, changefreq: 'monthly' },
	{ path: '/collections/cards', priority: 0.80, changefreq: 'monthly' },
	{ path: '/collections/ui-tokens', priority: 0.75, changefreq: 'monthly' },
	// ▸ New collections: add a line here when you create a new /collections/* page
];

// ─── Static Page Priorities ────────────────────────────────────────────────────
// All other static pages get default 0.7 priority from the `priority` field below.
// Override specific pages with exact URL keys here.
const STATIC_PAGE_META = {
	'https://uixplor.com': { priority: 1.0, changefreq: 'weekly' },
	'https://uixplor.com/collections': { priority: 0.9, changefreq: 'weekly' },
	'https://uixplor.com/blog': { priority: 0.9, changefreq: 'weekly' },
	'https://uixplor.com/about': { priority: 0.6, changefreq: 'monthly' },
	'https://uixplor.com/contact': { priority: 0.4, changefreq: 'monthly' },
	'https://uixplor.com/privacy': { priority: 0.3, changefreq: 'yearly' },
	'https://uixplor.com/terms': { priority: 0.3, changefreq: 'yearly' },
	'https://uixplor.com/disclaimer': { priority: 0.2, changefreq: 'yearly' },
	'https://uixplor.com/cookies': { priority: 0.2, changefreq: 'yearly' },
	'https://uixplor.com/acceptable-use': { priority: 0.2, changefreq: 'yearly' },
};

// ─────────────────────────────────────────────────────────────────────────────
/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://uixplor.com',

	// Must match next.config.ts → output: "export"
	outDir: './out',

	// robots.txt is hand-crafted in public/robots.txt with security Disallow rules.
	// Do NOT let next-sitemap overwrite it.
	generateRobotsTxt: false,

	// Auto-splits into sitemap-0.xml, sitemap-1.xml, etc. when URLs exceed 5000.
	// The sitemap.xml becomes a sitemap index. Zero code changes needed at scale.
	sitemapSize: 5000,

	// Single sitemap.xml output (no sitemap-0.xml index file).
	// If URLs ever exceed 5000, set this to true to auto-split.
	generateIndexSitemap: false,

	// ─── Default values (applied to anything not matching transform) ───────────
	changefreq: 'monthly',
	priority: 0.7,

	// ─── Exclude from auto-discovery ──────────────────────────────────────────
	// We exclude all pages we control via additionalPaths() to prevent duplicates.
	// We also exclude internal, admin, and error pages.
	exclude: [
		// Internal / admin
		'/admin',
		'/admin/*',
		'/seo-docs',
		'/docs',
		'/offline',
		'/Home/home',
		// Error pages
		'/400',
		'/403',
		'/404',
		'/500',
		// All pages managed via additionalPaths (prevents duplicates + ensures correct priorities)
		'/',
		'/blog',
		'/blog/*',
		'/collections',
		'/collections/*',
		'/about',
		'/contact',
		'/privacy',
		'/terms',
		'/disclaimer',
		'/cookies',
		'/acceptable-use',
	],

	// ─── Per-URL transform (fallback only — most pages are via additionalPaths) ───
	transform: async (config, url) => ({
		loc: url,
		lastmod: new Date().toISOString().split('T')[0],
		changefreq: config.changefreq,
		priority: config.priority,
	}),

	// ─── Dynamic Route Injection ───────────────────────────────────────────────
	// Adds blog posts, collection pages, and any future dynamic sections.
	// This is the single place to extend when adding new dynamic routes.
	additionalPaths: async (config) => {
		const today = new Date().toISOString().split('T')[0];
		const results = [];

		// ── 1. Blog posts ─────────────────────────────────────────────────────────
		// Source: data/blog.json (swap getBlogPosts() for CMS/DB as needed)
		const posts = getBlogPosts();
		for (const post of posts) {
			results.push({
				loc: `${config.siteUrl}/blog/${post.slug}`,
				lastmod: post.date || today,
				changefreq: 'monthly',
				priority: 0.75,
			});
		}

		// ── 2. Collection pages ────────────────────────────────────────────────────
		for (const col of COLLECTION_PAGES) {
			results.push({
				loc: `${config.siteUrl}${col.path}`,
				lastmod: today,
				changefreq: col.changefreq,
				priority: col.priority,
			});
		}

		// ── 3. Collection index (explicit high priority) ───────────────────────────
		results.push({
			loc: `${config.siteUrl}/collections`,
			lastmod: today,
			changefreq: 'weekly',
			priority: 0.9,
		});

		// ── 4. Blog index (explicit high priority) ────────────────────────────────
		results.push({
			loc: `${config.siteUrl}/blog`,
			lastmod: today,
			changefreq: 'weekly',
			priority: 0.9,
		});

		// ── 5. Key static pages (explicit priorities) ─────────────────────────────
		const STATIC_PAGES = [
			{ path: '', priority: 1.0, changefreq: 'weekly' },
			{ path: '/about', priority: 0.6, changefreq: 'monthly' },
			{ path: '/contact', priority: 0.4, changefreq: 'monthly' },
			{ path: '/privacy', priority: 0.3, changefreq: 'yearly' },
			{ path: '/terms', priority: 0.3, changefreq: 'yearly' },
			{ path: '/disclaimer', priority: 0.2, changefreq: 'yearly' },
			{ path: '/cookies', priority: 0.2, changefreq: 'yearly' },
			{ path: '/acceptable-use', priority: 0.2, changefreq: 'yearly' },
		];
		for (const page of STATIC_PAGES) {
			results.push({
				loc: `${config.siteUrl}${page.path}`,
				lastmod: today,
				changefreq: page.changefreq,
				priority: page.priority,
			});
		}

		// ── 6. Future dynamic routes ─────────────────────────────────────────────
		// Uncomment + adapt when adding category, tag, or other dynamic pages:
		//
		// const categories = await fetchCategories(); // your data source
		// for (const cat of categories) {
		//   results.push({
		//     loc:        `${config.siteUrl}/blog/category/${cat.slug}`,
		//     lastmod:    cat.updatedAt || today,
		//     changefreq: 'weekly',
		//     priority:   0.7,
		//   });
		// }

		return results;
	},
};
