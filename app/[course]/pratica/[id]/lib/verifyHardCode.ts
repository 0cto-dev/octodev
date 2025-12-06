import openaiApi from '@/app/api/openAI/OpenAIAPI';

export default async function verifyHardCode(code: string, output: string, description: string): Promise<(boolean | string)[]> {
	const answer = (await openaiApi(
		`codigo: "${code}", output do codigo: ${output}`,
		`A sua função é verificar se o código do usuário não foi hardCoded e está correto,
		 o desafio é esse: ${description}.
		 Você deve retornar um array, onde o primeiro indice é um boleano
		 (Caso o usuário faça um hardcode ou o código não esteja batendo com a resposta esperada, retorne 1
		 caso o código esteja correto, retorne 0) e o segundo é a justificativa,
		 não use markdown, como "\`\`\`json" para fazer isso, retorne apenas o array`
	));
	const jsonAnswer = JSON.parse(answer)

	console.log(jsonAnswer);
	return +jsonAnswer[0] === 0 ? [false,jsonAnswer[1]] : [true,jsonAnswer[1]];
}
