import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const message = searchParams.get('message') || '';
		const roleSystem = JSON.parse(searchParams.get('roleSystem') || '[]');

		if (!message.trim() || !roleSystem[0])
			return NextResponse.json({ error: 'Mensagem vazia' }, { status: 400 });

		const response = await runOpenAI(message, roleSystem);

		return NextResponse.json({ response }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Não foi possivel obter resposta da AI: ' + error }, { status: 500 });
	}
}

async function runOpenAI(message: string, roleSystem: string): Promise<string> {
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
	} catch (error) {
		console.log(` - ERROR:\n  - ${error}`);
		return '';
	}
	return '';
}
