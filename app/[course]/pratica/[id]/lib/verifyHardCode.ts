import openaiApi from '@/app/api/openAI/OpenAIAPI';

export default async function verifyHardCode(code: string, output: string, description: string): Promise<boolean> {
	const answer: '1' | '0' = (await openaiApi(
		`codigo: "${code}", output do codigo: ${output}`,
		`A sua função é verificar se o código do usuário não foi hardCoded e está correto,
		 o desafio é esse: ${description}. Caso o usuário faça um hardcode ou o código não esteja batendo com a resposta esperada
		 retorne 1, caso não retorne 0, VOCE NÃO PODE RETORNAR OUTRA COISA ALÉM DE 1 ou 0`
	)) as '1' | '0';
	console.log(answer);
	return answer === '0' ? false : true;
}
