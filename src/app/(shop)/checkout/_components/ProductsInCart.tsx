'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '../../../../utils/currencyFormat';

export const ProductsInCart = () => {
	const productsInCart = useCartStore(state => state.cart);

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <p>Loading</p>;

	return (
		<>
			{productsInCart.map(product => (
				<div
					key={`${product.slug}-${product.size}`}
					className='flex gap-5 items-center '
				>
					<Image
						src={`/products/${product.image}`}
						alt={product.title}
						width={100}
						height={100}
						className='rounded'
					/>

					<div>
						<span className=''>{product.title}</span>
						<p>Talla: {product.size}</p>
						<p className='my-2 font-medium'>
							{currencyFormat(product.price)} x {product.quantity}
						</p>
						<p className='font-bold'>
							Subtotal:{' '}
							{currencyFormat(product.price * product.quantity)}
						</p>
					</div>
				</div>
			))}
		</>
	);
};
