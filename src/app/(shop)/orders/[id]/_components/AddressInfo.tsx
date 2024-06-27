import { Addres } from '@/interfaces';

interface Props {
	address: {
		address: string;
		address2: string | null;
		firstName: string;
		lastName: string;
		postalCode: string;
		phone: string;
	};
}

export const AddressInfo = ({ address }: Props) => {
	return (
		<>
			<h2 className='text-2xl mb-2'>Dirección de entrega</h2>
			<div className=''>
				<p>
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>{address.phone}</p>
			</div>
		</>
	);
};
