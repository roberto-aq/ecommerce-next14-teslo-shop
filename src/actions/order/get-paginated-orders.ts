'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getPaginatedOrders = async () => {
	const session = await auth();

	if (!session?.user.id)
		return {
			ok: false,
			message: 'Debe de estar autenticado',
		};

	if (session.user.role !== 'admin')
		return {
			ok: false,
			message: 'El usuario debe ser administrador',
		};

	const orders = await prisma.order.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			OrderAddress: {
				select: {
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return {
		ok: true,
		orders,
	};
};
