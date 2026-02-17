'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

interface CollectionPreviewProps {
	title: string;
	description: string;
	icon: string;
	itemCount: number;
	viewAllLink: string;
	gradient: string;
	children: React.ReactNode;
}

export default function CollectionPreview({
	title,
	description,
	icon,
	itemCount,
	viewAllLink,
	gradient,
	children
}: CollectionPreviewProps) {
	return (
		<section className="mb-20">
			{/* Section Header */}
			<div className="flex items-center justify-between mb-8">
				<div className="flex items-center gap-4">
					<span className="text-5xl">{icon}</span>
					<div>
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
						<p className="text-gray-600 mt-1">{description}</p>
					</div>
				</div>
			</div>

			{/* Preview Grid */}
			<div className="mb-8">
				{children}
			</div>

			{/* View All Button */}
			<div className="text-center">
				<Link href={viewAllLink}>
					<motion.button
						className={`inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r ${gradient} text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						View All {itemCount} {title}
						<svg
							className="ml-2 w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</motion.button>
				</Link>
			</div>
		</section>
	);
}
