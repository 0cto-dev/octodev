import { runTenda } from "@/app/api/tenda/tendaFetch";
import fetchResultPiston from "./pistonApi/pistonApi";
import { submitAnswerType } from "@/types/types";

export async function runCode(
	lesson: submitAnswerType['lesson'],
	code: submitAnswerType['code'],
	setCode: submitAnswerType['setCode'],
	setOutput: submitAnswerType['setOutput']
) {
	let response;
	let output = '';
	let result = '';
	let error = '';

	if (lesson.course === 'logica') {
		// Tratamento para a linguagem tenda
		response = await runTenda(code, setCode);
		output = response
			.filter((output: { type: string; payload: string }) => output.type === 'output')
			.map((output: { type: string; payload: string }) => {
				return output.payload;
			})
			.join('');
		result = JSON.stringify(
			response.filter((output: { type: string; payload: string }) => {
				return output.type === 'result';
			})[0]
		);
		error = response.filter((output: { type: string; payload: string }) => output.type === 'error')[0]?.payload[0];
	}

	if (lesson.course !== 'logica') {
		// Tratamento para python e possiveis próximas linguagens utilizando a piston API
		const fetchPythonResult = await fetchResultPiston(code[0], lesson.course);
		console.log(fetchPythonResult);

		let preparedResult = fetchPythonResult.run.stdout.split('\n');
		preparedResult.pop();
		const finalResult = preparedResult.at(-1) || 'Nada';

		output = fetchPythonResult.run.output;
		result = JSON.stringify({ value: finalResult });
		error = fetchPythonResult.run.stderr;
	}
	setOutput([output, result || '', error || '']);
	return {output,result,error}
}
