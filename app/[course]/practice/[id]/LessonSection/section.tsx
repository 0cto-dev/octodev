import { LessonSectionType } from '@/types/types';
import Options from './section.options';

export default function LessonSection({
	lesson,
	setExercise,
	exercise,
	shuffledAlternatives,
}: LessonSectionType) {
	return (
		<section>
			<h1>{lesson.data.exercicios[exercise.currentExercise - 1]?.pergunta}</h1>
			<Options
				setExercise={setExercise}
				exercise={exercise}
				shuffledAlternatives={shuffledAlternatives}
			/>
		</section>
	);
}
