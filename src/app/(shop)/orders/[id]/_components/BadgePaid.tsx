import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
	isPaid: boolean;
}

export const BadgePaid = ({ isPaid }: Props) => {
	return (
		<div
			className={clsx(
				'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
				{
					'bg-green-700': isPaid,
					'bg-red-500': !isPaid,
				}
			)}
		>
			<IoCardOutline size={30} />
			{/* <span className='mx-2'>Pendiente de pago</span> */}
			<span className='mx-2'>{isPaid ? 'Pagada' : 'Sin Pagar'}</span>
		</div>
	);
};
