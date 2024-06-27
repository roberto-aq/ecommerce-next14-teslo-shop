export const revalidate = 6040800;

import { getProductBySlug } from '@/actions';
import { MobileSlideshow, SlideShow, StockLabel } from '@/components';
import { titleFont } from '@/config/fonts';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { AddToCart } from './ui/AddToCart';

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const slug = params.slug;

	// fetch data
	const product = await getProductBySlug(slug);

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];

	return {
		title: product?.title ?? 'Producto no encontrado',
		description: product?.description ?? '',
		openGraph: {
			title: product?.title ?? 'Producto no encontrado',
			description: product?.description ?? '',
			images: [` /products/${product?.images[1]}`],
		},
	};
}

export default async function ProductPage({ params }: Props) {
	const { slug } = params;

	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	return (
		<div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
			{/* SlideShow */}
			<div className='col-span-1 md:col-span-2 '>
				{/* Mobile */}
				<MobileSlideshow
					images={product.images}
					title={product.title}
					className='block md:hidden'
				/>

				{/* Desktop */}
				<SlideShow
					images={product.images}
					title={product.title}
					className='hidden md:block'
				/>
			</div>

			{/* DETALLES */}
			<div className='col-span-1 px-5 '>
				<StockLabel slug={slug} />
				<h1
					className={`${titleFont.className} antialiased font-bold text-xl`}
				>
					{product.title}
				</h1>
				<p className='text-lg mb-5 font-medium'>${product.price}</p>

				<AddToCart product={product} />

				{/* DESCRIPTION */}
				<h3 className='font-bold text-sm'>Descripción</h3>
				<p className='font-light'>{product.description}</p>
			</div>
		</div>
	);
}
