import { Footer, SideMenu, TopMenu } from '@/components';

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className='min-h-screen'>
			<TopMenu />
			<SideMenu />

			<div className='container'>{children}</div>

			<Footer />
		</main>
	);
}
