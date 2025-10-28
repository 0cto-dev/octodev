'use client';
import './page.css';
import React, { useEffect, useMemo, useState } from 'react';
import { alternativasType, errorFetch, lessonType, nullAlternative, paramsType } from '@/types/types';
import { fetchData } from './lessonsData';
import NavBar from './NavBar/NavBar';
import shuffle from './shuffler';
import LessonSection from './LessonSection/section';
import { useCode } from '@/app/api/code-import/getCode';
import '@/public/hljs.css';
import submitAnswer from '@/lib/submitAnswer';

export default function Home({ params }: { params: Promise<paramsType> }) {
	const [lesson, setLesson] = useState({ course: '', id: '', data: errorFetch as lessonType });
	const [loaded, setLoaded] = useState(false);
	const [goingToNextExercise, setGoingToNextExercise] = useState(false);
	const exercicios = lesson.data?.exercicios;

	const [exercise, setExercise] = useState({
		selectedAlternative: nullAlternative as alternativasType,
		currentExercise: 1,
		completedExercises: 0,
		exerciseStatus: '',
		lastExercise: false,
	});
	const exercicioAtual = exercicios[exercise.currentExercise - 1];
	const currentExerciseIndex = exercise.currentExercise - 1;
	const currentExercise = exercicios[currentExerciseIndex];
	const swrCode = useCode(lesson, currentExercise);

	const [code, setCode] = useState(['']);
	const [output, setOutput] = useState(['']);
	const [lives, setLives] = useState(5);
	const shuffledAlternatives = useMemo(() => {
		return shuffle(exercicioAtual?.alternativas || []) as alternativasType[];
	}, [exercicioAtual]);

	useEffect(() => {
		fetchData(params, setLesson, setLoaded);
	}, [params, loaded, exercicios.length, exercise.currentExercise]);

	useEffect(() => {
		setExercise(exercise => ({
			...exercise,
			//sempre o numero de exercicios completos vai ser o valor de exercicio atual menos 1
			currentExercise:
				loaded && exercise.currentExercise > exercicios.length ? exercicios.length : exercise.currentExercise,
			lastExercise: exercicios.length === exercise.currentExercise,
		}));
		setExercise(exercise => ({ ...exercise, completedExercises: exercise.currentExercise - 1 }));
	}, [exercise.currentExercise, exercicios?.length, loaded, lesson]);

	useEffect(() => {
		if (currentExercise?.codigo !== undefined && swrCode && swrCode !== JSON.stringify(code)) {
			setCode(JSON.parse(swrCode));
		}
	}, [swrCode, currentExercise]);
	async function StartNextExercise() {
		setTimeout(() => {
			setExercise(exercise => ({
				...exercise,
				currentExercise: exercise.currentExercise + 1,
				exerciseStatus: '',
				selectedAlternative: nullAlternative as alternativasType,
			}));
		}, 2000);
		// 1 segundo a menos do que o tempo de duração da animação hide do main
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

	const totalExercises = exercicios.length;

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
					lives={lives}
				/>
				<LessonSection
					lesson={lesson}
					setExercise={setExercise}
					exercise={exercise}
					shuffledAlternatives={shuffledAlternatives}
					code={code}
					setCode={setCode}
					output={output}
					goingToNextExercise={goingToNextExercise}
				/>
				<footer>
					<button
						onClick={() =>
							exercise.exerciseStatus === '' &&
							exercise.selectedAlternative.id !== 0 &&
							submitAnswer({
								userAnswer: exercise.selectedAlternative,
								alternatives: shuffledAlternatives,
								exercicioAtual,
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
								StartNextExercise,
							})
						}
					>
						Verificar
					</button>
				</footer>
			</main>
		)
	);
}
