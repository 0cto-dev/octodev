import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb-client';
import User from '@/models/Users';
import { connectDB } from '@/lib/mongodb';
import { NextAuthOptions } from 'next-auth';
import { LinkedinProvider } from './linkedinProvider';



export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
			allowDangerousEmailAccountLinking: true,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
			allowDangerousEmailAccountLinking: true,
		}),
		LinkedinProvider({
			id: 'linkedin',
			name: 'LinkedIn',
			type: 'oauth',
			clientId: process.env.LINKEDIN_ID!,
			clientSecret: process.env.LINKEDIN_SECRET!,
			issuer: "https://www.linkedin.com",
			authorization: {
				params: {
					scope: 'openid profile email',
				},
			},
			allowDangerousEmailAccountLinking: true,
		}),
	],

	pages: {
		signIn: '/login',
	},

	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			await connectDB();
			const dbUser = await User.findById(token.id).lean();

			if (dbUser) {
				token.name = dbUser.name;
				token.email = dbUser.email;
				token.courses = dbUser.courses;
			}

			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.nome = token.nome as string;
				session.user.email = token.email as string;
				session.user.courses = token.courses as any[];
			}
			return session;
		},
	},
};
