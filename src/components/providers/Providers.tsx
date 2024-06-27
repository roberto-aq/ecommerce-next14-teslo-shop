'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<PayPalScriptProvider
			options={{
				clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
				intent: 'capture',
				currency: 'USD',
			}}
		>
			<SessionProvider>{children}</SessionProvider>
		</PayPalScriptProvider>
	);
};
