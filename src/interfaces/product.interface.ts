export interface Product {
	id: string;
	title: string;
	description: string;
	inStock: number;
	price: number;
	images: string[];
	sizes: Size[];
	slug: string;
	tags: string[];
	// type: ValidType;
	gender: Category;
}

export interface CartProduct {
	id: string;
	slug: string;
	title: string;
	price: number;
	quantity: number;
	size: Size;
	image: string;
}

export type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidType = 'shirts' | 'pants' | 'hoodies' | 'hats';
