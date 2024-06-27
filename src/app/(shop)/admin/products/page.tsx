import { getPaginateProductsWithIMages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function AdminProductsPage({
	searchParams,
}: Props) {
	const page = searchParams.page ? Number(searchParams.page) : 1;

	const { products, currentPage, totalPages } =
		await getPaginateProductsWithIMages({ page });

	if (products.length === 0) {
		redirect('/');
	}

	return (
		<>
			<Title title='Mantenimiento de productos' />

			<div className='flex justify-end mb-5'>
				<Link href='/admin/product/new' className='btn-primary'>
					Nuevo producto
				</Link>
			</div>

			<div className='mb-10'>
				<table className='min-w-full'>
					<thead className='bg-gray-200 border-b'>
						<tr>
							<th
								scope='col'
								className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
							>
								Imagen
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
							>
								Título
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
							>
								Precio
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
							>
								Género
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
							>
								Inventario
							</th>
							<th
								scope='col'
								className='text-sm font-medium text-gray-900 px-6 py-4 text-left'
							>
								Tallas
							</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr
								className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
								key={product.id}
							>
								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
									<Link href={`/admin/product/${product.slug}`}>
										<ProductImage
											src={product.ProductImage[0]?.url}
											width={60}
											height={60}
											alt={product.title}
											className='object-cover rounded-md'
										/>
									</Link>
								</td>
								<td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
									<Link
										href={`/admin/product/${product.slug}`}
										className='hover:underline'
									>
										{product.title}
									</Link>
								</td>
								<td className='text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap'>
									{currencyFormat(product.price)}
								</td>
								<td className='text-sm text-gray-900 font-light px-6 '>
									{product.gender}
								</td>
								<td className='text-sm text-gray-900 font-bold px-6 '>
									{product.inStock}
								</td>
								<td className='text-sm text-gray-900 font-bold px-6 '>
									{product.sizes.join(', ')}
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<Pagination totalPages={totalPages} />
			</div>
		</>
	);
}
