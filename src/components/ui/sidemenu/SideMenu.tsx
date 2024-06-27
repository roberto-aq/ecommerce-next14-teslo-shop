'use client';

import { logout } from '@/actions';
import { useUIStore } from '@/store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from 'react-icons/io5';

export const SideMenu = () => {
	const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
	const closeSideMenu = useUIStore(state => state.closeSideMenu);

	const { data: session } = useSession();
	const isAuthenticated = !!session?.user;

	return (
		<div>
			{/* BACKGROUND BLACK */}
			{isSideMenuOpen && (
				<div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'></div>
			)}

			{/* BlUR */}
			{isSideMenuOpen && (
				<div
					className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter 
                    backdrop-blur-sm'
					onClick={closeSideMenu}
				></div>
			)}

			{/* MENU */}
			<nav
				className={clsx(
					'fixed p-5 top-0 right-0 bg-white  h-screen w-[500px] z-20 shadow-2xl transform transition-all duration-300',
					{ 'translate-x-full': !isSideMenuOpen }
				)}
			>
				<IoCloseOutline
					className='absolute top-5 right-5 cursor-pointer'
					size={40}
					onClick={closeSideMenu}
				/>

				<div className='relative mt-14'>
					<IoSearchOutline
						size={20}
						className='absolute top-2 left-2'
					/>

					<input
						type='text'
						placeholder='Buscar'
						className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-lg border-gray-200 focus:outline-none focus:border-blue-500 '
					/>
				</div>
				{!isAuthenticated && (
					<Link
						href='/auth/login'
						className='flex items-center gap-3 mt-10 p-2 hover:bg-gray-100 rounded transition-all'
						onClick={closeSideMenu}
					>
						<IoLogInOutline size={25} />
						Ingresar
					</Link>
				)}

				{isAuthenticated && (
					<>
						<Link
							href='/profile'
							className='flex items-center gap-3 mt-10 p-2 hover:bg-gray-100 rounded transition-all'
							onClick={closeSideMenu}
						>
							<IoPersonOutline size={25} />
							Perfil
						</Link>
						<Link
							href='/orders'
							className='flex items-center gap-3 mt-10 p-2 hover:bg-gray-100 rounded transition-all'
						>
							<IoTicketOutline size={25} />
							Ordenes
						</Link>

						<button
							className='flex w-full items-center gap-3 mt-10 p-2 hover:bg-gray-100 rounded transition-all'
							onClick={async () => {
								await logout();
								window.location.replace('/');
							}}
						>
							<IoLogOutOutline size={25} />
							Salir
						</button>

						{session?.user.role === 'admin' && (
							<>
								{/* Line Separator */}
								<div className='w-full bg-gray-200 my-10 h-[1px]'></div>

								<Link
									href='/admin/products'
									className='flex items-center gap-3 mt-10 p-2 hover:bg-gray-100 rounded transition-all'
								>
									<IoShirtOutline size={25} />
									Productos
								</Link>
								<Link
									href='/admin/orders'
									className='flex items-center gap-3 mt-10 p-2 hover:bg-gray-100 rounded transition-all'
								>
									<IoTicketOutline size={25} />
									Ordenes
								</Link>
								<Link
									href='/admin/users'
									className='flex items-center gap-3 mt-10 p-2 hover:bg-gray-100 rounded transition-all'
								>
									<IoPeopleOutline size={25} />
									Usuarios
								</Link>
							</>
						)}
					</>
				)}
			</nav>
		</div>
	);
};
