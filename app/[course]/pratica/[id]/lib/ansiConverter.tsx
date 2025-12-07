import AnsiToHtml from 'ansi-to-html';

const ansiConvert = new AnsiToHtml({
	colors: {
		5: '#00ff00',
		1: '#e7000b',
		231: '#00ff00',
		115: '#00c4a3',
		240: '#8d8e9b',
		246: '#8d8e9b',
		249: '#8d8e9b',
	},
});

export function TerminalOutput({ ansiString }: { ansiString: string }) {
	const html = ansiConvert.toHtml(ansiString);

	return <pre className="error" dangerouslySetInnerHTML={{ __html: html }} />;
}
