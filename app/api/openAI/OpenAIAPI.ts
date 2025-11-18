import { courseType } from "@/types/types";

export default async function openaiApi(message: string,avaliableCourses:courseType[]): Promise<string> {
	try {
		const response = await fetch(
			`/api/openAI?message=${encodeURIComponent(message)}&avaliableCourses=${encodeURIComponent(JSON.stringify(avaliableCourses))}`
		);

		if (!response.ok) {
			console.error('Erro na resposta da API:', response.statusText);
			return '';
		}

		const data = await response.json();
		return data.response || '';
	} catch (error) {
		console.error('Erro ao chamar a API do OpenAI:', error);
		return '';
	}
}