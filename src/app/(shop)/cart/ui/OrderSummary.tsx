'use client';

import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { currencyFormat } from '../../../../utils/currencyFormat';

export const OrderSummary = () => {
	const [loaded, setLoaded] = useState(false);
	const { subTotal, tax, total } = useCartStore(state =>
		state.getSummaryInformation()
	);
	const totalItemsInCart = useCartStore(state =>
		state.getTotalItems()
	);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Loading...</p>;

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex justify-between'>
				<span className='font-bold'>No. Productos</span>
				<span>
					{totalItemsInCart === 1
						? '1 artículo'
						: `${totalItemsInCart} artículos`}
				</span>
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
	);
};
