import { Dispatch, SetStateAction } from 'react';

export default function prepareTendaCode(code: string[], setCode: Dispatch<SetStateAction<string[]>>) {
	let newCode = code[0];

	//Substitui leia(texto), entrada(), Saída.leia(texto) e Saída.entrada() por um comentario no codigo do usuário e no codigo que será interpretado
	//O Vercel(plataforma de hospedagem que estamos usando no momento) é serverless, e impede que rodemos comando como "spawn" ou coisa do tipo
	//Par utilizarmos as features stdin fornecidas pelo tenda e outras linguagens
	newCode = newCode.replaceAll(
		/(^|[^"'])\b(leia|entrada|Saída.leia|Saída.entrada)\b\s*\([^\)]*?[\s\S]*?\)([^"']|$)/g,
		' // Não use stdin no octodev,\n// ao invés disso passe um valor direto!'
	);
	setCode([newCode]);

	return JSON.stringify({ code: newCode });
}
