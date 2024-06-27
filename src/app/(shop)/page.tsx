export const revalidate = 60;

import { getPaginateProductsWithIMages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const page = searchParams.page ? Number(searchParams.page) : 1;

	const { products, currentPage, totalPages } =
		await getPaginateProductsWithIMages({ page });

	if (products.length === 0) {
		redirect('/');
	}

	return (
		<main>
			<Title title='Tienda' subtitle='Todos los productos' />

			<ProductGrid products={products} />

			<Pagination totalPages={totalPages} />
		</main>
	);
}
