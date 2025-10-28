import { alternativasType, nullAlternative } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

export default async function StartNextExercise(
	exercise: {
		selectedAlternative: alternativasType;
		currentExercise: number;
		completedExercises: number;
		exerciseStatus: string;
		lastExercise: boolean;
	},
	setExercise: Dispatch<
		SetStateAction<{
			selectedAlternative: alternativasType;
			currentExercise: number;
			completedExercises: number;
			exerciseStatus: string;
			lastExercise: boolean;
		}>
	>
) {
	setTimeout(() => {
		setExercise(exercise => ({
			...exercise,
			currentExercise: exercise.currentExercise + 1,
			exerciseStatus: '',
			selectedAlternative: nullAlternative as alternativasType,
		}));
	}, 1000);
	// 1 segundo a menos do que o tempo de duração da animação hide do main
}
