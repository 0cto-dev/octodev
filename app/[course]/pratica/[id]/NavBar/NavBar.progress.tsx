import ProgressBarComp from '@/components/progressBar/ProgressBar';
import { exerciseType } from '@/types/types';

export default function ProgressBar({
	goingToNextExercise,
	exercise,
	totalExercises,
}: {
	goingToNextExercise: boolean;
	exercise: exerciseType;
	totalExercises: number;
}) {
	// Espera com que a animação do main termine para que a barra de progresso suba
	const completedExercises = goingToNextExercise
		? exercise.exerciseStatus !== 'correct'
			? exercise.completedExercises - 1
			: exercise.completedExercises
		: exercise.completedExercises;

	const lessonProgress = (completedExercises / totalExercises) * 100;
	return (
		<>
			<ProgressBarComp progress={lessonProgress} />
		</>
	);
}
