import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
];

export default function CartPage() {
	// redirect('/empty');

	return (
		<div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
			<div className='flex flex-col w-[1000px]'>
				<Title title='Carrito' />

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10 relative'>
					{/* Carrito */}
					<div className='flex flex-col mt-5  gap-4'>
						<span className='text-xl'>Agregar más items</span>
						<Link href='/' className='underline mb-3'>
							Continúa comprando
						</Link>

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
									<p className='my-2 font-medium'>${product.price}</p>
									<QuantitySelector quantity={1} />

									<button className='underline text-sm mt-2'>
										Remover
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Checkout */}
					<div className='bg-white rounded-xl shadow-md p-7 h-fit'>
						<h2 className='text-2xl mb-4'>Resumen de orden</h2>

						<div className='flex flex-col gap-3'>
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
							<Link
								href='/checkout/address'
								className='flex btn-primary justify-center'
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
