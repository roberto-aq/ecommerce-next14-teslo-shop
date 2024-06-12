import {
	MobileSlideshow,
	QuantitySelector,
	SizeSelector,
	SlideShow,
} from '@/components';
import { titleFont } from '@/config/fonts';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';

interface Props {
	params: {
		slug: string;
	};
}

export default function ProductPage({ params }: Props) {
	const { slug } = params;

	const product = initialData.products.find(
		product => product.slug === slug
	);

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
				<h1
					className={`${titleFont.className} antialiased font-bold text-xl`}
				>
					{product.title}
				</h1>
				<p className='text-lg mb-5 font-medium'>${product.price}</p>

				{/* Selector de tallas */}
				<SizeSelector
					selectedSize={product.sizes[0]}
					availableSizes={product.sizes}
				/>

				{/* Selector de cantidad */}
				<QuantitySelector quantity={3} />

				{/* BUTTON */}
				<button className='btn-primary my-5'>
					Agregar al carrito
				</button>

				{/* DESCRIPTION */}
				<h3 className='font-bold text-sm'>Descripción</h3>
				<p className='font-light'>{product.description}</p>
			</div>
		</div>
	);
}
