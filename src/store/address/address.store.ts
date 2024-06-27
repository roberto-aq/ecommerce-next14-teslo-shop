import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface AddressState {
	address: {
		firstName: string;
		lastName: string;
		address: string;
		address2?: string;
		postalCode: string;
		city: string;
		country: string;
		phone: string;
	};

	// Methods
	setAddress: (address: AddressState['address']) => void;
}

const storeApi: StateCreator<AddressState> = set => ({
	address: {
		firstName: '',
		lastName: '',
		address: '',
		postalCode: '',
		city: '',
		country: '',
		phone: '',
	},

	setAddress: address => set({ address }),
});

export const useAddressStore = create<AddressState>()(
	devtools(persist(storeApi, { name: 'address-storage' }))
);
