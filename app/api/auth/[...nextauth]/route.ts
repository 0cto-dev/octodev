import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb-client';

const handler = NextAuth({
	adapter: MongoDBAdapter(clientPromise),

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
	],
	pages: {
		signIn: '/login',
	},

	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async session({ session, token }) {
			if (token.sub) {
				(session as any).user.id = token.sub;
			}
			return session;
		},
	},
});

export { handler as GET, handler as POST };
