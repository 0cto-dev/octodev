'use client';

import Editor, { Monaco, OnChange } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useEffect, useState } from 'react';
import tendaTheme from '@/public/tendaTheme.json';

type MonacoEditorProps = {
	value: string;
	language: string;
	onChange?: OnChange | undefined;
	theme?: string;
};
let temaCustomRegistrado = false;
let linguagemRegistrada = false;

export default function MonacoEditor({ value, language, onChange }: MonacoEditorProps) {
	const handleEditorDidMount = (monaco: Monaco) => {
		monaco.editor.defineTheme('tendaTheme', {
			base: 'vs-dark',
			inherit: true,
			...tendaTheme,
		});
	};
	useEffect(() => {
		// 	if (language === 'tenda' && !linguagemRegistrada) {
		// 		monaco.languages.register({ id: 'tenda' });
		// 		monaco.languages.setMonarchTokensProvider('tenda', {
		// 			tokenizer: {
		// 				root: [
		// 					[/\b(minhaPalavra)\b/, 'keyword'],
		// 					[/\b\d+\b/, 'number'],
		// 					[/".*?"/, 'string'],
		// 					[/\/\/.*/, 'comment'],
		// 					[/[a-z_$][\w$]*/, 'identifier'],
		// 				],
		// 			},
		// 		});
		// 		monaco.languages.setLanguageConfiguration('tenda', {
		// 			comments: {
		// 				lineComment: '//',
		// 			},
		// 			brackets: [
		// 				['{', '}'],
		// 				['[', ']'],
		// 				['(', ')'],
		// 			],
		// 		});
		// 		linguagemRegistrada = true;
		// 	}
	}, [tendaTheme]);

	return (
		<Editor
			height="500px"
			language={language}
			value={value}
			onChange={onChange}
			theme="tendaTheme"
			beforeMount={handleEditorDidMount}
			options={{
				fontSize: 16,
				fontFamily: 'Fira Code iScript',
				fontLigatures: true,
				wordWrap: 'off',
				minimap: {
					enabled: false,
					renderCharacters:false,
					scale:0
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
				scrollbar:{
					horizontalSliderSize:8,
					verticalScrollbarSize:0,
					horizontal:'hidden',
					vertical:'hidden',
					useShadows:false,
				},
				lineNumbers:'on',
				selectOnLineNumbers:false,
				lineNumbersMinChars:0,
				renderLineHighlight:"none",
				smoothScrolling:true,
				stickyScroll:{
					enabled:false
				},
				overviewRulerBorder:false,
				overviewRulerLanes:5,
				hideCursorInOverviewRuler:true,
				codeLens:false,
				glyphMargin:false,
				
				
				
			}}
		/>
	);
}
