import prisma from '@/lib/prisma';
import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';

const authenticateRoutes = ['/checkout/address', '/profile'];


export const authConfig: NextAuthConfig = {
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/new-account',
	},
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.data = user;
			}

			return token;
		},

		session: ({ session, token, user }) => {
			session.user = token.data as any;

			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const { pathname } = nextUrl;

			const isProtectedRoute = authenticateRoutes.some(route =>
				pathname.startsWith(route)
			);

			if (isProtectedRoute) {
				if (!isLoggedIn) return false;
				return true;
			}

			// const isOnDashboard = nextUrl.pathname.startsWith('/checkout');
			// if (isOnDashboard) {
			// 	if (isLoggedIn) return true;
			// 	return false; // Redirect unauthenticated users to login page
			// } else if (isLoggedIn) {
			// 	return Response.redirect(new URL('/checkout', nextUrl));
			// }
			return true;
		},
	},

	providers: [
		Credentials({
			async authorize(credentials, request) {
				const parsedCredentials = z
					.object({
						email: z.string().email(),
						password: z.string().min(6),
					})
					.safeParse(credentials);

				if (!parsedCredentials.success) return null;

				const { email, password } = parsedCredentials.data;

				const user = await prisma.user.findUnique({
					where: { email: email.toLowerCase() },
				});

				if (!user) return null;

				if (!bcryptjs.compareSync(password, user.password))
					return null;

				// Regresar al usuario sin password
				const { password: _, ...rest } = user;

				return rest;
			},
		}),
	],
};

export const { handlers, signIn, signOut, auth } =
	NextAuth(authConfig);
