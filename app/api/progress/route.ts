import { connectDB } from '@/lib/mongodb';
import User from '@/models/Users';

export async function POST(req: Request) {
	try {
		await connectDB();

		const { userId, courseName, lessonId, progress } = await req.json();
		console.log(progress);
		if (!userId || !courseName || lessonId === undefined) {
			return new Response('Missing parameters', { status: 400 });
		}

		const user = await User.findById(userId);

		if (!user) {
			return new Response('User not found', { status: 404 });
		}

		// verifica se o usuário já tem progresso do curso
		const courseIndex = user.courses.findIndex((c: any) => c.courseName === courseName);

		if (courseIndex === -1) {
			// Caso não tenha progresso
			user.courses.push({
				courseName,
				lastLessonMade: lessonId,
				progress: 0, // calculado apenas na trilha pois a página de exercícios(que chama a função saveProgress) não tem acesso ao total de lições
			});
		} else {
      user.courses[courseIndex].progress = progress;
			if (lessonId > user.courses[courseIndex].lastLessonMade) {
				user.courses[courseIndex].lastLessonMade = lessonId;
			}
		}
		await user.save();

		return Response.json({ success: true });
	} catch (err) {
		console.log(err);
		return new Response('Server error: ' + err, { status: 500 });
	}
}
