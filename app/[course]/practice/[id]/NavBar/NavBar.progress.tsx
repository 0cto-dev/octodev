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
		<div
			className="progress-bar"
			/* create am gradient effect on progress bar */
			style={{
				background: `
                        linear-gradient(
                            90deg,
                            var(--primary), 
                            color-mix(in srgb, var(--accent) 80% ,var(--primary)) 
                        ),
                        var(--input)
                        `,
				backgroundSize: `${lessonProgress}% 100%, 100% 100%`,
				backgroundRepeat: 'no-repeat',
			}}
		></div>
	);
}
