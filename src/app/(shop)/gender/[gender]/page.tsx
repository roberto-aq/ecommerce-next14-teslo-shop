export const revalidate = 60;

import { getPaginateProductsWithIMages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		gender: string;
	};
	searchParams: {
		page?: string;
	};
}

export default async function GenderByPage({
	params,
	searchParams,
}: Props) {
	const { gender } = params;
	const page = searchParams.page ? Number(searchParams.page) : 1;

	const nameCategory: Record<string, string> = {
		men: 'Hombres',
		women: 'Mujeres',
		kid: 'Niños',
		unisex: 'Para todos',
	};

	const { products, totalPages } =
		await getPaginateProductsWithIMages({ gender, page });

	const filteredProducts = products.filter(
		product => product.gender === gender
	);

	if (nameCategory[gender] === undefined) {
		notFound();
	}

	return (
		<div>
			<Title
				title={`${nameCategory[gender]}`}
				subtitle='Todos los artículos:'
			/>

			<ProductGrid products={filteredProducts} />

			<Pagination totalPages={totalPages} />
		</div>
	);
}
