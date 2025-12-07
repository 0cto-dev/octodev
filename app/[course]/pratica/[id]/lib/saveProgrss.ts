import { getSession } from "next-auth/react";

export async function saveProgress(course: string, id: string) {
    if (typeof window !== 'undefined') {
        const session = await getSession();
        // Salva o progresso do usuário no curso
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
        console.log('test');

        // Salva a sequência diária
        await fetch('/api/streak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: session?.user?.id,
            }),
        });
    }
}
