import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/config/fonts';
import { Providers } from '@/components/providers/Providers';

export const metadata: Metadata = {
	title: {
		template: '%s Teslo | Shop',
		default: 'Home - Teslo | Shop',
	},
	description: 'Una tienda virtual de productos',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<Providers>
				<body className={inter.className}>{children}</body>
			</Providers>
		</html>
	);
}
