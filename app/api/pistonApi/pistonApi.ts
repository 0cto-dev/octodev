import { fetchResultPistonType } from "@/types/types";

export default async function fetchResultPiston(code:string,language:string):Promise<fetchResultPistonType> {
	const response = await fetch('https://emkc.org/api/v2/piston/execute', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			language: language,
			version: '3.10.0',
			files: [{ name: 'main.py', content: code}],
		}),
	});

	const result = await response.json();
	return result;
}
