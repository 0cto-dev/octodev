import { exercisesType, LessonSectionType } from '@/types/types';
import Options from './section.options';

export default function LessonSection({
	lesson,
	setExercise,
	exercise,
	shuffledAlternatives,
	code,
	output,
}: LessonSectionType) {
	function RenderLessonExercise(exerciseObj: exercisesType) {
		const title = <h1>{exerciseObj?.pergunta}</h1>;
		if (exerciseObj.tipo === 'alternativas') {
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
		if (exerciseObj.tipo === 'codigo') {
			const outputValue = output[0] && output[0];
			const result = output[0] && JSON.parse(output[1]).value;
			return (
				<>
					{title}
					<pre>
						<code>{code}</code>
					</pre>
					<pre className="output">
						<code >
							<div className="output">{outputValue}</div>
							<div className="result">{result}</div>
						</code>
					</pre>
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
