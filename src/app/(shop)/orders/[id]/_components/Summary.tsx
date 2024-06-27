import { currencyFormat } from '@/utils';

interface Props {
	totalItems: number;
	tax: number;
	subTotal: number;
	total: number;
}

export const Summary = ({
	totalItems,
	total,
	tax,
	subTotal,
}: Props) => {
	return (
		<>
			<h2 className='text-2xl mb-4'>Resumen de orden</h2>

			<div className='flex flex-col gap-1'>
				<div className='flex justify-between'>
					<span className='font-bold'>No. Productos</span>
					<span>{totalItems} artículos</span>
				</div>
				<div className='flex justify-between'>
					<span className='font-bold'>Subtotal</span>
					<span>{currencyFormat(subTotal)}</span>
				</div>
				<div className='flex justify-between'>
					<span className='font-bold'>Impuestos (15%)</span>
					<span>{currencyFormat(tax)}</span>
				</div>
				{/* Total */}
				<div className='flex justify-between items-center mt-4'>
					<span className='font-bold text-2xl'>Total:</span>
					<span className='text-2xl'>{currencyFormat(total)}</span>
				</div>
			</div>
		</>
	);
};
