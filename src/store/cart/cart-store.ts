import { CartProduct } from '@/interfaces';
import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface CartState {
	cart: CartProduct[];

	getTotalItems: () => number;
	getSummaryInformation: () => {
		subTotal: number;
		tax: number;
		total: number;
	};

	addProductToCart: (product: CartProduct) => void;
	updateProductToCart: (
		product: CartProduct,
		quantity: number
	) => void;
	removeProduct: (product: CartProduct) => void;

	clearCart: () => void;
}

const storeApi: StateCreator<CartState> = (set, get) => ({
	cart: [],

	getTotalItems: () => {
		const { cart } = get();

		return cart.reduce((acc, item) => acc + item.quantity, 0);
	},

	getSummaryInformation: () => {
		const { cart } = get();

		const subTotal = cart.reduce(
			(acc, product) => product.quantity * product.price + acc,
			0
		);

		const tax = subTotal * 0.15;
		const total = subTotal + tax;

		return {
			subTotal,
			tax,
			total,
		};
	},

	addProductToCart: product => {
		const { cart } = get();

		const producInCart = cart.some(
			item => item.id === product.id && item.size === product.size
		);

		if (!producInCart) {
			set({ cart: [...cart, product] });
			return;
		}

		const updatedCart = cart.map(item =>
			item.id === product.id && item.size === product.size
				? { ...item, quantity: item.quantity + product.quantity }
				: item
		);

		console.log(updatedCart);

		set({ cart: updatedCart });
	},

	updateProductToCart: (product: CartProduct, quantity: number) => {
		const { cart } = get();

		const updatedCart = cart.map(item =>
			item.id === product.id && item.size === product.size
				? { ...item, quantity: quantity }
				: item
		);

		set({ cart: updatedCart });
	},
	removeProduct: product => {
		const { cart } = get();

		const updatedCart = cart.filter(
			item => !(item.id === product.id && item.size === product.size)
		);

		set({ cart: updatedCart });
	},

	clearCart: () => {
		set({ cart: [] });
	},
});

export const useCartStore = create<CartState>()(
	devtools(persist(storeApi, { name: 'cart-store' }))
);
