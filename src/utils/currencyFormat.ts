export const currencyFormat = (value: number) => {
	return new Intl.NumberFormat('en-us', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
};
