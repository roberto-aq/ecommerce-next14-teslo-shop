import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		id: Category;
	};
}

const products = initialData.products;

export default function CategoryPage({ params }: Props) {
	const { id } = params;

	const nameCategory: Record<Category, string> = {
		men: 'Hombres',
		women: 'Mujeres',
		kid: 'Niños',
		unisex: 'Para todos',
	};

	const filteredProducts = products.filter(
		product => product.gender === id
	);

	if (nameCategory[id] === undefined) {
		notFound();
	}

	return (
		<div>
			<Title
				title={`${nameCategory[id]}`}
				subtitle='Todos los artículos:'
			/>

			<ProductGrid products={filteredProducts} />
		</div>
	);
}
