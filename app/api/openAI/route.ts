import { courseType, emptyCourse } from '@/types/types';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const message = searchParams.get('message') || '';
		console.log('teste teste testando');
		const avaliableCourses = JSON.parse(searchParams.get('avaliableCourses') || '[]');

		console.log('teste teste testissimo', avaliableCourses);

		if (!message.trim() || !avaliableCourses[0])
			return NextResponse.json({ error: 'Mensagem vazia' }, { status: 400 });

		const response = await runOpenAI(message, avaliableCourses as courseType[]);
		console.log('Resposta da IA:', response);

		return NextResponse.json({ response }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Não foi possivel obter resposta da AI: ' + error }, { status: 500 });
	}
}

async function runOpenAI(message: string, avaliableCourses: courseType[]): Promise<string> {
	try {
		const openai = new OpenAI({
			baseURL: ' https://generativelanguage.googleapis.com/v1beta/openai/',
			apiKey: process.env.GOOGLE_AI_API_KEY || '',
		});

		const completion = await openai.chat.completions.create({
			model: 'gemini-2.5-flash',
			messages: [
				{
					role: 'system',
					content: `Você é um assistente útil que ajuda os usuários a entender conceitos de programação de forma fácil e descontraída,
                    seja breve e não use emojis.
					Caso a pergunta não seja relacionada a programação, ou à plataforma diga: "Desculpe, esta pergunta não está relacionada à programação."
					informações sobre o aplicativo(OctoDev): OctoDev é uma plataforma educacional gamificada focada no ensino de programação, 
                    oferecendo uma abordagem interativa e divertida para aprender a programar.
					na tela inicial do aplicativo, o usuário pode escolher entre várias linguagens de programação, 
                    aqui está um json mostrando os cursos disponíveis no momento: ${JSON.stringify(
						avaliableCourses.length > 0 ? avaliableCourses : [emptyCourse]
					)}.
                    Recomende bastante tenda, pois é uma ótima linguagem para iniciantes. principalmente para pessoas que não dominam o inglês.
                    Cada curso é dividido em lições que abrangem desde conceitos básicos até tópicos avançados, 
                    incluindo exercícios práticos e quizzes para reforçar o aprendizado.
					`,
				},
				{
					role: 'user',
					content: message,
				},
			],
		});

		if (completion.choices && completion.choices[0]?.message?.content) {
			return completion.choices[0].message.content;
		}
	} catch (error) {
		console.log(` - ERROR:\n  - ${error}`);
		return '';
	}
	return '';
}
