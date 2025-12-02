export default async function openaiApi(message: string,roleSystem:string): Promise<string> {
	try {
		console.log(message)
		const response = await fetch(
			`/api/openAI?message=${encodeURIComponent(message)}&roleSystem=${encodeURIComponent(JSON.stringify(roleSystem))}`
		);

		if (!response.ok) {
			console.error('Erro na resposta da API:', response.statusText);
			console.error('Erro na resposta da API:', response);
			return '';
		}

		const data = await response.json();
		return data.response || '';
	} catch (error) {
		console.error('Erro ao chamar a API do OpenAI:', error);
		return '';
	}
}