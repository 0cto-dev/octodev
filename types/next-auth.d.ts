import NextAuth, { DefaultSession } from 'next-auth';
import { ICourses } from '@/models/Users';

declare module 'next-auth' {
	interface User {
		id: string;
		name?: string | null;
		nickname?: string;
		email: string;
		courses?: ICourses[];
		streak?: number;
		lastLessonDate?: string | null;
		role?: 'Aluno' | 'Contratante';
		linkedin?: string;
		github?: string;
		bio?: string;
		empresa?: string;
		descricaoContratante?: string;
	}

	interface Session {
		user: {
			id: string;
			name?: string | null;
			nickname?: string;
			email: string;
			courses?: ICourses[];
			streak?: number;
			lastLessonDate?: string | null;
			role?: 'Aluno' | 'Contratante';
			linkedin?: string;
			github?: string;
			bio?: string;
			empresa?: string;
			descricaoContratante?: string;
			image?: string;
		} & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		name?: string | null;
		email?: string;
		courses?: ICourses[];
		streak?: number;
		lastLessonDate?: string | null;
		role?: 'Aluno' | 'Contratante';
		nickname?: string;
		linkedin?: string;
		github?: string;
		bio?: string;
		empresa?: string;
		descricaoContratante?: string;
	}
}
