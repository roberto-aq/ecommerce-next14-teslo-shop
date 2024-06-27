import { getOrderById } from '@/actions';
import { PaypalButton, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { BadgePaid } from './_components/BadgePaid';
import { AddressInfo } from './_components/AddressInfo';
import { Summary } from './_components/Summary';

interface Props {
	params: {
		id: string;
	};
}

export default async function OrderPage({ params }: Props) {
	const { id } = params;

	// Server Action
	const { ok, order } = await getOrderById(id);

	if (!ok) redirect('/');

	// TODO: Verificar
	// Redirect("/")

	return (
		<div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
			<div className='flex flex-col w-[1000px]'>
				<Title title={`Orden #${id.slice(0, 8)}`} />

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
					{/* Carrito */}
					<div className='flex flex-col mt-5  gap-4'>
						<BadgePaid isPaid={order!.isPaid} />

						{order!.OrderItem.map(item => (
							<div
								key={`${item.product.slug}-${item.size}`}
								className='flex gap-5 items-center '
							>
								<Image
									src={`/products/${item.product.ProductImage[0].url}`}
									alt={item.product.title}
									width={100}
									height={100}
									className='rounded'
								/>

								<div>
									<p>{item.product.title}</p>
									<p className='my-2 font-medium'>
										{currencyFormat(item.price)} x {item.quantity}
									</p>
									<p className='font-bold'>
										Subtotal:{' '}
										{currencyFormat(item.price * item.quantity)}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Checkout */}
					<div className='bg-white rounded-xl shadow-sm p-7'>
						<AddressInfo
							address={{
								address: order!.OrderAddress!.address,
								address2: order!.OrderAddress!.address2,
								firstName: order!.OrderAddress!.firstName,
								lastName: order!.OrderAddress!.lastName,
								postalCode: order!.OrderAddress!.postalCode,
								phone: order!.OrderAddress!.phone,
							}}
						/>

						{/* Divider */}
						<div className='w-full bg-gray-200 h-[1px] my-10'></div>

						<Summary
							totalItems={order!.itemsInOrder}
							subTotal={order!.subTotal}
							tax={order!.tax}
							total={order!.total}
						/>

						<div className='mt-5'>
							{order!.isPaid ? (
								<BadgePaid isPaid={order!.isPaid} />
							) : (
								<PaypalButton
									amount={order!.total}
									orderId={order!.id}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
