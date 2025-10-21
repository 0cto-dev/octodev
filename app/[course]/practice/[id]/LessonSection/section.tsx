'use client ';
import { exercisesType, LessonSectionType } from '@/types/types';
import Options from './section.options';
import AnsiToHtml from 'ansi-to-html';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('@/components/MonacoEditor'), {
	ssr: false,
});

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

function TerminalOutput({ ansiString }: { ansiString: string }) {
	const html = ansiConvert.toHtml(ansiString);

	return <pre className="error" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function LessonSection({
	lesson,
	setExercise,
	exercise,
	shuffledAlternatives,
	code,
	setCode,
	output,
}: LessonSectionType) {
	function RenderLessonExercise(exerciseObj: exercisesType) {
		const title = <h1>{exerciseObj?.pergunta}</h1>;
		if (exerciseObj?.tipo === 'alternativas') {
			return (
				<>
					{title}
					<Options
						setExercise={setExercise}
						exercise={exercise}
						shuffledAlternatives={shuffledAlternatives}
					/>
				</>
			);
		}
		if (exerciseObj?.tipo === 'codigo') {
			const outputValue = output[0] && output[0];
			const result = output[1] && JSON.parse(output[1]).value;
			const error = output[2] && output[2];
			
			return (
				<>
					{title}
					<div className="codeSpace">
						{code[0] && (
							<MonacoEditor
								value={code[0]}
								language={lesson.course === 'logica' ? 'tenda' : lesson.course}
								onChange={value => value !== undefined && setCode([value])}
								autocomplete={exerciseObj.autocompletar ? exerciseObj.autocompletar : false}
							/>
						)}
						{/* o curso de logica é a unica exceção em que o nome do curso vai ser diferente do nome da linguagem */}

						{result && (
							<pre className="output">
								<code>
									<div className="output">{outputValue}</div>
									<div className="result">{result}</div>
								</code>
							</pre>
						)}
						{error && <TerminalOutput ansiString={error} />}
					</div>
				</>
			);
		}
		return (
			<>
				{title}
				<h1>Nunca cheguei nessa parte</h1>
			</>
		);
	}
	return <section>{RenderLessonExercise(lesson.data.exercicios[exercise.currentExercise - 1])}</section>;
}
