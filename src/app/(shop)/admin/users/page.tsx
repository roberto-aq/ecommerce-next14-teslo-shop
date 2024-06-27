import { Title } from '@/components';
import { UsersTable } from './_components/UsersTable';
import { getPaginatedUsers } from '@/actions';
import { redirect } from 'next/navigation';

export default async function AdminUsersPage() {
	const { ok, users = [] } = await getPaginatedUsers();

	if (!ok) return redirect('/auth/login');

	return (
		<>
			<Title title='Mantenimiento de usuarios' />

			<div className='mb-10'>
				<UsersTable users={users} />
			</div>
		</>
	);
}
