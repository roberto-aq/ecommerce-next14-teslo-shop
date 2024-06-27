import Link from 'next/link';

import { redirect } from 'next/navigation';

import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

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

						{/* ITEMS */}
						<ProductsInCart />
					</div>

					{/* Checkout */}
					<div className='bg-white rounded-xl shadow-md p-7 h-fit'>
						<h2 className='text-2xl mb-4'>Resumen de orden</h2>

						<OrderSummary />

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
