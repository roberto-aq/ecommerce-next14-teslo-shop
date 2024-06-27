import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCart } from './_components/ProductsInCart';
import { PlaceOrder } from './_components/PlaceOrder';

export default function CheckoutPage() {
	return (
		<div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
			<div className='flex flex-col w-[1000px]'>
				<Title title='Verificar Orden' />

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
					{/* Carrito */}
					<div className='flex flex-col mt-5  gap-4'>
						<span className='text-xl'>Ajustar elementos</span>
						<Link href='/cart' className='underline mb-3'>
							Editar carrito
						</Link>

						<ProductsInCart />
					</div>

					{/* Checkout */}
					<PlaceOrder />
				</div>
			</div>
		</div>
	);
}
