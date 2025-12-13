'use client';

import Editor, { Monaco, OnChange } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import tendaTheme from '@/public/tendaTheme.json';
import { MonacoEditorProps } from '@/types/types';
import { tendaHighlighting } from '@/public/tendaHighlighting';

export default function MonacoEditor({ value, language, onChange, autocomplete }: MonacoEditorProps) {
	const handleBeforeMount = (monaco: Monaco) => {
		monaco.languages.register({ id: 'tenda' });

		monaco.languages.setMonarchTokensProvider('tenda', tendaHighlighting);

		monaco.languages.setLanguageConfiguration('tenda', {
			indentationRules: {
				increaseIndentPattern: /.*\b(então|senão|faça)\s*$/,
				decreaseIndentPattern: /^\s*fim\s*$/,
			},
			onEnterRules: [
				{
					beforeText: /.*\b(então|senão|faça)\s*$/,
					action: { indentAction: monaco.languages.IndentAction.Indent },
				},
				// {
				// 	beforeText: /^\s*Alguma palavra para desindentar a linha\s*$/,
				// 	action: { indentAction: monaco.languages.IndentAction.Outdent },
				// },
			],
		});
		if (autocomplete) {
			monaco.languages.registerCompletionItemProvider('tenda', {
				provideCompletionItems: (model: { getWordUntilPosition: (arg0: any) => any; }, position: { lineNumber: any; }) => {
					const word = model.getWordUntilPosition(position);
					const range = {
						startLineNumber: position.lineNumber,
						endLineNumber: position.lineNumber,
						startColumn: word.startColumn,
						endColumn: word.endColumn,
					};

					return {
						suggestions: [
							{
								label: 'exiba',
								kind: monaco.languages.CompletionItemKind.Function,
								insertText: 'exiba',
								range,
							},
							{
								label: 'exiba',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								insertText: 'exiba($0)',
								range,
							},
							{
								label: 'seja',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'seja ',
								range,
							},
							{
								label: 'seja',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: 'seja ${1:nome} = ${2:valor}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								range,
							},
							{
								label: 'se',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'se ',
								range,
							},
							{
								label: 'então',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'então ',
								range,
							},
							{
								label: 'se',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: ['se ${1:condição} então', '\t$0', 'fim'].join('\n'),
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								range,
							},
							{
								label: 'senão',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'senão ',
								range,
							},
							{
								label: 'se senão',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: ['se ${1:condição} então', '\t$2', 'senão', '\t$0', 'fim'].join('\n'),
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								range,
							},
							{
								label: 'fim',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'fim ',
								range,
							},
							{
								label: 'para',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'para ',
								range,
							},
							{
								label: 'para cada',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: [
									'para cada ${1:índice} em ${2:mínimo} até ${3:máximo} faça',
									'\t$0',
									'fim',
								].join('\n'),
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								range,
							},
							{
								label: 'cada',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'cada ',
								range,
							},
							{
								label: 'em',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'em ',
								range,
							},
							{
								label: 'faça',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'faça ',
								range,
							},
							{
								label: 'tem',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'tem ',
								range,
							},
							{
								label: 'enquanto',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'enquanto ',
								range,
							},
							{
								label: 'enquanto',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: ['enquanto ${1:condição} faça', '\t$2', 'fim'].join('\n'),
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								range,
							},
							{
								label: 'continua',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'continua ',
								range,
							},
							{
								label: 'verdadeiro',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'verdadeiro',
								range,
							},
							{
								label: 'falso',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'falso',
								range,
							},
							{
								label: 'NaN',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'NaN',
								range,
							},
							{
								label: 'infinito',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'infinito',
								range,
							},
							{
								label: 'Nada',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'Nada',
								range,
							},
							{
								label: 'e',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'e ',
								range,
							},
							{
								label: 'função',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'função ',
								range,
							},
							{
								label: 'retorna',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'retorna ',
								range,
							},

							{
								label: 'função anônima',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: 'seja ${1:nomeFunção} = função (${2:parâmetros}) -> ${3:retorno}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Cria uma função',
								range,
							},

							{
								label: 'função multi-linha',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: [
									'seja ${1:nomeFunção}(${2:parâmetros}) = ',
									'\tfaça',
									'\t\tretorna $0',
									'\tfim',
								].join('\n'),
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Cria uma função com mais de uma linha',

								range,
							},
							{
								label: 'até',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'até ',
								range,
							},
							{
								label: 'ou',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'ou ',
								range,
							},
							{
								label: 'e',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'e ',
								range,
							},
							{
								label: 'não',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'não ',
								range,
							},
							{
								label: 'é',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'é ',
								range,
							},
							{
								label: 'Data',
								kind: monaco.languages.CompletionItemKind.TypeParameter,
								insertText: 'Data',
								range,
							},
							{
								label: 'Lista',
								kind: monaco.languages.CompletionItemKind.TypeParameter,
								insertText: 'Lista',
								range,
							},
							{
								label: 'Texto',
								kind: monaco.languages.CompletionItemKind.TypeParameter,
								insertText: 'Texto',
								range,
							},
							{
								label: 'Matemática',
								kind: monaco.languages.CompletionItemKind.TypeParameter,
								insertText: 'Matemática',
								range,
							},
							{
								label: 'Arquivo',
								kind: monaco.languages.CompletionItemKind.TypeParameter,
								insertText: 'Arquivo',
								range,
							},
							{
								label: 'Programa',
								kind: monaco.languages.CompletionItemKind.TypeParameter,
								insertText: 'Programa',
								range,
							},
							{
								label: 'Saída',
								kind: monaco.languages.CompletionItemKind.TypeParameter,
								insertText: 'Saída',
								range,
							},
						],
					};
				},
			});
			monaco.languages.registerCompletionItemProvider('python', {
				provideCompletionItems: (model: { getWordUntilPosition: (arg0: any) => any; }, position: { lineNumber: any; }) => {
					const word = model.getWordUntilPosition(position);
					const range = {
						startLineNumber: position.lineNumber,
						endLineNumber: position.lineNumber,
						startColumn: word.startColumn,
						endColumn: word.endColumn,
					};

					return {
						suggestions: [
							{
								label: 'print',
								kind: monaco.languages.CompletionItemKind.Function,
								insertText: 'print(${1:valor})',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Imprime no console',
								range,
							},
							{
								label: 'input',
								kind: monaco.languages.CompletionItemKind.Function,
								insertText: 'input("${1:mensagem}")',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Lê uma entrada do usuário',
								range,
							},
							{
								label: 'def',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'def ${1:nome_funcao}(${2:args}):\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Definir uma função',
								range,
							},
							{
								label: 'if',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'if ${1:condicao}:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Estrutura de condição',
								range,
							},
							{
								label: 'else',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'else:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Condição alternativa',
								range,
							},
							{
								label: 'elif',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'elif ${1:condicao}:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Outro tipo de condição',
								range,
							},
							{
								label: 'for',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'for ${1:item} in ${2:iterable}:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Loop para iterar',
								range,
							},
							{
								label: 'while',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'while ${1:condicao}:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Loop enquanto a condição for verdadeira',
								range,
							},
							{
								label: 'int',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'int(${1:valor})',
								documentation: 'Inteiro',
								range,
							},
							{
								label: 'str',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'str(${1:valor})',
								documentation: 'String',
								range,
							},
							{
								label: 'list',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'list(${1:iterable})',
								documentation: 'Lista',
								range,
							},
							{
								label: 'dict',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'dict(${1:chave:valor})',
								documentation: 'Dicionário',
								range,
							},
							{
								label: 'tuple',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'tuple(${1:valor})',
								documentation: 'Tupla',
								range,
							},
							{
								label: 'and',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'and',
								range,
							},
							{
								label: 'or',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'or',
								range,
							},
							{
								label: 'not',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'not',
								range,
							},
							{
								label: 'in',
								kind: monaco.languages.CompletionItemKind.Operator,
								insertText: 'in',
								range,
							},
							{
								label: 'try',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'try:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Bloco para capturar exceções',
								range,
							},
							{
								label: 'except',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'except ${1:erro} as ${2:variavel}:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Captura exceção',
								range,
							},
							{
								label: 'finally',
								kind: monaco.languages.CompletionItemKind.Keyword,
								insertText: 'finally:\n\t${0}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Bloco final de execução',
								range,
							},
							// Funções avançadas (exemplo de funções com mais de uma linha)
							{
								label: 'lambda',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: 'lambda ${1:args}: ${2:expressao}',
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Função anônima',
								range,
							},
							{
								label: 'def',
								kind: monaco.languages.CompletionItemKind.Snippet,
								insertText: ['def ${1:nome_funcao}(${2:args}):', '\t${3:pass}', '\t${0}'].join('\n'),
								insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
								documentation: 'Função com múltiplas linhas',
								range,
							},
						],
					};
				},
			});
		}

		monaco.editor.defineTheme('tendaTheme', {
			base: 'vs-dark',
			inherit: true,
			...tendaTheme,
		});
	};

	return (
		<Editor
			height="100%"
			language={language}
			value={value}
			onChange={onChange}
			theme="tendaTheme"
			beforeMount={handleBeforeMount}
			options={{
				fontSize: 16,
				fontFamily: 'Fira Code iScript',
				fontLigatures: true,
				wordWrap: 'off',
				tabSize: 2,
				insertSpaces: true,
				minimap: {
					enabled: false,
					renderCharacters: false,
					scale: 0,
				},
				bracketPairColorization: {
					enabled: true,
				},
				cursorBlinking: 'expand',
				formatOnPaste: true,
				suggest: {
					showFields: true,
					showFunctions: true,
				},
				scrollbar: {
					horizontalSliderSize: 8,
					verticalScrollbarSize: 0,
					horizontal: 'hidden',
					vertical: 'hidden',
					useShadows: false,
				},
				lineNumbers: 'on',
				selectOnLineNumbers: false,
				lineNumbersMinChars: 3,
				renderLineHighlight: 'none',
				smoothScrolling: true,
				stickyScroll: {
					enabled: false,
				},
				overviewRulerBorder: false,
				overviewRulerLanes: 5,
				hideCursorInOverviewRuler: true,
				codeLens: false,
				glyphMargin: false,
			}}
		/>
	);
}
