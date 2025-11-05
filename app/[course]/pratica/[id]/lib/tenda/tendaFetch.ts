import { tendaOutputType } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';
import prepareTendaCode from './prepareCode';

export const runTenda = async (code: string[],setCode:Dispatch<SetStateAction<string[]>>) => {
	try {
		const preparedCode = prepareTendaCode(code,setCode);
		const res = await fetch('/api/tenda', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: preparedCode,
		});

		const data = await res.json();
		let output = data.output.split('\n');

		output = JSON.parse(`[${output.join(',')}]`);

		const outputs = output.map((linha: tendaOutputType) => {
			return linha;
		});

		if (data.error) {
			return `Erro: ${data.error}`;
		} else {
			return outputs;
		}
	} catch (err: unknown) {
		return `Erro ao chamar a API: ${err instanceof Error ? err.message : String(err)}`;
	}
};

