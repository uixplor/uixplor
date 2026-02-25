'use client';

import { useEffect, useState } from 'react';

/**
 * PageBackground
 * Adds the dark grid + cursor-following radial glow used on error pages to any content page.
 * Simply drop <PageBackground /> at the top of your page's root element.
 */
export default function PageBackground({ accentColor = '184,251,60' }: { accentColor?: string }) {
	const [cursor, setCursor] = useState({ x: 50, y: 50 });

	useEffect(() => {
		const move = (e: MouseEvent) =>
			setCursor({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		window.addEventListener('mousemove', move);
		return () => window.removeEventListener('mousemove', move);
	}, []);

	return (
		<>
			{/* Cursor-following radial glow */}
			<div
				className="fixed inset-0 pointer-events-none z-0"
				style={{
					background: `radial-gradient(700px circle at ${cursor.x}% ${cursor.y}%, rgba(${accentColor},0.04), transparent 65%)`,
					transition: 'background 0.25s ease',
				}}
			/>
			{/* Subtle dot grid */}
			<div
				className="fixed inset-0 pointer-events-none opacity-[0.025] z-0"
				style={{
					backgroundImage: 'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
					backgroundSize: '56px 56px',
				}}
			/>
		</>
	);
}
