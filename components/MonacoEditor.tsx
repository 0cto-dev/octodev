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
		autocomplete &&
			monaco.languages.registerCompletionItemProvider('tenda', {
				provideCompletionItems: (model, position) => {
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
								insertText: ['para cada ${1:índice} em ${2:mínimo} até ${3:máximo} faça','\t$0','fim'].join('\n'),
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
