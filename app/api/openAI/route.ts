import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const message = searchParams.get('message') || '';
		const roleSystem = JSON.parse(searchParams.get('roleSystem') || '[]');

		if (!message.trim() || !roleSystem[0]) return NextResponse.json({ error: 'Mensagem vazia' }, { status: 400 });

		const response = await runOpenAI(message, roleSystem);

		return NextResponse.json({ response }, { status: 200 });
	} catch (error) {
		console.log(` - ERROR:\n  - ${error}`);

		if (error instanceof OpenAI.APIError) {
			const status = error.status && error.status >= 400 && error.status < 600 ? error.status : 502;
			const message =
				(typeof error.error === 'object' && error.error !== null && 'message' in error.error
					? String((error.error as { message: unknown }).message)
					: error.message) || 'Erro do provedor de AI';
			return NextResponse.json({ error: 'Não foi possivel obter resposta da AI: ' + message }, { status });
		}

		return NextResponse.json({ error: 'Não foi possivel obter resposta da AI: ' + error }, { status: 500 });
	}
}

async function runOpenAI(message: string, roleSystem: string): Promise<string> {
	const openai = new OpenAI({
		baseURL: 'https://api.groq.com/openai/v1',
		apiKey: process.env.GROQ_API_KEY || '',
	});

	const completion = await openai.chat.completions.create({
		model: 'openai/gpt-oss-120b',
		messages: [
			{
				role: 'system',
				content: roleSystem,
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

	throw new Error('Resposta vazia do provedor de AI');
}
