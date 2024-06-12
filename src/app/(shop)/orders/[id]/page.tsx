import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

interface Props {
	params: {
		id: string;
	};
}

export default function OrderPage({ params }: Props) {
	const { id } = params;

	// TODO: Verificar
	// Redirect("/")

	return (
		<div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
			<div className='flex flex-col w-[1000px]'>
				<Title title={`Orden #${id}`} />

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
					{/* Carrito */}
					<div className='flex flex-col mt-5  gap-4'>
						<div
							className={clsx(
								'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
								{
									'bg-green-700': true,
									'bg-red-500': false,
								}
							)}
						>
							<IoCardOutline size={30} />
							{/* <span className='mx-2'>Pendiente de pago</span> */}
							<span className='mx-2'>Pagada</span>
						</div>

						{productsInCart.map(product => (
							<div
								key={product.slug}
								className='flex gap-5 items-center '
							>
								<Image
									src={`/products/${product.images[0]}`}
									alt={product.title}
									width={100}
									height={100}
									className='rounded'
								/>

								<div>
									<p>{product.title}</p>
									<p className='my-2 font-medium'>
										${product.price} x 3
									</p>
									<p className='font-bold'>
										Subtotal: ${product.price}
									</p>

									<button className='underline text-sm mt-2'>
										Remover
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Checkout */}
					<div className='bg-white rounded-xl shadow-sm p-7'>
						<h2 className='text-2xl mb-2'>Dirección de entrega</h2>
						<div className=''>
							<p>Fernando Herrera</p>
							<p>Avenida Inglaterra</p>
							<p>Plaza Guadalupe</p>
							<p>Frente a la parroquia universitaria San Cristobal</p>
						</div>

						{/* Divider */}
						<div className='w-full bg-gray-200 h-[1px] my-10'></div>

						<h2 className='text-2xl mb-4'>Resumen de orden</h2>

						<div className='flex flex-col gap-1'>
							<div className='flex justify-between'>
								<span className='font-bold'>No. Productos</span>
								<span>3 artículos</span>
							</div>
							<div className='flex justify-between'>
								<span className='font-bold'>Subtotal</span>
								<span>$100</span>
							</div>
							<div className='flex justify-between'>
								<span className='font-bold'>Impuestos (15%)</span>
								<span>$15</span>
							</div>
							{/* Total */}
							<div className='flex justify-between items-center mt-4'>
								<span className='font-bold text-2xl'>Total:</span>
								<span className='text-2xl'>$115</span>
							</div>
						</div>

						<div className='mt-5'>
							<div
								className={clsx(
									'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
									{
										'bg-green-700': true,
										'bg-red-500': false,
									}
								)}
							>
								<IoCardOutline size={30} />
								{/* <span className='mx-2'>Pendiente de pago</span> */}
								<span className='mx-2'>Pagada</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
