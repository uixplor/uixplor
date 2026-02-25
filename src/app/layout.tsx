import '@/styles/globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className="bg-[#0a0a0f] antialiased">{children}</body>
		</html>
	);
}
