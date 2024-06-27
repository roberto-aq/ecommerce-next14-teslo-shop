import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (session?.user) {
		redirect('/');
	}

	console.log(session);

	return (
		<main className=' flex justify-center'>
			<div className='w-full px-10 sm:w-[350px]'>{children}</div>
		</main>
	);
}
