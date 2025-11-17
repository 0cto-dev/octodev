import OpenAI from 'openai';

export default async function openaiApi(message:string): Promise<string> {
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
					caso a pergunta não seja relacionada a programação, ou à plataforma diga: "Desculpe, esta pergunta não está relacionada à programação."
					informações sobre o aplicativo(OctoDev): OctoDev é uma plataforma educacional gamificada focada no ensino de programação, oferecendo uma abordagem interativa e divertida para aprender a programar.
					na tela inicial do aplicativo, o usuário pode escolher entre várias linguagens de programação, como:
						* Python
						* JavaScript
						* C++
						* C
						* C#
						* Rust
						* PHP
						* MySQL
						* Tenda(Linguagem de programação 100% brasileira com foco em facilidade e simplicidade)
					
					`,
				},
				{
					role: 'user',
					content: message
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
