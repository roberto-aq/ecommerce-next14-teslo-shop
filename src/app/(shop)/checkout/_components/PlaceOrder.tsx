'use client';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat, sleep } from '@/utils';
import clsx from 'clsx';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PlaceOrder = () => {
	const [loaded, setLoaded] = useState(false);
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const address = useAddressStore(state => state.address);
	const { tax, subTotal, total } = useCartStore(state =>
		state.getSummaryInformation()
	);
	const totalItems = useCartStore(state => state.getTotalItems());
	const cart = useCartStore(state => state.cart);
	const clearCart = useCartStore(state => state.clearCart);

	const router = useRouter();

	useEffect(() => {
		setLoaded(true);

		if (totalItems === 0) {
			redirect('/');
		}
	}, []);

	const onPlaceOrder = async () => {
		setIsPlacingOrder(true);

		const productsToOrder = cart.map(product => ({
			productId: product.id,
			quantity: product.quantity,
			size: product.size,
		}));

		const resp = await placeOrder(productsToOrder, address);

		if (!resp.ok) {
			setIsPlacingOrder(false);
			setErrorMessage(resp.message);
			return;
		}

		// * Todo salió bien
		clearCart();
		router.replace(`/orders/${resp.order!.id}`);
	};

	if (!loaded) return <p>Loading....</p>;

	return (
		<div className='bg-white rounded-xl shadow-sm p-7'>
			<h2 className='text-2xl mb-2'>Dirección de entrega</h2>
			<div className=''>
				<p>
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>{address.phone}</p>
			</div>

			{/* Divider */}
			<div className='w-full bg-gray-200 h-[1px] my-10'></div>

			<h2 className='text-2xl mb-4'>Resumen de orden</h2>

			<div className='flex flex-col gap-1'>
				<div className='flex justify-between'>
					<span className='font-bold'>No. Productos</span>
					<span>{totalItems} artículos</span>
				</div>
				<div className='flex justify-between'>
					<span className='font-bold'>Subtotal</span>
					<span>{currencyFormat(subTotal)}</span>
				</div>
				<div className='flex justify-between'>
					<span className='font-bold'>Impuestos (15%)</span>
					<span>{currencyFormat(tax)}</span>
				</div>
				{/* Total */}
				<div className='flex justify-between items-center mt-4'>
					<span className='font-bold text-2xl'>Total:</span>
					<span className='text-2xl'>{currencyFormat(total)}</span>
				</div>
			</div>

			<p className='text-red-500 mt-3 mb-1'>{errorMessage}</p>

			<div className='mt-5'>
				<button
					// href='/orders/123'
					onClick={onPlaceOrder}
					className={clsx({
						'btn-primary': !isPlacingOrder,
						'btn-disabled': isPlacingOrder,
					})}
				>
					Colocar Orden
				</button>
			</div>
		</div>
	);
};
