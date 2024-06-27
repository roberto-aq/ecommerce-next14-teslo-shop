'use client';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

export const TopMenu = () => {
	const [loaded, setLoaded] = useState(false);

	const openSideMenu = useUIStore(state => state.openSideMenu);
	const totalItemsCart = useCartStore(state => state.getTotalItems());

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<nav className='flex px-5 justify-between w-full items-center'>
			<div>
				<Link href={'/'}>
					<span
						className={`${titleFont.className} antialiased font-bold`}
					>
						Teslo
					</span>
					<span>| Shop</span>
				</Link>
			</div>

			<div className='hidden sm:flex'>
				<Link
					href='/gender/men'
					className='m-2 p-2 rounded-md hover:bg-gray-100 transition-all'
				>
					Hombres
				</Link>
				<Link
					href='/gender/women'
					className='m-2 p-2 rounded-md hover:bg-gray-100 transition-all'
				>
					Mujeres
				</Link>
				<Link
					href='/gender/kid'
					className='m-2 p-2 rounded-md hover:bg-gray-100 transition-all'
				>
					Niños
				</Link>
			</div>

			<div className='flex items-center gap-3'>
				<Link href='/search'>
					<IoSearchOutline size={24} />
				</Link>
				<Link
					href={totalItemsCart === 0 && loaded ? '/empty' : '/cart'}
				>
					<div className='relative'>
						<IoCartOutline size={24} />
						{loaded && totalItemsCart > 0 && (
							<span className='absolute text-[11px] -top-1 -right-1.5 rounded-full font-bold bg-blue-700 text-white w-4 h-4 grid place-items-center'>
								{totalItemsCart}
							</span>
						)}
					</div>
				</Link>

				<button
					className='m-2 p-2 rounded-md hover:bg-gray-100 transition-all'
					onClick={openSideMenu}
				>
					Menú
				</button>
			</div>
		</nav>
	);
};
