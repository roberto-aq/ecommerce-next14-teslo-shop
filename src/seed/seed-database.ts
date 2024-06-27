import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {
	// 1. Borrar registros previos
	await prisma.orderAddress.deleteMany();
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();

	await prisma.userAddress.deleteMany();
	await prisma.user.deleteMany();
	await prisma.country.deleteMany();

	await prisma.productImage.deleteMany();
	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

	const { categories, products, users, countries } = initialData;

	// Usuarios
	await prisma.user.createMany({
		data: users,
	});

	// 2. Categorías
	const categoriesData = categories.map(category => ({
		name: category,
	}));

	await prisma.category.createMany({
		data: categoriesData,
	});

	const categoriesDB = await prisma.category.findMany();

	const categoriesId = categoriesDB.reduce((acc, category) => {
		acc[category.name.toLowerCase()] = category.id;

		return acc;
	}, {} as Record<string, string>);

	// 3. Productos

	products.forEach(async product => {
		const { type, images, ...rest } = product;

		const dbProduct = await prisma.product.create({
			data: {
				...rest,
				categoryId: categoriesId[type],
			},
		});

		// Imagenes
		const imagesData = images.map(image => ({
			url: image,
			productId: dbProduct.id,
		}));

		await prisma.productImage.createMany({
			data: imagesData,
		});
	});

	// Países
	await prisma.country.createMany({
		data: countries,
	});
}

(() => {
	if (process.env.NODE_ENV === 'production') return;

	main();
})();
