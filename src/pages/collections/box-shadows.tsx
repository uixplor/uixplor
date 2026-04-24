import PageSEO from "@/components/seo/PageSEO";
import { GlowGrid } from "@/components/ui/GlowGrid";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import shadows from "../../../data/shadows.json";
import CodeViewerOverlay, {
  type CodeSection,
} from "@/components/ui/CodeViewerOverlay";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "token", label: "Tokens" },
  { key: "soft", label: "Soft" },
  { key: "layered", label: "Layered" },
  { key: "deep", label: "Deep" },
  { key: "neumorphic", label: "Neumorphic" },
  { key: "glow", label: "Glow" },
  { key: "inset", label: "Inset" },
  { key: "colored", label: "Colored" },
  { key: "glassmorphism", label: "Glass" },
  { key: "long", label: "Long" },
  { key: "dark", label: "Dark UI" },
  { key: "brutalist", label: "Brutalist" },
  { key: "saas", label: "SaaS" },
  { key: "material", label: "Material" },
  { key: "gradient", label: "Gradient" },
  { key: "ring", label: "Ring" },
];

const JSON_LD_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CSS Box Shadow Copy & Paste — 100 Free Examples",
    description: `Browse ${shadows.length} CSS box shadow examples — soft, glow, neumorphic, colored, glassmorphism & more. One-click copy & paste code. Free shadow presets for any web project.`,
    url: "https://uixplor.com/collections/box-shadows",
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "UIXplor",
      url: "https://uixplor.com",
    },
    dateModified: "2026-03-04",
    author: {
      "@type": "Organization",
      name: "UIXplor",
      url: "https://uixplor.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://uixplor.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Collections",
        item: "https://uixplor.com/collections",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CSS Box Shadows",
        item: "https://uixplor.com/collections/box-shadows",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CSS Box Shadows Collection — UIXplor",
    description: `A curated collection of ${shadows.length} CSS box shadow examples including soft, layered, neumorphic, glow, colored, glassmorphism, brutalist, dark UI, SaaS, material, and gradient shadow illusions — all copy-paste ready.`,
    url: "https://uixplor.com/collections/box-shadows",
    numberOfItems: shadows.length,
    isPartOf: {
      "@type": "WebSite",
      name: "UIXplor",
      url: "https://uixplor.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is CSS box-shadow and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSS box-shadow adds one or more shadow effects around an element's frame using the syntax: box-shadow: offset-x offset-y blur-radius spread-radius color. You can stack multiple shadows by separating them with commas. The inset keyword creates an inner shadow. Box shadows are widely used in web design for depth, elevation, and neumorphic UI effects.",
        },
      },
      {
        "@type": "Question",
        name: "How do I copy and paste a CSS box shadow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'On UIXplor, click the "View Code →" button on any shadow card. The code viewer displays the CSS box-shadow property and its corresponding HTML class. Click the copy button, then paste the CSS directly into your stylesheet. No installation or signup required.',
        },
      },
      {
        "@type": "Question",
        name: "What is a neumorphic box shadow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Neumorphic (or neuomorphic) box shadows simulate a soft extruded plastic look by combining a dark shadow on one side and a light highlight on the opposite side. The typical CSS pattern is: box-shadow: 6px 6px 16px rgba(0,0,0,0.06), -6px -6px 16px rgba(255,255,255,0.8). The element appears to rise out of the background surface.",
        },
      },
      {
        "@type": "Question",
        name: "How do I add box shadow in Tailwind CSS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: 'Tailwind CSS provides built-in box shadow utilities: shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, and shadow-2xl. Apply them as class names on any element, e.g., <div class="shadow-lg">. For custom shadows, use shadow-[value] with arbitrary values or define them in tailwind.config.js under the theme.boxShadow key.',
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between CSS box-shadow and drop-shadow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "box-shadow applies to the element's rectangular bounding box, including its border-radius. The CSS filter drop-shadow() function, by contrast, follows the exact shape of the rendered content — making it ideal for transparent PNGs or irregular shapes like SVGs. box-shadow supports inset shadows and multiple layers; filter drop-shadow does not.",
        },
      },
    ],
  },
];

function buildSections(shadow: (typeof shadows)[number]): CodeSection[] {
  const className = shadow.name.toLowerCase().replace(/\s+/g, "-");
  return [
    {
      label: "HTML",
      language: "html",
      code: `<div class="${className}">\n  <!-- Your content -->\n</div>`,
    },
    {
      label: "CSS",
      language: "css",
      code: `.${className} {\n  ${shadow.css}\n}`,
    },
  ];
}

export default function BoxShadows() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedShadow, setSelectedShadow] = useState<
    (typeof shadows)[number] | null
  >(null);

  const filtered = useMemo(() => {
    let result =
      activeCategory === "all"
        ? shadows
        : shadows.filter((s) => s.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeCategory, search]);

  return (
    <>
      <PageSEO
        title="Box Shadow Copy & Paste – 100 CSS Examples – UIXplor"
        description={`Browse ${shadows.length} CSS box shadow examples — soft, glow, neumorphic, colored, glassmorphism & more. One-click copy & paste code. Free shadow presets for any web project.`}
        path="/collections/box-shadows"
        ogImage="https://uixplor.com/images/og-box-shadows.png"
        keywords={[
          "box shadow copy and paste",
          "css box shadow examples",
          "box shadow generator",
          "tailwind box shadow",
          "css shadow presets",
          "neumorphic shadow",
          "inset box shadow css",
          "drop shadow css",
          "css box shadow code",
          "soft shadow css",
          "glow shadow css",
          "layered box shadow",
          "colored box shadow",
          "glassmorphism shadow",
          "brutalist box shadow",
          "dark ui shadow",
        ]}
        jsonLd={JSON_LD_SCHEMAS}
      />

      <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol
              className="flex items-center gap-2 text-sm text-white/40"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href="/"
                  className="hover:text-[#B8FB3C] transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true">/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link
                  href="/collections"
                  className="hover:text-[#B8FB3C] transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">Collections</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li aria-hidden="true">/</li>
              <li
                className="text-white font-medium"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name">Box Shadows</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <motion.header
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              CSS Box Shadow{" "}
              <span className="text-[#B8FB3C]">Copy & Paste</span>
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-4">
              {shadows.length} handcrafted CSS box shadow presets — soft,
              layered, neumorphic, glow, colored, glassmorphism, brutalist &
              more. Click any card to view and copy the code instantly.
            </p>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-[#B8FB3C] bg-[#B8FB3C]/10 rounded-full border border-[#B8FB3C]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8FB3C]" />
              {shadows.length} free shadows
            </span>
          </motion.header>

          {/* Keyword-rich intro paragraph — SEO content */}
          <section
            aria-label="Introduction"
            className="mb-10 max-w-3xl mx-auto text-center"
          >
            <p className="text-sm sm:text-base text-white/45 leading-relaxed">
              Looking for{" "}
              <strong className="text-white/70">
                CSS box shadow copy and paste
              </strong>{" "}
              code? You&apos;ve found the right place. UIXplor&apos;s free
              shadow library gives you {shadows.length} production-ready{" "}
              <strong className="text-white/70">CSS box shadow examples</strong>{" "}
              across every style — from ultra-subtle soft shadows and
              multi-layer depth effects to bold neumorphic and colored glow
              shadows. Each preset is tested across Chrome, Firefox, and Safari.
              No sign-up, no subscription — open a card, click copy, and paste
              the CSS directly into your project. Compatible with plain CSS,
              SCSS, styled-components, and{" "}
              <strong className="text-white/70">Tailwind CSS</strong> arbitrary
              value syntax.
            </p>
          </section>

          {/* Search */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search shadows…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#B8FB3C]/40 focus:bg-white/7 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div
            className="flex flex-wrap gap-2 mb-10 justify-center"
            role="group"
            aria-label="Filter shadows by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count =
                cat.key === "all"
                  ? shadows.length
                  : shadows.filter((s) => s.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  aria-pressed={isActive}
                  aria-label={`Show ${cat.label} shadows (${count})`}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 min-w-72px ${
                    isActive
                      ? "bg-[#B8FB3C] text-[#0a0a0f]"
                      : "bg-white/4 text-white/60 hover:bg-white/8 hover:text-white border border-white/6"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 text-xs ${isActive ? "text-[#0a0a0f]/60" : "text-white/30"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Shadow Grid */}
          <GlowGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((shadow, index) => {
                const shadowValue = shadow.css
                  .replace("box-shadow: ", "")
                  .replace(";", "");
                return (
                  <motion.article
                    key={shadow.id}
                    layout
                    className="group rounded-2xl overflow-hidden bg-linear-to-b from-white/4 to-black/25 border border-white/6 hover:border-white/12 transition-all duration-300 hover:shadow-[0_4px_12px_rgba(255,255,255,0.06),0_0_0_1px_rgba(255,255,255,0.04)]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    aria-label={`${shadow.name} — ${shadow.category} box shadow`}
                  >
                    {/* Shadow preview */}
                    <div
                      className="p-6 flex items-center justify-center h-32 sm:h-36 bg-white rounded-t-2xl"
                      aria-hidden="true"
                    >
                      <div
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/90"
                        style={{ boxShadow: shadowValue }}
                      />
                    </div>
                    {/* Info bar */}
                    <div className="px-4 py-3 flex items-center justify-between border-t border-white/6">
                      <div className="min-w-0 mr-3">
                        <span className="text-xs font-medium text-white/60 truncate block">
                          {shadow.name}
                        </span>
                        <span className="text-[10px] text-white/25 uppercase tracking-wider">
                          {shadow.category}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedShadow(shadow)}
                        className="relative z-10 shrink-0 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/6 text-white/50 border border-white/8 hover:bg-white hover:text-[#0a0a0f] hover:border-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,255,255,0.18)] transition-all duration-300 cursor-pointer"
                        aria-label={`View and copy CSS code for ${shadow.name} shadow`}
                      >
                        View Code →
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </GlowGrid>

          {filtered.length === 0 && (
            <div className="text-center py-20" role="status">
              <p className="text-white/40 mb-2">No shadows found.</p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-[#B8FB3C] text-sm underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* ── SEO Content Body ──────────────────────────────────── */}
          <article className="mt-20 max-w-3xl mx-auto prose-invert space-y-10">
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                What Is a CSS Box Shadow?
              </h2>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                The CSS{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  box-shadow
                </code>{" "}
                property adds one or more shadow effects around an
                element&apos;s frame. The full syntax is:
              </p>
              <pre className="mt-3 mb-4 bg-white/4 border border-white/8 rounded-xl p-4 text-xs sm:text-sm text-white/70 overflow-x-auto leading-relaxed">
                <code>
                  box-shadow: offset-x offset-y blur-radius spread-radius color;
                </code>
              </pre>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                You can layer multiple shadows by separating them with commas —
                a powerful technique for creating realistic depth and
                multi-colored glow effects. Adding the{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  inset
                </code>{" "}
                keyword makes the shadow appear inside the element rather than
                outside, useful for pressed-button states and sunken inputs.
                Every shadow in UIXplor&apos;s library is a real, tested{" "}
                <strong className="text-white/70">
                  CSS box shadow example
                </strong>{" "}
                you can copy and paste directly into your project.
              </p>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Types of CSS Box Shadows in This Collection
              </h2>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base mb-6">
                This free{" "}
                <strong className="text-white/70">CSS shadow preset</strong>{" "}
                library is categorised by visual style so you can quickly find
                the right shadow for your design system.
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    🌫️ Soft Shadows
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Barely-there shadows that add a whisper of depth without
                    visual weight. Perfect for card UIs, minimalist dashboards,
                    and product landing pages. These shadows use very low
                    opacity values and wide blur radii to create the illusion of
                    floating elements.
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    📦 Layered / Stacked Shadows
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Multi-layer shadows that combine 3–4 separate shadow values
                    at increasing distances. The result looks far more natural
                    and realistic than a single box-shadow because it mimics how
                    light scatters rather than casting a uniform shadow.
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    🪨 Deep Elevation Shadows
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Bold, high-spread shadows that lift elements dramatically
                    off the background — ideal for modals, floating action
                    buttons, tooltips, and hero sections where you need a strong
                    Material Design-style elevation.
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    🧱 Neumorphic Shadows
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    The viral Neumorphism design trend uses dual shadows — a
                    dark shadow on one side and a bright highlight on the other
                    — to simulate elements extruded from a surface. These{" "}
                    <strong className="text-white/70">
                      neumorphic CSS box shadow
                    </strong>{" "}
                    presets are ready to drop into your soft-UI projects.
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    ✨ Glow Shadows
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Colorized, spread-heavy shadows that radiate light from
                    behind an element. Widely used in dark-mode UIs, gaming
                    dashboards, and cyberpunk-style designs. UIXplor includes
                    both monochrome and tinted glow variants.
                  </p>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    🔲 Inset Shadows
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Inner shadows that make an element appear sunken into the
                    page. Applications include pressed button states, text input
                    fields, progress bars, and carved-out containers. Inset
                    shadows are defined by prepending the{" "}
                    <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                      inset
                    </code>{" "}
                    keyword.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                How to Use These Box Shadow Presets
              </h2>
              <ol className="space-y-3 text-white/50 text-sm leading-relaxed list-none">
                <li className="flex gap-3">
                  <span className="text-[#B8FB3C] font-bold shrink-0">01.</span>
                  <span>
                    Browse the shadow grid above and click{" "}
                    <strong className="text-white/70">View Code →</strong> on
                    any card.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#B8FB3C] font-bold shrink-0">02.</span>
                  <span>
                    Copy the CSS tab — it contains the full{" "}
                    <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                      box-shadow
                    </code>{" "}
                    value inside a ready-to-use class.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#B8FB3C] font-bold shrink-0">03.</span>
                  <span>
                    Paste into your CSS file, Tailwind config, or CSS-in-JS
                    theme object.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#B8FB3C] font-bold shrink-0">04.</span>
                  <span>
                    Adjust the color, blur, or spread to match your design
                    tokens.
                  </span>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Tailwind CSS Box Shadow Utilities
              </h2>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base mb-4">
                If you use{" "}
                <strong className="text-white/70">Tailwind CSS</strong>, the
                framework ships with built-in shadow utilities that map directly
                to CSS box shadows. The standard scale is{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  shadow-sm
                </code>
                ,{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  shadow
                </code>
                ,{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  shadow-md
                </code>
                ,{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  shadow-lg
                </code>
                ,{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  shadow-xl
                </code>
                , and{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  shadow-2xl
                </code>
                . For custom values, use arbitrary syntax:
              </p>
              <pre className="bg-white/4 border border-white/8 rounded-xl p-4 text-xs sm:text-sm text-white/70 overflow-x-auto leading-relaxed mb-4">
                <code>{`<div class="shadow-[0_8px_30px_rgba(0,0,0,0.12)]">`}</code>
              </pre>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base">
                To add the UIXplor presets to your Tailwind design system,
                extend the{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  theme.boxShadow
                </code>{" "}
                key in{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  tailwind.config.js
                </code>
                :
              </p>
              <pre className="mt-3 bg-white/4 border border-white/8 rounded-xl p-4 text-xs sm:text-sm text-white/70 overflow-x-auto leading-relaxed">
                <code>{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'cloud': '0 1px 4px rgba(0,0,0,0.02), 0 4px 16px rgba(0,0,0,0.04)',
        'abyss': '0 10px 24px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.10)',
        'glow':  '0 0 16px rgba(100,120,200,0.15), 0 0 48px rgba(100,120,200,0.08)',
      },
    },
  },
};`}</code>
              </pre>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Box Shadow vs. CSS Filter Drop-Shadow
              </h2>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base mb-4">
                A common source of confusion: when should you use CSS{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  box-shadow
                </code>{" "}
                vs.{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  filter: drop-shadow()
                </code>
                ?
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-3 py-2 text-white/70 font-semibold">
                        Feature
                      </th>
                      <th className="px-3 py-2 text-white/70 font-semibold">
                        box-shadow
                      </th>
                      <th className="px-3 py-2 text-white/70 font-semibold">
                        filter: drop-shadow()
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white/45">
                    <tr className="border-b border-white/6">
                      <td className="px-3 py-2">Follows element shape</td>
                      <td className="px-3 py-2">Rectangular / border-radius</td>
                      <td className="px-3 py-2">Exact rendered shape</td>
                    </tr>
                    <tr className="border-b border-white/6">
                      <td className="px-3 py-2">
                        Works on transparent PNGs / SVGs
                      </td>
                      <td className="px-3 py-2">No</td>
                      <td className="px-3 py-2">Yes ✓</td>
                    </tr>
                    <tr className="border-b border-white/6">
                      <td className="px-3 py-2">Multiple layers</td>
                      <td className="px-3 py-2">Yes ✓</td>
                      <td className="px-3 py-2">One at a time</td>
                    </tr>
                    <tr className="border-b border-white/6">
                      <td className="px-3 py-2">Inset / inner shadow</td>
                      <td className="px-3 py-2">Yes ✓</td>
                      <td className="px-3 py-2">No</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2">Spread radius</td>
                      <td className="px-3 py-2">Yes ✓</td>
                      <td className="px-3 py-2">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-white/50 leading-relaxed text-sm sm:text-base mt-4">
                Use{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  box-shadow
                </code>{" "}
                for standard rectangular HTML elements. Use{" "}
                <code className="text-[#B8FB3C] bg-[#B8FB3C]/10 px-1.5 py-0.5 rounded text-xs">
                  filter: drop-shadow()
                </code>{" "}
                when you need a shadow that hugs the silhouette of an icon,
                illustration, or cutout image.
              </p>
            </section>

            {/* Frequently Asked Questions */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-5">
                {[
                  {
                    q: "How many box shadow examples are in this collection?",
                    a: `UIXplor currently includes ${shadows.length} CSS box shadow presets spanning 7 categories: design tokens, soft, layered, deep, neumorphic, glow, and inset. New shadows are added regularly.`,
                  },
                  {
                    q: "Are these CSS box shadows free to use in commercial projects?",
                    a: "Yes. All shadow presets on UIXplor are free to copy, paste, and use in personal or commercial projects without attribution.",
                  },
                  {
                    q: "What is a neumorphic box shadow?",
                    a: "Neumorphic shadows simulate soft extruded plastic by combining a dark shadow on one side with a bright highlight on the opposite side. The element appears to rise out of the background.",
                  },
                  {
                    q: "How do I add a box shadow in Tailwind CSS?",
                    a: "Use Tailwind's built-in utilities like shadow-sm, shadow-md, shadow-lg, or shadow-2xl. For custom values, use arbitrary syntax: shadow-[0_8px_30px_rgba(0,0,0,0.12)].",
                  },
                  {
                    q: "Can I combine multiple CSS box shadows?",
                    a: "Yes. Separate each shadow with a comma: box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08). Layered shadows look far more natural than single shadows.",
                  },
                ].map(({ q, a }) => (
                  <div key={q} className="border border-white/8 rounded-xl p-5">
                    <dt className="text-sm sm:text-base font-semibold text-white mb-2">
                      {q}
                    </dt>
                    <dd className="text-sm text-white/50 leading-relaxed">
                      {a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Internal links */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Explore More CSS Tools
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Looking for more free CSS resources? UIXplor&apos;s collection
                library has you covered.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href="/collections/gradients"
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-[#B8FB3C]/30 hover:bg-[#B8FB3C]/5 transition-all duration-300"
                >
                  <span className="text-[#B8FB3C] text-lg">🎨</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#B8FB3C] transition-colors">
                    Gradient Generator
                  </span>
                  <span className="text-xs text-white/40">
                    CSS gradient presets — copy &amp; paste
                  </span>
                </Link>
                <Link
                  href="/collections/glass-effects"
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-[#B8FB3C]/30 hover:bg-[#B8FB3C]/5 transition-all duration-300"
                >
                  <span className="text-[#B8FB3C] text-lg">🪟</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#B8FB3C] transition-colors">
                    Glass Effect Generator
                  </span>
                  <span className="text-xs text-white/40">
                    Glassmorphism CSS snippets
                  </span>
                </Link>
                <Link
                  href="/collections"
                  className="group flex flex-col gap-1 p-4 rounded-xl border border-white/8 hover:border-[#B8FB3C]/30 hover:bg-[#B8FB3C]/5 transition-all duration-300"
                >
                  <span className="text-[#B8FB3C] text-lg">🛠️</span>
                  <span className="text-sm font-semibold text-white group-hover:text-[#B8FB3C] transition-colors">
                    CSS Tools Library
                  </span>
                  <span className="text-xs text-white/40">
                    All free CSS generators &amp; snippets
                  </span>
                </Link>
              </div>
            </section>
          </article>
          {/* ── End SEO Content Body ───────────────────────────── */}
        </div>
      </main>

      <CodeViewerOverlay
        isOpen={!!selectedShadow}
        onClose={() => setSelectedShadow(null)}
        title={selectedShadow?.name || ""}
        sections={selectedShadow ? buildSections(selectedShadow) : []}
      />
    </>
  );
}
