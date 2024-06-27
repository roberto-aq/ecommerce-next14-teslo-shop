'use client';

import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
	const productsInCart = useCartStore(state => state.cart);
	const updateProductToCart = useCartStore(
		state => state.updateProductToCart
	);
	const removeProduct = useCartStore(state => state.removeProduct);

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
					<ProductImage
						src={product.image}
						alt={product.title}
						width={100}
						height={100}
						className='rounded'
					/>

					<div>
						<Link
							href={`/product/${product.slug}`}
							className='hover:underline cursor-pointer'
						>
							{product.title}
						</Link>
						<p>Talla: {product.size}</p>
						<p className='my-2 font-medium'>${product.price}</p>
						<QuantitySelector
							quantity={product.quantity}
							onQuantityChange={value => {
								console.log(value);
								updateProductToCart(product, value);
							}}
						/>

						<button
							className='underline text-sm mt-2'
							onClick={() => {
								removeProduct(product);
							}}
						>
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	);
};
