import hljs from 'highlight.js';
hljs.registerLanguage('tenda', function (_hljs) {
	return {
		name: 'Tenda',
		aliases: ['tenda'],
		keywords: {
			keyword: [
				'seja',
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
				'e',
				'ou',
				'não',
				'tem',
				'não tem',
				'é',
				'não é',
			],
			literal: ['verdadeiro', 'falso', 'Nada', 'infinito', 'NaN'],
			built_in: ['entrada', 'leia', 'valor', 'erro', 'exiba'],
			type: ['Data', 'Lista', 'Texto', 'Matemática', 'Arquivo', 'Programa', 'Saída'],
		},
		contains: [
			{
				className: 'comment',
				begin: '//',
				end: '$',
				relevance: 0,
			},

			{
				className: 'string',
				begin: '"',
				end: '"',
				contains: [
					{
						className: 'constant',
						begin: '\\\\[nt"\\\\]',
					},
				],
			},

			{
				className: 'number',
				match: '\\b0[bB][01_]+\\b|\\b0[oO][0-7_]+\\b|\\b0[xX][0-9A-Fa-f_]+\\b|\\b[0-9_]+\\.[0-9_]*([eE][+-]?[0-9_]+)?\\b|\\b[0-9_]+([eE][+-]?[0-9_]+)?\\b',
			},

			{
				className: 'operator',
				match: '[+\\-*/%^<>=!]=?|->',
			},
			{
				className: 'operator',
				match: '\\b(e|ou|não| até )\\b',
                relevance: 10,
			},

			// {
			// 	className: 'function',
			// 	begin: '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\()',
			// 	relevance: 0,
			// },

			{
				className: 'support.function.method',
        match: '\\b(Data|Lista|Texto|Matemática|Arquivo|Programa|Saída)(?:\\.)([A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ0-9_]*)',
				captures: {
					1: { className: 'support.type' },
					2: { className: 'support.function.method' },
				},
			},

			{
				className: 'keyword',
				match: '\\b(seja|faça|então)\\b',
			},
      {
        className:"title",
        match:"\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(?=\\(\\s*[a-zA-Z0-9_,\\s]*\\)\\s*=)"
      }

		],
	};
});
