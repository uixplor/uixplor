'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StatusIndicator from './StatusIndicator';

// Navigation grouped into categories for the grid menu
const navGroups = [
    {
        label: 'Discover',
        links: [
            { href: '/', label: 'Home', desc: 'Start here', color: '#B8FB3C', icon: '⌂' },
            { href: '/collections', label: 'Collections', desc: 'All UI components', color: '#6C63FF', icon: '◈' },
            { href: '/animations', label: 'Animations', desc: 'CSS & Tailwind', color: '#f472b6', icon: '✨' },
            { href: '/microinteractions', label: 'Micro Interactions', desc: 'Ripple, tilt, glow', color: '#fb923c', icon: '⚡' },
            { href: '/trends', label: 'UI Trends', desc: 'Glassmorphism & more', color: '#34d399', icon: '◉' },
        ],
    },
    {
        label: 'Build',
        links: [
            { href: '/playground', label: 'Playground', desc: 'Live code editor', color: '#B8FB3C', icon: '</>' },
            { href: '/builder', label: 'Builder', desc: 'Visual component builder', color: '#60a5fa', icon: '⬡' },
            { href: '/toolkit', label: 'Toolkit', desc: 'CSS generators', color: '#fbbf24', icon: '⚙' },
            { href: '/toolkit/fluid', label: 'Fluid Design', desc: 'Clamp() playground', color: '#B8FB3C', icon: '◎' },
        ],
    },
    {
        label: 'Read',
        links: [
            { href: '/blog', label: 'Blog', desc: 'UI tips & guides', color: '#a78bfa', icon: '✦' },
            { href: '/docs', label: 'Docs', desc: 'Platform guide', color: '#38bdf8', icon: '⊞' },
        ],
    },
];

// Flat list for active detection
const allNavLinks = navGroups.flatMap(g => g.links);

export default function Header() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const accentColor = '#B8FB3C';

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 40);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [router.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                    background: scrolled
                        ? 'rgba(10,10,15,0.85)'
                        : 'rgba(10,10,15,0.55)',
                    backdropFilter: 'blur(20px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                    borderBottom: scrolled
                        ? '1px solid rgba(184,251,60,0.18)'
                        : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: scrolled
                        ? '0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(184,251,60,0.08)'
                        : '0 1px 0 rgba(255,255,255,0.04)',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-[72px]">
                        {/* Logo */}
                        <Link href="/" className="relative z-10 flex items-center group">
                            <motion.svg
                                width="160"
                                height="40"
                                viewBox="0 0 833 75"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                initial="hidden"
                                animate="visible"
                                className="sm:w-[180px] sm:h-[45px]"
                            >
                                <g clipPath="url(#clip0_header)">
                                    {/* U */}
                                    <motion.path
                                        d="M102.73 0.137909V35.5379C102.72 38.6748 102.34 41.7996 101.6 44.8479C100.651 48.4428 99.146 51.8674 97.14 54.9979C94.8953 58.6569 92.025 61.8927 88.66 64.5579C85.2267 67.2979 80.4867 69.5846 74.44 71.4179C67.6879 73.3421 60.6901 74.2653 53.67 74.1579H49.81C44.3538 74.2031 38.9058 73.7276 33.54 72.7379C29.2699 71.9852 25.1064 70.7194 21.14 68.9679C17.9253 67.4905 14.9302 65.5757 12.24 63.2779C9.897 61.3187 7.83734 59.0436 6.12 56.5179C4.60564 54.2147 3.36082 51.7452 2.41 49.1579C1.52696 46.8459 0.880331 44.4503 0.48 42.0079C0.16147 39.866 0.00103716 37.7035 0 35.5379V0.137909H25.12V34.1379C25.0966 36.619 25.4748 39.0876 26.24 41.4479C27.0975 43.8827 28.3883 46.1425 30.05 48.1179C32.2689 50.5894 35.1327 52.3935 38.32 53.3279C42.6003 54.6946 47.078 55.3401 51.57 55.2379C55.9798 55.3359 60.3747 54.6902 64.57 53.3279C67.7061 52.367 70.5228 50.5733 72.72 48.1379C74.4166 46.1767 75.7294 43.9141 76.59 41.4679C77.3586 39.1082 77.7402 36.6396 77.72 34.1579V0.157928L102.73 0.137909Z"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        fill="#ffffff"
                                        variants={{
                                            hidden: { pathLength: 0, opacity: 0 },
                                            visible: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: { duration: 0.6, ease: "easeInOut" }
                                            }
                                        }}
                                    />
                                    {/* I */}
                                    <motion.path
                                        d="M135.84 74.1663H110.73V0.776306H135.84V74.1663Z"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        fill="#ffffff"
                                        variants={{
                                            hidden: { pathLength: 0, opacity: 0 },
                                            visible: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: { duration: 0.3, delay: 0.1, ease: "easeInOut" }
                                            }
                                        }}
                                    />
                                    {/* X */}
                                    <motion.path
                                        d="M143.84 74.1663L183.2 37.4663L144.69 1.52631H177.88L200.23 22.7963L222.62 1.52631H253.05L215.05 36.9463L253.88 74.1363H222.68L198.42 51.6163L174.37 74.1663H143.84Z"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        fill="#ffffff"
                                        variants={{
                                            hidden: { pathLength: 0, opacity: 0 },
                                            visible: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" }
                                            }
                                        }}
                                    />
                                    {/* P */}
                                    <motion.path
                                        d="M287 49.6463V74.1663H261.88V0.586334H322.03C346.957 0.586334 359.423 8.55968 359.43 24.5063V25.5063C359.43 41.5863 346.963 49.6263 322.03 49.6263L287 49.6463ZM287 33.1363H321.6C329.36 33.1363 333.24 30.5663 333.24 25.4263V25.1263C333.24 19.9263 329.36 17.323 321.6 17.3163H287V33.1363Z"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        fill="#ffffff"
                                        variants={{
                                            hidden: { pathLength: 0, opacity: 0 },
                                            visible: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: { duration: 0.4, delay: 0.3, ease: "easeInOut" }
                                            }
                                        }}
                                    />
                                    {/* L */}
                                    <motion.path
                                        d="M392.55 0.616333V55.8763H448.27V74.1663H367.43V0.616333H392.55Z"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        fill="#ffffff"
                                        variants={{
                                            hidden: { pathLength: 0, opacity: 0 },
                                            visible: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: { duration: 0.4, delay: 0.4, ease: "easeInOut" }
                                            }
                                        }}
                                    />
                                    {/* O (green accent) */}
                                    <motion.path
                                        d="M733.58 35.423V38.3129C733.585 40.3194 733.455 42.324 733.19 44.3129C732.844 46.5649 732.261 48.7739 731.45 50.9029C730.58 53.3192 729.411 55.6171 727.97 57.743C726.295 60.118 724.272 62.2281 721.97 64.003C719.227 66.1732 716.199 67.9566 712.97 69.303C708.84 70.9455 704.54 72.126 700.15 72.823C694.51 73.7618 688.798 74.2101 683.08 74.163H506.92C501.186 74.208 495.458 73.7597 489.8 72.823C485.393 72.1294 481.077 70.9489 476.93 69.303C473.702 67.9566 470.673 66.1732 467.93 64.003C465.606 62.2209 463.551 60.1125 461.83 57.743C460.364 55.6319 459.194 53.3307 458.35 50.9029C457.567 48.7686 457.001 46.5608 456.66 44.3129C456.396 42.324 456.265 40.3194 456.27 38.3129V35.423C456.264 33.4164 456.395 31.4118 456.66 29.423C457.006 27.1892 457.572 24.9952 458.35 22.8729C459.192 20.4601 460.363 18.1751 461.83 16.083C463.548 13.756 465.585 11.6823 467.88 9.92296C470.617 7.76927 473.648 6.01818 476.88 4.72295C481.048 3.10984 485.381 1.96288 489.8 1.30297C495.461 0.395408 501.187 -0.0394445 506.92 0.00294889H682.99C688.683 -0.0404112 694.37 0.394469 699.99 1.30297C704.373 1.9707 708.668 3.11755 712.8 4.72295C716.033 6.01892 719.063 7.76995 721.8 9.92296C724.079 11.6852 726.099 13.7588 727.8 16.083C729.268 18.1684 730.455 20.4379 731.33 22.833C732.145 24.9469 732.729 27.1431 733.07 29.383C733.375 31.3826 733.546 33.4005 733.58 35.423ZM709.98 36.103C709.988 34.3765 709.759 32.6572 709.3 30.993C708.739 29.1823 707.855 27.4883 706.69 25.993C705.333 24.2002 703.633 22.6944 701.69 21.5629C699.052 20.1412 696.213 19.1296 693.27 18.5629C689.655 17.7872 685.968 17.3884 682.27 17.3729H508.95C489.537 17.3729 479.83 23.6329 479.83 36.1529V37.303C479.82 39.5428 480.23 41.7646 481.04 43.853C482.008 46.1506 483.403 48.2442 485.15 50.023C487.09 52.0763 490.09 53.7129 494.15 54.9329C498.97 56.2508 503.955 56.8672 508.95 56.763H682.22C686.722 56.7646 691.205 56.1694 695.55 54.993C699.55 53.7996 702.55 52.193 704.55 50.173C706.351 48.4411 707.783 46.3628 708.76 44.0629C709.569 41.9744 709.98 39.7527 709.97 37.513L709.98 36.103Z"
                                        stroke={accentColor}
                                        strokeWidth="2"
                                        fill={accentColor}
                                        variants={{
                                            hidden: { pathLength: 0, opacity: 0 },
                                            visible: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: { duration: 0.6, delay: 0.5, ease: "easeInOut" }
                                            }
                                        }}
                                    />
                                    {/* R */}
                                    <motion.path
                                        d="M832.03 54.2263V74.1563H809.17V61.2263C809.17 56.7463 808.03 53.503 805.75 51.4963C803.47 49.4897 799.564 48.4897 794.03 48.4963H764.34V74.1663H741.58V1.79633H800.18C821.22 1.79633 831.737 8.05301 831.73 20.5663V21.7363C831.73 29.383 827.237 34.6663 818.25 37.5863C822.07 38.5738 825.535 40.6147 828.25 43.4763C830.854 46.4355 832.209 50.2889 832.03 54.2263ZM808.03 25.2263C808.059 24.2681 807.871 23.3158 807.482 22.4399C807.092 21.564 806.511 20.787 805.78 20.1663C804.28 18.873 801.97 18.2263 798.85 18.2263H764.34V32.4263H798.82C801.94 32.4263 804.25 31.7763 805.75 30.4763C806.489 29.8428 807.075 29.0506 807.465 28.1588C807.854 27.2671 808.037 26.2988 808 25.3263L808.03 25.2263Z"
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        fill="#ffffff"
                                        variants={{
                                            hidden: { pathLength: 0, opacity: 0 },
                                            visible: {
                                                pathLength: 1,
                                                opacity: 1,
                                                transition: { duration: 0.5, delay: 0.6, ease: "easeInOut" }
                                            }
                                        }}
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_header">
                                        <rect width="832.046" height="74.1663" fill="white" />
                                    </clipPath>
                                </defs>
                            </motion.svg>
                        </Link>

                        <div className="relative z-10 flex items-center gap-3">
                        <StatusIndicator />
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="relative z-10 pl-5 pr-2.5 py-2 border rounded-full flex items-center gap-2.5 cursor-pointer font-semibold text-sm tracking-wide transition-all duration-300"
                            style={{
                                borderColor: menuOpen ? '#ffffff' : accentColor,
                                color: menuOpen ? '#ffffff' : '#ffffff',
                            }}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                        >
                            MENU
                            <div
                                className="h-8 w-8 flex items-center justify-center rounded-full transition-colors duration-300"
                                style={{
                                    backgroundColor: menuOpen ? '#ffffff' : accentColor,
                                    color: '#0a0a0f',
                                }}
                            > 
                                <div className="w-3.5 h-3 relative flex flex-col justify-between">
                                    <span
                                        className={`block h-[2px] rounded-full bg-[#0a0a0f] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                                            }`}
                                    />
                                    <span
                                        className={`block h-[2px] rounded-full bg-[#0a0a0f] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''
                                            }`}
                                    />
                                    <span
                                        className={`block h-[2px] rounded-full bg-[#0a0a0f] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                                            }`}
                                    />
                                </div>
                            </div>
                        </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Full-Screen Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0"
                            style={{ background: 'rgba(5,5,10,0.96)', backdropFilter: 'blur(24px)' }}
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="relative h-full flex flex-col overflow-y-auto"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ duration: 0.25, delay: 0.05 }}
                        >
                            {/* Menu header */}
                            <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Navigation</span>
                                </div>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Nav grid */}
                            <nav className="flex-1 px-6 sm:px-10 py-8">
                                <div className="max-w-4xl mx-auto">
                                    {navGroups.map((group, gi) => (
                                        <motion.div
                                            key={group.label}
                                            className="mb-8"
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25, delay: 0.1 + gi * 0.06 }}
                                        >
                                            <p className="text-[10px] font-bold uppercase tracking-widest mb-3 pl-1" style={{ color: 'rgba(255,255,255,0.2)' }}>{group.label}</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                                                {group.links.map((link, li) => {
                                                    const isActive = link.href === '/'
                                                        ? router.pathname === '/'
                                                        : router.pathname.startsWith(link.href);
                                                    return (
                                                        <motion.div
                                                            key={link.href}
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.2, delay: 0.12 + gi * 0.05 + li * 0.03 }}
                                                        >
                                                            <Link
                                                                href={link.href}
                                                                onClick={() => setMenuOpen(false)}
                                                                className="group flex flex-col gap-2 p-4 rounded-2xl border transition-all duration-200 block"
                                                                style={{
                                                                    background: isActive ? `${link.color}12` : 'rgba(255,255,255,0.03)',
                                                                    borderColor: isActive ? `${link.color}40` : 'rgba(255,255,255,0.06)',
                                                                }}
                                                                onMouseEnter={e => {
                                                                    (e.currentTarget as HTMLElement).style.background = `${link.color}10`;
                                                                    (e.currentTarget as HTMLElement).style.borderColor = `${link.color}35`;
                                                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                                                                }}
                                                                onMouseLeave={e => {
                                                                    (e.currentTarget as HTMLElement).style.background = isActive ? `${link.color}12` : 'rgba(255,255,255,0.03)';
                                                                    (e.currentTarget as HTMLElement).style.borderColor = isActive ? `${link.color}40` : 'rgba(255,255,255,0.06)';
                                                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                                                }}
                                                            >
                                                                <div
                                                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                                                                    style={{ background: `${link.color}15`, color: link.color }}
                                                                >
                                                                    {link.icon}
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-semibold" style={{ color: isActive ? link.color : 'rgba(255,255,255,0.85)' }}>{link.label}</p>
                                                                    <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{link.desc}</p>
                                                                </div>
                                                            </Link>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </nav>

                            {/* Bottom bar */}
                            <div className="px-8 py-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>UIXplor — Open-source UI library</span>
                                <Link
                                    href="/collections"
                                    onClick={() => setMenuOpen(false)}
                                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-full transition-all"
                                    style={{ background: accentColor, color: '#0a0a0f' }}
                                >
                                    Browse All
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
