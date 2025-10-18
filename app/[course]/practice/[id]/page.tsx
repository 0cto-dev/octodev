'use client';
import './page.css';
import React, { useEffect, useMemo, useState } from 'react';
import { alternativasType, errorFetch, lessonType, nullAlternative, paramsType } from '@/types/types';
import { fetchData } from './lessonsData';
import NavBar from './NavBar/NavBar';
import shuffle from './shuffler';
import LessonSection from './LessonSection/section';
import { runTenda } from './tendaFetch';
import { useCode } from '@/app/api/code-import/getCode';

export default function Home({ params }: { params: Promise<paramsType> }) {
	const [lesson, setLesson] = useState({ course: '', id: '', data: errorFetch as lessonType });
	const [loaded, setLoaded] = useState(false);
	const [goingToNextExercise, setGoingToNextExercise] = useState(false);

	const [exercise, setExercise] = useState({
		selectedAlternative: nullAlternative as alternativasType,
		currentExercise: 2,
		completedExercises: 0,
		exerciseStatus: '',
		lastExercise: false,
	});
	const currentExerciseIndex = exercise.currentExercise - 1;
	const currentExercise = lesson.data.exercicios[currentExerciseIndex];
	const swrCode = useCode(lesson, currentExercise);

	const [code, setCode] = useState('');
	const [output, setOutput] = useState(['']);
	const shuffledAlternatives = useMemo(() => {
		return shuffle(lesson.data?.exercicios[exercise.currentExercise - 1]?.alternativas || []) as alternativasType[];
	}, [lesson.data, exercise.currentExercise]);
	useEffect(() => {
		fetchData(params, setLesson, setLoaded);
	}, [params, loaded, lesson.data?.exercicios.length, exercise.currentExercise]);

	useEffect(() => {
		setExercise(exercise => ({
			...exercise,
			//sempre o numero de exercicios completos vai ser o valor de exercicio atual menos 1
			currentExercise:
				loaded && exercise.currentExercise > lesson.data?.exercicios.length
					? lesson.data?.exercicios.length
					: exercise.currentExercise,
			lastExercise: lesson.data?.exercicios.length === exercise.currentExercise,
		}));
		setExercise(exercise => ({ ...exercise, completedExercises: exercise.currentExercise - 1 }));
		if (lesson.data.exercicios[exercise.currentExercise - 1]?.tipo === 'codigo') {
		}
	}, [exercise.currentExercise, lesson.data?.exercicios.length, loaded, lesson]);

	useEffect(() => {
		if (currentExercise?.tipo === 'codigo' && swrCode && swrCode !== JSON.stringify(code)) {
			setCode(JSON.parse(swrCode));
		}
	}, [swrCode, currentExercise, code]);

	// useEffect(() => {
	// 	console.log(output);
	// }, [output]);
	async function submitAnswer(userAnswer: alternativasType, alternatives: alternativasType[]) {
		const typeOfExercise = lesson.data.exercicios[exercise.currentExercise - 1].tipo;
		let userGuessedRight: boolean = false;

		if (typeOfExercise === 'alternativas') {
			const correctAnswer = alternatives.filter(alternative => alternative.correto)[0];
			userGuessedRight = userAnswer.id === correctAnswer.id;
		}
		if (typeOfExercise === 'codigo') {
			const response = await runTenda(code);
			console.log(response)
			const output = response
				.filter((output: { type: string; payload: string }) => output.type === 'output')
				.map((output: { type: string; payload: string }) => {
					return output.payload;
				})
				.join('');
			const result = JSON.stringify(
				response.filter((output: { type: string; payload: string }) => output.type === 'result')[0]
			);

			console.log(output);
			console.log(result);
			setOutput([output,result]);

			// userGuessedRight = output.trim()==="18"// se o output da lição for APENAS 18
		}

		setExercise(exercise => ({
			...exercise,
			exerciseStatus: userGuessedRight ? 'correct' : 'wrong',
		}));

		if (userGuessedRight && !exercise.lastExercise) {
			setGoingToNextExercise(true);
			StartNextExercise();
		}
	}
	async function StartNextExercise() {
		setTimeout(() => {
			setExercise(exercise => ({
				...exercise,
				currentExercise: exercise.currentExercise + 1,
				exerciseStatus: '',
				selectedAlternative: nullAlternative as alternativasType,
			}));
		}, 3000);
	}
	function mainAnimationHandler(e: React.AnimationEvent<HTMLElement>) {
		if (e.animationName === 'wrong') {
			setExercise(exercise => ({
				...exercise,
				exerciseStatus: exercise.exerciseStatus === 'wrong' ? '' : exercise.exerciseStatus,
			}));
		}
		if (e.animationName === 'hide') {
			setGoingToNextExercise(false);
		}
	}

	if (!lesson.data) return <h1>ERRO, A LIÇÃO QUE VOCÊ TENTOU ACESSAR NÃO EXISTE</h1>;

	const totalExercises = lesson.data.exercicios.length;

	return (
		loaded && (
			<main
				className={exercise.exerciseStatus + `${goingToNextExercise ? ' hide' : ''}`}
				onAnimationEnd={mainAnimationHandler}
			>
				<NavBar
					data={lesson.data}
					goingToNextExercise={goingToNextExercise}
					totalExercises={totalExercises}
					exercise={exercise}
				/>
				<LessonSection
					lesson={lesson}
					setExercise={setExercise}
					exercise={exercise}
					shuffledAlternatives={shuffledAlternatives}
					code={code}
					output={output}
				/>
				<footer>
					<button onClick={() => submitAnswer(exercise.selectedAlternative, shuffledAlternatives)}>
						Verificar
					</button>
				</footer>
			</main>
		)
	);
}
