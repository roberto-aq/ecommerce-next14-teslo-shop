'use client';

import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { authenticate } from '@/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
	// const [errorMessage, formAction, isPending] = useActionState(
	// 	authenticate,
	// 	undefined
	// );

	const [state, dispatch] = useFormState(authenticate, undefined);
	console.log(state);
	const router = useRouter();

	useEffect(() => {
		if (state === 'Success') {
			// router.replace('/');
			window.location.replace('/');
		}
	}, [state]);

	return (
		<form className='flex flex-col' action={dispatch}>
			<label htmlFor='email'>Correo electrónico</label>
			<input
				className='px-5 py-2 border bg-gray-200 rounded mb-5'
				type='email'
				name='email'
			/>

			<label htmlFor='email'>Contraseña</label>
			<input
				className='px-5 py-2 border bg-gray-200 rounded mb-5'
				type='password'
				name='password'
			/>

			{state === 'Something went wrong.' && (
				<div className='flex gap-3 items-center mb-4'>
					<IoInformationOutline className='h-5 w-5 text-red-500' />
					<p className='text-sm text-red-500'>
						Credenciales no son correctas
					</p>
				</div>
			)}

			<LoginButton />

			{/* divisor l ine */}
			<div className='flex items-center my-5'>
				<div className='flex-1 border-t border-gray-500'></div>
				<div className='px-2 text-gray-800'>O</div>
				<div className='flex-1 border-t border-gray-500'></div>
			</div>

			<Link
				href='/auth/new-account'
				className='btn-secondary text-center'
			>
				Crear una nueva cuenta
			</Link>
		</form>
	);
};

function LoginButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type='submit'
			className={clsx({
				'btn-primary': !pending,
				'btn-disabled': pending,
			})}
			disabled={pending}
		>
			Ingresar
		</button>
	);
}
