'use client';

import { createUpdateProduct } from '@/actions';
import { deleteProductImage } from '@/actions/product/delete-product-image';
import { ProductImage as ProductImageComponent } from '@/components';
import { Product } from '@/interfaces';
import { ProductImage } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface Props {
	product: Partial<Product> & { ProductImage?: ProductImage[] };
	categories: { id: string; name: string }[];
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FormInputs {
	title: string;
	description: string;
	slug: string;
	price: number;
	inStock: number;
	sizes: string[];
	tags: string;
	gender: 'men' | 'women' | 'kid' | 'unisex';
	categoryId: string;

	images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { isValid },
		getValues,
		setValue,
		watch,
	} = useForm<FormInputs>({
		defaultValues: {
			...product,
			tags: product.tags?.join(', '),
			sizes: product.sizes ?? [],
			images: undefined,
		},
	});

	watch('sizes');

	const router = useRouter();

	const onSizeChanged = (size: string) => {
		const sizes = new Set(getValues('sizes'));
		sizes.has(size) ? sizes.delete(size) : sizes.add(size);

		setValue('sizes', Array.from(sizes));
	};

	const onSubmit = async (data: FormInputs) => {
		const formData = new FormData();

		const { images, ...productToSave } = data;

		if (product.id) {
			formData.append('id', product.id);
		}
		formData.append('title', productToSave.title);
		formData.append('slug', productToSave.slug);
		formData.append('description', productToSave.description);
		formData.append('price', productToSave.price.toString());
		formData.append('inStock', productToSave.inStock.toString());
		formData.append('sizes', productToSave.sizes.toString());
		formData.append('tags', productToSave.tags);
		formData.append('categoryId', productToSave.categoryId);
		formData.append('gender', productToSave.gender);

		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append('images', images[i]);
			}
		}

		const { ok, product: updatedProduct } = await createUpdateProduct(
			formData
		);

		if (!ok) {
			alert('No se pudó actualizar el producto');
			return;
		}

		router.replace(`/admin/product/${updatedProduct?.slug}`);
	};

	return (
		<form
			className='grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3'
			onSubmit={handleSubmit(onSubmit)}
		>
			{/* Textos */}
			<div className='w-full'>
				<div className='flex flex-col mb-2'>
					<span>Título</span>
					<input
						type='text'
						className='p-2 border rounded-md bg-gray-200'
						{...register('title', { required: true })}
					/>
				</div>

				<div className='flex flex-col mb-2'>
					<span>Slug</span>
					<input
						type='text'
						className='p-2 border rounded-md bg-gray-200'
						{...register('slug', { required: true })}
					/>
				</div>

				<div className='flex flex-col mb-2'>
					<span>Descripción</span>
					<textarea
						rows={5}
						className='p-2 border rounded-md bg-gray-200'
						{...register('description', { required: true })}
					></textarea>
				</div>

				<div className='flex flex-col mb-2'>
					<span>Price</span>
					<input
						type='number'
						className='p-2 border rounded-md bg-gray-200'
						{...register('price', { required: true, min: 0 })}
					/>
				</div>

				<div className='flex flex-col mb-2'>
					<span>Tags</span>
					<input
						type='text'
						className='p-2 border rounded-md bg-gray-200'
						{...register('tags', { required: true })}
					/>
				</div>

				<div className='flex flex-col mb-2'>
					<span>Gender</span>
					<select
						className='p-2 border rounded-md bg-gray-200'
						{...register('gender', { required: true })}
					>
						<option value=''>[Seleccione]</option>
						<option value='men'>Men</option>
						<option value='women'>Women</option>
						<option value='kid'>Kid</option>
						<option value='unisex'>Unisex</option>
					</select>
				</div>

				<div className='flex flex-col mb-2'>
					<span>Categoria</span>
					<select
						className='p-2 border rounded-md bg-gray-200'
						{...register('categoryId', { required: true })}
					>
						<option value=''>[Seleccione]</option>
						{categories.map(category => (
							<option value={category.id} key={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<button type='submit' className='btn-primary w-full'>
					Guardar
				</button>
			</div>

			{/* Selector de tallas y fotos */}
			<div className='w-full'>
				<div className='flex flex-col mb-2'>
					<span>Inventario</span>
					<input
						type='number'
						className='p-2 border rounded-md bg-gray-200'
						{...register('inStock', { required: true, min: 0 })}
					/>
				</div>
				{/* As checkboxes */}
				<div className='flex flex-col'>
					<span>Tallas</span>
					<div className='flex flex-wrap'>
						{sizes.map(size => (
							// bg-blue-500 text-white <--- si está seleccionado
							<div
								key={size}
								onClick={() => onSizeChanged(size)}
								className={clsx(
									'flex  items-center justify-center w-10 h-10 mr-2 border rounded-md transition-all p-2 cursor-pointer hover:bg-blue-500 hover:text-white',
									{
										'bg-blue-500 text-white':
											getValues('sizes').includes(size),
									}
								)}
							>
								<span>{size}</span>
							</div>
						))}
					</div>

					<div className='flex flex-col mb-2'>
						<span>Fotos</span>
						<input
							type='file'
							multiple
							className='p-2 border rounded-md bg-gray-200'
							accept='image/png, image/jpeg, image/avif'
							{...register('images')}
						/>
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
						{product.ProductImage?.map(image => (
							<div key={image.id} className='space-y-2'>
								<ProductImageComponent
									src={image.url}
									width={200}
									height={200}
									className='rounded-md shadow-sm'
									alt={product.title ?? ''}
								/>
								<button
									type='button'
									className='bg-red-500 text-white text-sm w-full rounded-sm p-1 hover:opacity-90'
									onClick={() =>
										deleteProductImage(image.id, image.url)
									}
								>
									Eliminar
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</form>
	);
};
