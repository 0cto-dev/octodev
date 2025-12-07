import verifyHardCode from '@/app/[course]/pratica/[id]/lib/verifyHardCode';
import { submitAnswerType } from '@/types/types';
import StartNextExercise from './startNewExercise';
import { saveProgress } from './saveProgrss';
import { runCode } from './runCode';

export default async function submitAnswer(
	// #region Área de região
	{
		userAnswer,
		alternatives,
		currentExercise,
		lesson,
		code,
		setCode,
		setOutput,
		output,
		exercise,
		setExercise,
		lives,
		setLives,
		setGoingToNextExercise,
	}: // #endregion
	submitAnswerType
) {
	const typeOfExercise = currentExercise.tipo;
	let userGuessedRight: boolean = false;

	if (typeOfExercise === 'alternativas') {
		const correctAnswer = alternatives.filter(alternative => alternative.correto)[0];
		userGuessedRight = userAnswer.id === correctAnswer.id;
	}
	if (typeOfExercise === 'codigo') {
		let { output, result, error } = await runCode(lesson, code, setCode, setOutput);

		const hardCoded = await verifyHardCode(
			code[0],
			output,
			`utilizando a linguagem ${lesson.course}: ` + currentExercise.verificadorTrapaca || ''
		);
		console.log(error);
		userGuessedRight =
			(currentExercise.respostaCodigo ? output.trim() === currentExercise.respostaCodigo.trim() : true) &&
			!hardCoded[0] &&
			!error;
	}
	if (!userGuessedRight) {
		// Diminui a vida e finaliza animação de erro que dura 500ms
		exercise.exerciseStatus !== 'wrong' && lives > 0 && setLives(lives => lives - 1);
		setTimeout(() => {
			setExercise(exercise => ({
				...exercise,
				exerciseStatus: exercise.exerciseStatus === 'wrong' ? '' : exercise.exerciseStatus,
			}));
		}, 500);
	}

	// Marca lição como errada ou como perdida
	if (lives > 0) {
		setExercise(exercise => ({
			...exercise,
			exerciseStatus: userGuessedRight ? 'correct' : lives > 1 ? 'wrong' : 'lose',
		}));
	}
	if (!userGuessedRight) return;

	if (exercise.lastExercise) {
		setExercise(exercise => ({ ...exercise, exerciseStatus: 'finish' }));
		saveProgress(lesson.course, lesson.id);
	} else {
		setGoingToNextExercise(true);
		StartNextExercise(setExercise, setCode);
	}
}
