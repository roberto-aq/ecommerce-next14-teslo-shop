'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getPaginatedUsers = async () => {
	const session = await auth();

	if (session?.user.role !== 'admin')
		return {
			ok: false,
			message: 'Debe de ser un usuario administrador',
		};

	try {
		const users = await prisma.user.findMany({
			orderBy: {
				name: 'desc',
			},
		});
		return {
			ok: true,
			users,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: '500 - Algo salió mal',
		};
	}
};
