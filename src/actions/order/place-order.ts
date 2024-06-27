'use server';

import { auth } from '@/auth';
import type { Addres, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
	productId: string;
	quantity: number;
	size: Size;
}

export const placeOrder = async (
	productIds: ProductToOrder[],
	address: Addres
) => {
	const session = await auth();
	const userId = session?.user.id;

	// Verificar sesión de usuario
	if (!userId)
		return { ok: false, message: 'No hay sesión de usuario' };

	try {
		// Obtener la información de los productos
		// Nota: Se puede llevar 2 o más producto con el mismo ID, esto por la talla
		const products = await prisma.product.findMany({
			where: {
				id: {
					in: productIds.map(p => p.productId),
				},
			},
		});

		// Calcular los montos
		const itemsInOrder = productIds.reduce(
			(acc, product) => acc + product.quantity,
			0
		);

		// Totales => Tax, Subtotal, total
		const { subTotal, tax, total } = productIds.reduce(
			(acc, item) => {
				const productQuantity = item.quantity;
				const product = products.find(p => p.id === item.productId);

				if (!product)
					throw new Error(`${item.productId} no existe - 500`);

				const subTotal = product.price * productQuantity;

				acc.subTotal += subTotal;
				acc.tax += subTotal * 0.15;
				acc.total += subTotal * 1.15;

				return acc;
			},
			{ subTotal: 0, tax: 0, total: 0 }
		);

		// Crear la transacción en base de datos
		const prismaTx = await prisma.$transaction(async tx => {
			// 1. Actualizar el stock de los productos
			const updatedProductsPromises = products.map(product => {
				// Acumular los valores
				const productQuantity = productIds
					.filter(p => p.productId == product.id)
					.reduce((acc, item) => item.quantity + acc, 0);

				if (productQuantity === 0)
					throw new Error(`${product.id} no tiene cantidad definida`);

				return tx.product.update({
					where: { id: product.id },
					data: {
						// inStock: product.inStock - productQuantity -> no hacer
						inStock: {
							decrement: productQuantity,
						},
					},
				});
			});

			const updatedProducts = await Promise.all(
				updatedProductsPromises
			);
			// Verificar valores negativos en las existencias -> NO hay stock
			updatedProducts.forEach(product => {
				if (product.inStock < 0) {
					throw new Error(
						`${product.title} no tiene inventario suficiente`
					);
				}
			});

			// 2. Crear la orden - Encabezado - Detalles
			const order = await tx.order.create({
				data: {
					userId,
					itemsInOrder,
					subTotal,
					tax,
					total,
					OrderItem: {
						createMany: {
							data: productIds.map(p => ({
								quantity: p.quantity,
								size: p.size,
								productId: p.productId,
								price:
									products.find(product => product.id === p.productId)
										?.price ?? 0,
							})),
						},
					},
				},
			});

			// Validar, Si el price es 0 lanzar un error

			// 3. Crear la dirección de la orden
			const { country, ...restAddress } = address;

			const orderAddress = await tx.orderAddress.create({
				data: {
					...restAddress,
					countryId: country,
					orderId: order.id,
				},
			});

			return {
				updatedProducts: updatedProducts,
				order: order,
				orderAddress: orderAddress,
			};
		});

		return {
			ok: true,
			order: prismaTx.order,
			prismaTx,
		};
	} catch (error: any) {
		console.log(error);
		return {
			ok: false,
			message: error?.message,
		};
	}
};
