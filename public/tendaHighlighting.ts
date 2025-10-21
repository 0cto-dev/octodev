// Usei como base o highlighting no formato TextMate, fornecido pelo próprio Gabriel Bruno
// https://github.com/gabrielbrunop/suporte-linguagem-tenda/blob/main/syntaxes/tenda.tmLanguage.json

import * as monaco from 'monaco-editor';

export const tendaHighlighting: monaco.languages.IMonarchLanguage = {
	defaultToken: '',
	tokenPostfix: '.tenda',
	keywords: [
		'seja',
		'exiba',
		'função',
		'faça',
		'fim',
		'retorna',
		'se',
		'então',
		'senão',
		'para',
		'cada',
		'em',
		'enquanto',
		'até',
		'continua',
	],
	operators: ['+', '-', '*', '/', '%', '^', '=', '->', '<', '>', '!', '<=', '>=', 'ou', 'e', 'não', 'é'],
	constants: ['verdadeiro', 'falso', 'Nada', 'infinito', 'NaN'],
	builtinTypes: ['Data', 'Lista', 'Texto', 'Matemática', 'Arquivo', 'Programa', 'Saída'],
	builtinFunctions: ['entrada', 'leia', 'valor', 'erro'],

	tokenizer: {
		root: [
			// Comentários
			[/\/\/.*/, 'comment'],

			// Strings
			[/"([^"\\]|\\.)*"/, 'string'],

			// Números
			[/\b0[bB][01_]+\b/, 'number.binary'],
			[/\b0[oO][0-7_]+\b/, 'number.octal'],
			[/\b0[xX][0-9A-Fa-f_]+\b/, 'number.hex'],
			[/\b\d+(\.\d+)?([eE][+-]?\d+)?\b/, 'number'],

			// Palavras-chave
			[/\b(seja|exiba|função|faça|fim|retorna|se|então|senão|para|cada|em|enquanto|até|continua)\b/, 'keyword'],

			// Constantes
			[/\b(verdadeiro|falso|Nada|infinito|NaN)\b/, 'constant'],

			// Tipos embutidos
			[/\b(Data|Lista|Texto|Matemática|Arquivo|Programa|Saída)\b/, 'type'],

			// Funções embutidas
			[/\b(entrada|leia|valor|erro)\b/, 'function'],

			// Operadores
			[/[+\-*/%^=<>!]+/, 'operator'],

			// Identificadores
			[/[a-zA-Z_]\w*/, 'identifier'],
		],
	},
};
