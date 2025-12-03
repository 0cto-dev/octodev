import NextAuth, { DefaultSession } from 'next-auth';
import { ICourses } from '@/models/user';

declare module 'next-auth' {
	interface User {
		id: string;
		nome?: string;
		email: string;
		courses?: ICourses[];
		streak?: number;
		lastLessonDate?: string | null;
	}

	interface Session {
		user: {
			id: string;
			nome?: string;
			email: string;
			courses?: ICourses[];
			streak?: number;
			lastLessonDate?: string | null;
		} & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		nome?: string;
		email?: string;
		courses?: ICourses[];
		streak?: number;
		lastLessonDate?: string | null;
	}
}
