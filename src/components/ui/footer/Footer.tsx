import { titleFont } from '@/config/fonts';
import Link from 'next/link';

export const Footer = () => {
	return (
		<div className='flex w-full justify-center text-xs mb-10 gap-4'>
			<Link href={'/'}>
				<span
					className={`${titleFont.className} antialiased font-bold`}
				>
					Teslo
				</span>
				<span>| Shop @ 2024</span>
			</Link>

			<Link href='/' className='hover:underline font-medium'>
				Privacidad & Legal
			</Link>
			<Link href='/' className='hover:underline font-medium'>
				Ubicaciones
			</Link>
		</div>
	);
};
