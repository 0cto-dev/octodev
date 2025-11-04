import { alternativasType, nullAlternative } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

export default async function StartNextExercise(
	setExercise: Dispatch<
		SetStateAction<{
			selectedAlternative: alternativasType;
			currentExerciseNum: number;
			completedExercises: number;
			exerciseStatus: string;
			lastExercise: boolean;
		}>
	>,
	setCode: Dispatch<SetStateAction<string[]>>
) {
	setTimeout(() => {
		setCode([''])
		setExercise(exercise => ({
			...exercise,
			currentExerciseNum: exercise.currentExerciseNum + 1,
			exerciseStatus: '',
			selectedAlternative: nullAlternative as alternativasType,
		}));
	}, 1000);
	// 1 segundo a menos do que o tempo de duração da animação hide do main
}
