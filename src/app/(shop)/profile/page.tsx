import { auth } from '@/auth';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
	const session = await auth();

	// if (!session?.user) {
	// 	redirect('/');
	// }

	return (
		<div>
			<Title title='Perfil' />

			<pre>{JSON.stringify(session?.user, null, 2)}</pre>

			<h1 className='capitalize font-bold my-3 text-2xl'>
				{session?.user.role}
			</h1>
		</div>
	);
}
