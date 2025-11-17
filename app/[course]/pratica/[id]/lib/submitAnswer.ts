import fetchResultPiston from '@/app/[course]/pratica/[id]/lib/pistonApi/pistonApi';
import { runTenda } from '@/app/api/tenda/tendaFetch'
import verifyHardCode from '@/app/[course]/pratica/[id]/lib/verifyHardCode';
import { alternativasType, exercisesType, lessonType, submitAnswerType } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';
import StartNextExercise from './startNewExercise';

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
		let response;
		let output = '';
		let result = '';
		let error = '';

		if (lesson.course === 'logica') {
			// Tratamento para a linguagem tenda
			response = await runTenda(code, setCode);
			output = response
				.filter((output: { type: string; payload: string }) => output.type === 'output')
				.map((output: { type: string; payload: string }) => {
					return output.payload;
				})
				.join('');
			result = JSON.stringify(
				response.filter((output: { type: string; payload: string }) => {
					return output.type === 'result';
				})[0]
			);
			error = response.filter((output: { type: string; payload: string }) => output.type === 'error')[0]
				?.payload[0];
		}

		if (lesson.course !== 'logica') {
			// Tratamento para python e possiveis próximas linguagens utilizando a piston API
			const fetchPythonResult = await fetchResultPiston(code[0], lesson.course);
			console.log(fetchPythonResult);

			let preparedResult = fetchPythonResult.run.stdout.split('\n');
			preparedResult.pop();
			const finalResult = preparedResult.at(-1) || 'Nada';

			output = fetchPythonResult.run.output;
			result = JSON.stringify({ value: finalResult });
			error = fetchPythonResult.run.stderr;
		}

		setOutput([output, result || '', error || '']);

		const hardCoded = verifyHardCode(code[0], currentExercise.verificadorTrapaca || '');
		console.log(output.trim(), currentExercise.respostaCodigo?.trim());

		userGuessedRight =
			(currentExercise.respostaCodigo ? output.trim() === currentExercise.respostaCodigo.trim() : true) && !hardCoded;
	}

	if (!userGuessedRight) {
		exercise.exerciseStatus !== 'wrong' && lives > 0 && setLives(lives => lives - 1);
		setTimeout(() => {
			setExercise(exercise => ({
				...exercise,
				exerciseStatus: exercise.exerciseStatus === 'wrong' ? '' : exercise.exerciseStatus,
			}));
		}, 500);
	}
	lives > 0 &&
		setExercise(exercise => ({
			...exercise,
			exerciseStatus: userGuessedRight ? 'correct' : 'wrong',
		}));

	lives === 1 &&
		setExercise(exercise => ({
			...exercise,
			exerciseStatus: userGuessedRight ? 'correct' : 'lose',
		}));

	if (userGuessedRight && !exercise.lastExercise) {
		setGoingToNextExercise(true);
		StartNextExercise(setExercise, setCode);
	}
	if (userGuessedRight && exercise.lastExercise) {
		setExercise(exercise => ({ ...exercise, exerciseStatus: 'finish' }));
		saveProgress(lesson.course,lesson.id);
	}
}

function saveProgress(course:string,id: string) {
	
	if (typeof window !== 'undefined') {
		const progress = localStorage.getItem(`${course}Progress`);

		if (!progress || +progress < +id.replace('licao', '')) {
			localStorage.setItem(`${course}Progress`, id.replace('licao', ''));
		}
	}
}
