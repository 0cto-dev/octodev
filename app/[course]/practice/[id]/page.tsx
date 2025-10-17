'use client';
import './page.css';
import React, { useEffect, useMemo, useState } from 'react';
import { alternativasType, errorFetch, lessonType, nullAlternative, paramsType } from '@/types/types';
import { fetchData } from './lessonsData';
import NavBar from './NavBar/NavBar';
import shuffle from './shuffler';
import LessonSection from './LessonSection/section';
import { runTenda } from './tendaFetch';

export default function Home({ params }: { params: Promise<paramsType> }) {
	const [lesson, setLesson] = useState({ course: '', id: '', data: errorFetch as lessonType });
	const [loaded, setLoaded] = useState(false);
	const [goingToNextExercise, setGoingToNextExercise] = useState(false);

	const [exercise, setExercise] = useState({
		selectedAlternative: nullAlternative as alternativasType,
		currentExercise: 1,
		completedExercises: 0,
		exerciseStatus: '',
		lastExercise: false,
	});
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
	}, [exercise.currentExercise, lesson.data?.exercicios.length, loaded]);

	function submitAnswer(userAnswer: alternativasType, alternatives: alternativasType[]) {
		const correctAnswer = alternatives.filter(alternative => alternative.correto)[0];
		const userGuessedRight = userAnswer.id === correctAnswer.id;
		console.log(runTenda("exiba(\"Hello world\")"))//~teste
		
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
		if(e.animationName ==='hide'){
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
