import PageSEO from "@/components/seo/PageSEO";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { GetStaticProps, GetStaticPaths } from "next";
import blog from "../../../data/blog.json";
import PageBackground from "@/components/ui/PageBackground";
import dynamic from "next/dynamic";

const BlogCodeEditor = dynamic(
  () => import("@/components/blog/BlogCodeEditor"),
  { ssr: false },
);

type Section = { heading: string; level: number; body: string };
type Post = (typeof blog)[number];
type SlimPost = {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: number;
  tags: string[];
  date: string;
};

interface Props {
  post: Post;
  nextPost: SlimPost | null;
  relatedPosts: SlimPost[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

function renderBody(text: string) {
  // Handle :::editor blocks
  const editorParts = text.split(/(:::editor[\s\S]*?:::)/g);
  return editorParts.map((part, i) => {
    if (part.startsWith(":::editor")) {
      const inner = part
        .replace(/^:::editor\n?/, "")
        .replace(/:::$/, "")
        .trim();
      const [htmlPart, cssPart] = inner.split(/\n---css\n/);
      if (htmlPart !== undefined && cssPart !== undefined) {
        return (
          <BlogCodeEditor key={i} html={htmlPart.trim()} css={cssPart.trim()} />
        );
      }
      return null;
    }
    // Handle regular code blocks and prose
    const parts = part.split(/(```[\s\S]*?```)/g);
    return parts.map((segment, j) => {
      if (segment.startsWith("```")) {
        const [langLine, ...codeLines] = segment
          .replace(/^```/, "")
          .replace(/```$/, "")
          .split("\n");
        const codeContent = codeLines.join("\n").replace(/\n$/, "");
        const lang = langLine?.trim() || "";
        return (
          <div
            key={`${i}-${j}`}
            className="my-5 rounded-xl overflow-hidden border"
            style={{ background: "#0a0a0f", borderColor: "#2A2A2A" }}
          >
            {lang && (
              <div
                className="flex items-center justify-between px-4 py-2 border-b"
                style={{ borderColor: "#2A2A2A" }}
              >
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "#B8FB3C" }}
                >
                  {lang}
                </span>
                <CopyCodeButton code={codeContent} />
              </div>
            )}
            <pre className="overflow-x-auto">
              <code className="block p-5 font-mono text-[13px] leading-7 text-white/80 whitespace-pre">
                {codeContent}
              </code>
            </pre>
          </div>
        );
      }
      return segment.split(/\n\n+/).map((para, k) => {
        if (!para.trim()) return null;
        const tokens = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p
            key={`${i}-${j}-${k}`}
            className="text-white/60 text-base leading-relaxed mb-4"
          >
            {tokens.map((tok, l) => {
              if (tok.startsWith("**") && tok.endsWith("**"))
                return (
                  <strong key={l} className="text-white/90 font-semibold">
                    {tok.slice(2, -2)}
                  </strong>
                );
              return tok;
            })}
          </p>
        );
      });
    });
  });
}

function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        });
      }}
      className="text-[10px] font-semibold px-2 py-1 rounded-md transition-all"
      style={{
        background: copied ? "rgba(184,251,60,0.15)" : "rgba(255,255,255,0.06)",
        color: copied ? "#B8FB3C" : "rgba(255,255,255,0.4)",
      }}
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  );
}

function TableOfContents({
  sections,
  activeId,
}: {
  sections: Section[];
  activeId: string;
}) {
  return (
    <nav
      className="sticky top-24 w-56 shrink-0 hidden xl:block max-h-[calc(100vh-120px)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4">
        On this page
      </p>
      <ul className="flex flex-col gap-1.5">
        {sections
          .filter((s) => s.level === 2)
          .map((section) => {
            const id = slugify(section.heading);
            const isActive = activeId === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`block text-xs leading-snug py-1 pl-3 border-l-2 transition-all duration-200 ${isActive ? "text-[#B8FB3C] border-[#B8FB3C] font-medium" : "text-white/35 border-white/10 hover:text-white/70 hover:border-white/30"}`}
                >
                  {section.heading}
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

const cardGrads = [
  "linear-gradient(135deg, #0f0c29 0%, #302b63 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
  "linear-gradient(135deg, #1e3a3a 0%, #0f2a2a 100%)",
];

// Maps blog tags → collection pages
const TAG_TO_COLLECTION: Record<
  string,
  { label: string; href: string; icon: string; desc: string }
> = {
  Buttons: {
    label: "CSS Buttons",
    href: "/collections/buttons",
    icon: "⬜",
    desc: "Hover, animated, gradient, glass buttons",
  },
  "Box Shadows": {
    label: "Box Shadows",
    href: "/collections/box-shadows",
    icon: "🌑",
    desc: "Layered, glow, neumorphic shadows",
  },
  Glassmorphism: {
    label: "Glass Effects",
    href: "/collections/glass-effects",
    icon: "🧊",
    desc: "Frosted glass UI components",
  },
  Animations: {
    label: "Animations",
    href: "/animations",
    icon: "✨",
    desc: "CSS & Tailwind animation library",
  },
  Loaders: {
    label: "Loaders",
    href: "/collections/loaders",
    icon: "↻",
    desc: "Spinners, progress, skeleton loaders",
  },
  Inputs: {
    label: "Inputs",
    href: "/collections/inputs",
    icon: "✎",
    desc: "Form inputs with style",
  },
  Forms: {
    label: "Inputs",
    href: "/collections/inputs",
    icon: "✎",
    desc: "Styled form components",
  },
  Gradients: {
    label: "Gradients",
    href: "/toolkit?tool=gradient",
    icon: "🌈",
    desc: "Gradient generator & examples",
  },
  CSS: {
    label: "Collections",
    href: "/collections",
    icon: "◈",
    desc: "All UI component collections",
  },
  UX: {
    label: "Micro Interactions",
    href: "/microinteractions",
    icon: "⚡",
    desc: "Ripple, tilt, glow interactions",
  },
};

export default function BlogPost({ post, nextPost, relatedPosts }: Props) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = document.querySelectorAll("h2[data-toc]");
    if (!headings.length) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }, // -100px header offset ke liye behtar hai
    );
    headings.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [post.slug]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "UIXplor",
      url: "https://uixplor.com",
    },
    url: `https://uixplor.com/blog/${post.slug}/`,
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <PageSEO
        title={`${post.title} — UIXplor Blog`}
        description={post.excerpt}
        path={`/blog/${post.slug}/`}
        type="article"
        publishedTime={post.date}
        author={post.author}
        tags={post.tags}
        jsonLd={articleJsonLd}
      />

      <main className="min-h-screen px-4 sm:px-6 py-8 sm:py-12 relative">
        <PageBackground />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="mb-10">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#B8FB3C] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#B8FB3C] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-white/70 truncate max-w-200px">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="flex gap-16 items-start">
            <article className="flex-1 min-w-0">
              {/* Header */}
              <motion.header
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog`}>
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/6 uppercase tracking-wider hover:bg-white/10 hover:text-white/70 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    </Link>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                  {post.title}
                </h1>
                <p className="text-lg text-white/50 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 pt-5 border-t border-white/6">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#B8FB3C]/30 to-[#B8FB3C]/10 border border-[#B8FB3C]/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#B8FB3C]">U</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/80">
                      {post.author}
                    </p>
                    <p className="text-xs text-white/35">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      · {post.readingTime} min read
                    </p>
                  </div>
                </div>
              </motion.header>

              {/* Hero image */}
              <motion.div
                className="rounded-2xl overflow-hidden mb-12 h-56 sm:h-72"
                style={{
                  background:
                    "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)",
                }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="h-full flex items-center justify-center">
                  <span className="text-7xl opacity-20 select-none">✦</span>
                </div>
              </motion.div>

              {/* Sections */}
              {/* Sections Loop - Replace your old mapping with this */}
              <div className="prose-content">
                {post.sections.map((section, i) => {
                  const id = slugify(section.heading);
                  return (
                    <motion.section
                      key={id}
                      className="mb-12 scroll-mt-24"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                    >
                      {section.level === 2 ? (
                        <h2
                          id={id}
                          data-toc
                          className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-3"
                        >
                          <span className="text-[#B8FB3C] text-sm font-mono opacity-50">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {section.heading}
                        </h2>
                      ) : (
                        <h3 className="text-lg font-semibold text-white/90 mb-3">
                          {section.heading}
                        </h3>
                      )}
                      <div>{renderBody(section.body)}</div>
                    </motion.section>
                  );
                })}
              </div>

              {/* Related UI Components */}
              {(() => {
                const relatedCollections = post.tags
                  .map((tag) => TAG_TO_COLLECTION[tag])
                  .filter(Boolean)
                  .filter(
                    (c, i, arr) =>
                      arr.findIndex((x) => x?.href === c?.href) === i,
                  )
                  .slice(0, 3);

                if (!relatedCollections.length) return null;

                return (
                  <div className="mt-12 pt-10 border-t border-white/6">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Related UI Components
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {relatedCollections.map(
                        (col) =>
                          col && (
                            <Link
                              key={col.href}
                              href={col.href}
                              className="group flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
                              style={{
                                background: "#151515",
                                borderColor: "#2A2A2A",
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = "rgba(184,251,60,0.3)";
                                (
                                  e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                  "0 0 20px rgba(184,251,60,0.06)";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLElement
                                ).style.borderColor = "#2A2A2A";
                                (
                                  e.currentTarget as HTMLElement
                                ).style.boxShadow = "none";
                              }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                                style={{
                                  background: "rgba(184,251,60,0.08)",
                                  border: "1px solid rgba(184,251,60,0.15)",
                                }}
                              >
                                {col.icon}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-white group-hover:text-[#B8FB3C] transition-colors">
                                  {col.label}
                                </p>
                                <p className="text-[10px] text-white/35 truncate">
                                  {col.desc}
                                </p>
                              </div>
                              <svg
                                className="w-3.5 h-3.5 text-white/20 group-hover:text-[#B8FB3C] group-hover:translate-x-0.5 transition-all"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          ),
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Next + Related + Back */}
              <div className="mt-16 pt-10 border-t border-white/6 space-y-10">
                {/* Next post */}
                {nextPost && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4">
                      Next Article
                    </p>
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group flex gap-4 p-4 rounded-2xl border border-white/6 hover:border-white/14 hover:bg-white/2 transition-all duration-300"
                    >
                      <div
                        className="w-20 h-16 rounded-xl shrink-0 flex items-center justify-center"
                        style={{ background: cardGrads[1] }}
                      >
                        <span className="text-white/20 font-black text-2xl select-none">
                          {nextPost.tags[0]?.[0] ?? "C"}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-white group-hover:text-[#B8FB3C] transition-colors line-clamp-2 mb-1">
                          {nextPost.title}
                        </h3>
                        <p className="text-xs text-white/40 line-clamp-1">
                          {nextPost.excerpt}
                        </p>
                        <p className="text-[10px] text-white/25 mt-1">
                          {nextPost.readingTime} min read
                        </p>
                      </div>
                      <span className="self-center text-white/25 group-hover:text-[#B8FB3C] group-hover:translate-x-1 transition-all duration-300 text-lg shrink-0">
                        →
                      </span>
                    </Link>
                  </div>
                )}

                {/* Related posts */}
                {relatedPosts.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4">
                      Related Articles
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedPosts.map((rp, i) => (
                        <Link
                          key={rp.slug}
                          href={`/blog/${rp.slug}`}
                          className="group flex gap-3 p-4 rounded-2xl border border-white/6 hover:border-white/14 hover:bg-white/2 transition-all duration-300"
                        >
                          <div
                            className="w-14 h-12 rounded-lg shrink-0 flex items-center justify-center"
                            style={{
                              background: cardGrads[i % cardGrads.length],
                            }}
                          >
                            <span className="text-white/20 font-black text-xl select-none">
                              {rp.tags[0]?.[0] ?? "C"}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-white group-hover:text-[#B8FB3C] transition-colors line-clamp-2">
                              {rp.title}
                            </h4>
                            <p className="text-[10px] text-white/30 mt-1">
                              {rp.readingTime} min read
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8FB3C] transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </article>

            <TableOfContents sections={post.sections} activeId={activeId} />
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: blog.map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const idx = blog.findIndex((p) => p.slug === params?.slug);
  if (idx === -1) return { notFound: true };
  const post = blog[idx];

  const nextRaw = blog[idx + 1] ?? null;
  const nextPost: SlimPost | null = nextRaw
    ? {
        slug: nextRaw.slug,
        title: nextRaw.title,
        excerpt: nextRaw.excerpt,
        readingTime: nextRaw.readingTime,
        tags: nextRaw.tags,
        date: nextRaw.date,
      }
    : null;

  const relatedPosts: SlimPost[] = blog
    .filter((p, i) => i !== idx && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 2)
    .map(({ slug, title, excerpt, readingTime, tags, date }) => ({
      slug,
      title,
      excerpt,
      readingTime,
      tags,
      date,
    }));

  return { props: { post, nextPost, relatedPosts } };
};
