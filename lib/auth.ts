import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb-client';
import User from '@/models/Users';
import { connectDB } from '@/lib/mongodb';
import { NextAuthOptions } from 'next-auth';
import { LinkedinProvider } from './linkedinProvider';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
			issuer: 'https://www.linkedin.com',
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
		signOut: '/logout',
	},

	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === 'linkedin' && user.image) {
				try {
					await connectDB();

					// 1. Baixar a imagem do LinkedIn como um Buffer
					const response = await fetch(user.image);
					const arrayBuffer = await response.arrayBuffer();
					const buffer = Buffer.from(arrayBuffer);

					// 2. Upload para o Cloudinary usando stream
					const uploadResponse = (await new Promise((resolve, reject) => {
						cloudinary.uploader
							.upload_stream(
								{
									folder: 'user_profiles', // Organiza em pastas
									public_id: `user_${user.email}`, // Sobrescreve se o usuário mudar a foto
									overwrite: true,
								},
								(error, result) => {
									if (error) reject(error);
									else resolve(result);
								},
							)
							.end(buffer);
					})) as any;

					// 3. Atualizar o banco com a URL permanente do Cloudinary
					const permanentImageUrl = uploadResponse.secure_url;
					await User.updateOne({ email: user.email }, { $set: { image: permanentImageUrl } });

					// Atualizamos o objeto user para que o restante do callback
					// e o JWT usem a nova URL imediatamente
					user.image = permanentImageUrl;
				} catch (error) {
					console.error('Erro ao processar imagem do LinkedIn:', error);
				}
			}
			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			await connectDB();
			const dbUser = await User.findById(token.id).lean();

			if (dbUser) {
				token.name = dbUser.name;
				token.email = dbUser.email;
				token.picture = dbUser.image;
				token.courses = dbUser.courses;
				token.streak = dbUser.streak;
				token.lastLessonDate = dbUser.lastLessonDate;
			}

			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
				session.user.email = token.email as string;
				session.user.image = token.picture as string;
				session.user.courses = token.courses as any[];
				session.user.streak = token.streak as number;
				session.user.lastLessonDate = token.lastLessonDate as string | undefined;
			}
			return session;
		},
	},
};
