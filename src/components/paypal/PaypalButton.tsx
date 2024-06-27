'use client';

import {
	PayPalButtons,
	usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import {
	CreateOrderData,
	CreateOrderActions,
	OnApproveData,
	OnApproveActions,
} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
	orderId: string;
	amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
	const [{ isPending }] = usePayPalScriptReducer();

	const roundedAmount = Math.round(amount * 100) / 100;

	if (isPending) {
		return (
			<div className='animate-pulse flex flex-col gap-4 mb-10'>
				<div className='h-11 bg-gray-300 rounded'></div>
				<div className='h-11 bg-gray-300 rounded'></div>
			</div>
		);
	}

	const createOrder = async (
		data: CreateOrderData,
		actions: CreateOrderActions
	): Promise<string> => {
		const transactionId = await actions.order.create({
			intent: 'CAPTURE',
			purchase_units: [
				{
					invoice_id: orderId,
					amount: {
						value: `${roundedAmount.toString()}`,
						currency_code: 'USD',
					},
				},
			],
		});

		const { ok, message } = await setTransactionId(
			orderId,
			transactionId
		);

		if (!ok) {
			throw Error(message);
		}

		return transactionId;
	};

	const onApprove = async (
		data: OnApproveData,
		actions: OnApproveActions
	) => {
		const details = await actions.order?.capture();

		if (!details) return;

		await paypalCheckPayment(details.id!);
	};

	return (
		<PayPalButtons createOrder={createOrder} onApprove={onApprove} />
	);
};
