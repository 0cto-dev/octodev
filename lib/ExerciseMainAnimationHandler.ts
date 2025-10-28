import { submitAnswerType } from '@/types/types';

export default function mainAnimationHandler(
	e: React.AnimationEvent<HTMLElement>,
	setExercise: submitAnswerType['setExercise'],
	setGoingToNextExercise:submitAnswerType['setGoingToNextExercise']
) {
	if (e.animationName === 'wrong') {
		setExercise(exercise => ({
			...exercise,
			exerciseStatus: exercise.exerciseStatus === 'wrong' ? '' : exercise.exerciseStatus,
		}));
	}
	if (e.animationName === 'next') {
		setGoingToNextExercise(false);
	}
}
