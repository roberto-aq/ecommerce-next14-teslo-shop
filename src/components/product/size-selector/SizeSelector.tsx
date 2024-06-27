import type { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
	selectedSize?: Size;
	availableSizes: Size[];

	onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({
	selectedSize,
	availableSizes,
	onSizeChanged,
}: Props) => {
	return (
		<div className='my-5'>
			<h3 className='font-bold mb-4 text-md'>Tallas disponibles:</h3>

			<div className='flex'>
				{availableSizes.map(size => (
					<button
						key={size}
						className={clsx(
							'mx-2 font-bold hover:underline text-sm',
							{
								underline: size === selectedSize,
							}
						)}
						onClick={() => onSizeChanged(size)}
					>
						{size}
					</button>
				))}
			</div>
		</div>
	);
};
