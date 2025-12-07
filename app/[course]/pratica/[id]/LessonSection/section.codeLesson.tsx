import MonacoEditor from '@/components/exercícios/MonacoEditor';
import { exercisesType, exerciseType, LessonSectionType, lessonType } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';
import { TerminalOutput } from '../lib/ansiConverter';
type codeSpaceProps = {
	exerciseObj: exercisesType;
	code: string[];
	setCode: Dispatch<SetStateAction<string[]>>;
	goingToNextExercise: boolean;
	exercise: exerciseType;
	lesson: {
		course: string;
		id: string;
		data: lessonType;
	};
    output:{outputValue:string,error:string,result:string}
};
export default function CodeSPace({
	goingToNextExercise,
	exercise,
	code,
	lesson,
	exerciseObj,
	setCode,
    output
}: codeSpaceProps) {
	return (
		<div className="codeSpace">
			<MonacoEditor
				value={
					goingToNextExercise
						? ''
						: exercise.exerciseStatus === 'finish' || exercise.exerciseStatus === 'lose'
						? ''
						: code[0]
				}
				language={lesson.course === 'logica' ? 'tenda' : lesson.course}
				onChange={value => value !== undefined && setCode([value])}
				autocomplete={exerciseObj.autocompletar ? exerciseObj.autocompletar : false}
			/>

			{/* o curso de logica é a unica exceção em que o nome do curso vai ser diferente do nome da linguagem */}

			{output.result && !output.error && (
				<pre className="output">
					<code>
						<div className="output">{output.outputValue}</div>
						<div className="result">{output.result}</div>
					</code>
				</pre>
			)}
			{output.error && <TerminalOutput ansiString={output.error} />}
		</div>
	);
}
