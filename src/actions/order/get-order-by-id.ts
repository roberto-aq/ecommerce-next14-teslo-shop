'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {
	const session = await auth();

	if (!session?.user.id)
		return {
			ok: false,
			message: 'Debe de estar autenticado',
		};

	try {
		const order = await prisma.order.findUnique({
			where: { id },
			include: {
				OrderAddress: true,
				OrderItem: {
					select: {
						price: true,
						size: true,
						quantity: true,

						product: {
							select: {
								title: true,
								slug: true,

								ProductImage: {
									select: {
										url: true,
									},
									take: 1,
								},
							},
						},
					},
				},
			},
		});

		if (!order) throw new Error(`La orden con el ID ${id} no existe`);

		if (session.user.role === 'user') {
			if (session.user.id !== order.userId) {
				throw `${id} no existe`;
			}
		}

		return {
			ok: true,
			order,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: 'Orden no existe',
		};
	}
};
