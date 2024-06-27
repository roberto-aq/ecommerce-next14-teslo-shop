'use client';

'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<div className='flex-1'>
			<h1>Something wrong!</h1>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
