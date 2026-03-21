import { connectDB } from '@/lib/mongodb';
import User from '@/models/Users';
import getCourseName from '@/lib/getCourseName';
import coursesData from '@/data/courses.json';

function normalizeCourseName(courseName: string) {
	if (!courseName || typeof courseName !== 'string') return '';

	try {
		const decoded = decodeURIComponent(courseName);
		return decoded
			.trim()
			.toLowerCase()
			.replace(/^\/+|\/+$/g, '');
	} catch {
		return courseName
			.trim()
			.toLowerCase()
			.replace(/^\/+|\/+$/g, '');
	}
}

const validCourseNames = new Set((coursesData || []).map(course => normalizeCourseName(getCourseName(course.nome))));

function sanitizeCourses(courses: any[]) {
	const safeCourses = Array.isArray(courses) ? courses : [];
	const uniqueCourses = new Map<string, { courseName: string; lastLessonMade: number; progress: number }>();

	for (const course of safeCourses) {
		const normalizedName = normalizeCourseName(String(course?.courseName || ''));
		if (!validCourseNames.has(normalizedName)) continue;

		const lastLessonMade = Number(course?.lastLessonMade) || 0;
		const progressRaw = Number(course?.progress);
		const progress = Number.isFinite(progressRaw) ? Math.min(100, Math.max(0, progressRaw)) : 0;

		const current = uniqueCourses.get(normalizedName);
		if (!current) {
			uniqueCourses.set(normalizedName, {
				courseName: normalizedName,
				lastLessonMade,
				progress,
			});
			continue;
		}

		uniqueCourses.set(normalizedName, {
			courseName: normalizedName,
			lastLessonMade: Math.max(current.lastLessonMade, lastLessonMade),
			progress: Math.max(current.progress, progress),
		});
	}

	return Array.from(uniqueCourses.values());
}

export async function POST(req: Request) {
	try {
		await connectDB();

		const { userId, courseName, lessonId, progress } = await req.json();
		if (!userId || !courseName || lessonId === undefined) {
			return new Response('Missing parameters', { status: 400 });
		}

		const normalizedCourseName = normalizeCourseName(courseName);
		if (!validCourseNames.has(normalizedCourseName)) {
			return new Response('Invalid courseName', { status: 400 });
		}

		const lessonIdNumber = Number(lessonId);
		if (!Number.isFinite(lessonIdNumber) || lessonIdNumber < 0) {
			return new Response('Invalid lessonId', { status: 400 });
		}

		const progressNumberRaw = Number(progress);
		const progressNumber = Number.isFinite(progressNumberRaw) ? Math.min(100, Math.max(0, progressNumberRaw)) : 0;

		const user = await User.findById(userId);

		if (!user) {
			return new Response('User not found', { status: 404 });
		}

		user.courses = sanitizeCourses(user.courses);

		// verifica se o usuário já tem progresso do curso
		const courseIndex = user.courses.findIndex((c: any) => c.courseName === normalizedCourseName);

		if (courseIndex === -1) {
			// Caso não tenha progresso
			user.courses.push({
				courseName: normalizedCourseName,
				lastLessonMade: lessonIdNumber,
				progress: 0, // calculado apenas na trilha pois a página de exercícios(que chama a função saveProgress) não tem acesso ao total de lições
			});
		} else {
			user.courses[courseIndex].progress = progressNumber;
			if (lessonIdNumber > user.courses[courseIndex].lastLessonMade) {
				user.courses[courseIndex].lastLessonMade = lessonIdNumber;
			}
			// Adiciona/remover certificado automaticamente
			if (progressNumber === 100) {
				if (!user.certificates) user.certificates = [];
				if (!user.certificates.includes(normalizedCourseName)) {
					user.certificates.push(normalizedCourseName);
				}
			} else {
				// Remove certificado se progresso cair abaixo de 100
				if (user.certificates && user.certificates.includes(normalizedCourseName)) {
					user.certificates = user.certificates.filter((c: string) => c !== normalizedCourseName);
				}
			}
		}
		await user.save();

		return Response.json({ success: true });
	} catch (err) {
		console.log(err);
		return new Response('Server error: ' + err, { status: 500 });
	}
}
