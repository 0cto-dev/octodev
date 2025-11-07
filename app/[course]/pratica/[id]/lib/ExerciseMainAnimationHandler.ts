import { submitAnswerType } from '@/types/types';

// Essa Função é chamda quando a animação do elemento "main" termina, gatilho no main:
//	onAnimationEnd={e => mainAnimationHandler(e, setExercise, setGoingToNextExercise)}

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
