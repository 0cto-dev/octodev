import useIsVisitor from '@/lib/isVisitor';
import { getSession } from 'next-auth/react';

export async function saveProgress(course: string, id: string,isVisitor: boolean) {
	if (typeof window !== 'undefined') {
		const session = await getSession();
		// Salva o progresso do usuário no curso
		if (session) {
            // Salva o progresso no banco de dados
			await fetch('/api/progress', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: session?.user?.id,
					courseName: course,
					lessonId: +id.replace('licao', ''),
				}),
			});

			// Salva a sequência diária
			await fetch('/api/streak', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: session?.user?.id,
				}),
			});
		}
        if (!session && isVisitor) {
            console.log('salvando progresso como visitante');
            // Se for visitante, salva o progresso no localStorage
            console.log(id.replace('licao', ''));
            localStorage.setItem(`lastLessonMade_${course}`, id.replace('licao', ''));
        }
	}
}
