'use client ';
import { errorFetch, exercisesType, LessonSectionType } from '@/types/types';
import Options from './section.options';
import dynamic from 'next/dynamic';
import '@/public/tendaHljs';
import { CodeBlock } from './section.codeBlock';
import CodeSPace from './section.codeLesson';

const MonacoEditor = dynamic(() => import('@/components/exercícios/MonacoEditor'), {
	ssr: false,
});

export default function LessonSection({
	lesson,
	setExercise,
	exercise,
	shuffledAlternatives,
	code,
	setCode,
	output,
	goingToNextExercise,
	setmouseOverSection,
}: LessonSectionType) {
	function RenderLessonExercise(exerciseObj: exercisesType) {
		const title = <h1>{exerciseObj?.pergunta}</h1>;
		if (exerciseObj?.tipo === 'alternativas') {
			return (
				<>
					{title}
					{exerciseObj.codigo && (
						<div className="codeSpace" style={{ width: '50%', margin: '50px' }}>
							<CodeBlock language={lesson.course === 'logica' ? 'tenda' : lesson.course}>
								{code}
							</CodeBlock>
						</div>
					)}
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
					<CodeSPace
						code={code}
						exercise={exercise}
						setCode={setCode}
						lesson={lesson}
						exerciseObj={exerciseObj}
						goingToNextExercise={goingToNextExercise}
						output={{outputValue,result,error}}
					/>
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
	return (
		<section onMouseEnter={() => setmouseOverSection(true)} onMouseLeave={() => setmouseOverSection(false)}>
			{RenderLessonExercise(lesson.data.exercicios[exercise.currentExerciseNum - 1] || errorFetch.exercicios[0])}
		</section>
	);
}
