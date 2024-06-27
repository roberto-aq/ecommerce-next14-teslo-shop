export const generatePagination = (
	currentPage: number,
	totalPages: number
) => {
	// Si el número total de páginas es 7 o menos, vamos a mostrar todas las páginas sin puntos suspensivos
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1); //[1, 2, 3, 4, 5, 6, 7]
	}

	// Si la página actual está entre las 3 primeras páginas, mostramos las 3 primeras páginas, puntos suspensivos y las 2 últimas páginas
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages]; // [1, 2, 3, '...', 6, 7]
	}

	// Si la página actual está entre las 3 últimas páginas, mostramos las 2 primeras páginas, puntos suspensivos y las 3 últimas páginas
	if (currentPage > totalPages - 3) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]; // [1, 2, '...', 5, 6, 7]
	}

	// Si la página actual está en un lugar medio, mostrar la primera página, puntos suspensivos, página actual y vecinos
	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	];
};
