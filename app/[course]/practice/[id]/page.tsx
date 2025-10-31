'use client';
import './page.css';
import React, { useEffect, useMemo, useState } from 'react';
import { alternativasType, errorFetch, lessonType, nullAlternative, paramsType } from '@/types/types';
import NavBar from './NavBar/NavBar';
import shuffle from './shuffler';
import LessonSection from './LessonSection/section';
import { useCode } from '@/app/api/code-import/getCode';
import '@/public/hljs.css';
import submitAnswer from '@/lib/submitAnswer';
import mainAnimationHandler from '@/lib/ExerciseMainAnimationHandler';
import PopUp from '@/components/PopUp';
import updateTimer from '@/lib/timer';
import { fetchData } from '@/lib/lessonsData';

export default function Home({ params }: { params: Promise<paramsType> }) {
	// #region States
	const [lesson, setLesson] = useState({ course: '', id: '', data: errorFetch as lessonType });
	const [loaded, setLoaded] = useState(false);
	const [goingToNextExercise, setGoingToNextExercise] = useState(false);
	const [exercise, setExercise] = useState({
		selectedAlternative: nullAlternative as alternativasType,
		currentExerciseNum: 1,
		completedExercises: 0,
		exerciseStatus: '',
		lastExercise: false,
	});
	const [code, setCode] = useState(['']);
	const [output, setOutput] = useState(['']);
	const [lives, setLives] = useState(5);
	const [showPopup, setShowPopup] = useState(false);
	const [seconds, setSeconds] = useState(300);
	// #endregion
	// #region alias Variables
	const exercicios = lesson.data?.exercicios;
	const currentExerciseIndex = exercise.currentExerciseNum - 1;
	const currentExercise = exercicios[currentExerciseIndex];
	// #endregion

	const swrCode = useCode(lesson, currentExercise);

	// #region Memos
	const shuffledAlternatives = useMemo(() => {
		return shuffle(currentExercise?.alternativas || []) as alternativasType[];
	}, [currentExercise]);
	// #endregion
	// #region Effects
	useEffect(() => {
		// Atualiza sempre que um novo exercício é carregado!
		fetchData(params, setLesson, setLoaded);

		setExercise(exercise => ({
			...exercise,

			currentExercise:
				loaded && exercise.currentExerciseNum > exercicios.length
					? exercicios.length
					: exercise.currentExerciseNum,
			lastExercise: exercicios.length === exercise.currentExerciseNum,
			completedExercises: currentExerciseIndex,
			//sempre o numero de exercicios completos vai ser o valor de exercicio atual menos 1
		}));
	}, [params, loaded, exercicios.length, currentExercise]);

	useEffect(() => {
		// Atualiza sempre que o exercício que está sendo carregado possui um código, seja ele do tipo "código" ou "alternativas"
		if (currentExercise?.codigo !== undefined && swrCode && swrCode !== JSON.stringify(code)) {
			setCode(JSON.parse(swrCode));
		}
	}, [swrCode, currentExercise]);

	useEffect(() => {
		// Atualiza sempre que o popUp deverá aparecer(Ao usuario perder ou completar um desafio)
		(exercise.exerciseStatus === 'finish' || exercise.exerciseStatus === 'lose') &&
			setTimeout(() => {
				setShowPopup(true);
			}, 1500);
	}, [exercise.exerciseStatus]);

	useEffect(() => {
		// Atualiza a cada secundo para atualizar o timer caso o exercício não tenha sido finalizado
		!(exercise.exerciseStatus === 'fisnish' || exercise.exerciseStatus === 'lose') && updateTimer(setSeconds);
		!seconds&&setExercise((exercise)=>({...exercise,exerciseStatus:"lose"}))
	}, [seconds]);

	// #endregion

	if (!lesson.data) return <h1>ERRO, A LIÇÃO QUE VOCÊ TENTOU ACESSAR NÃO EXISTE</h1>;

	const totalExercises = exercicios.length;

	return (
		loaded && (
			<>
				<PopUp type={exercise.exerciseStatus} course={lesson.course} className={showPopup ? 'show' : ''} />

				<main
					className={exercise.exerciseStatus + `${goingToNextExercise ? ' next' : ''}`}
					onAnimationEnd={e => mainAnimationHandler(e, setExercise, setGoingToNextExercise)}
				>
					<NavBar
						lesson={lesson}
						goingToNextExercise={goingToNextExercise}
						totalExercises={totalExercises}
						exercise={exercise}
						lives={lives}
						seconds={seconds}
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
							onClick={() => {
								exercise.exerciseStatus === '' &&
									(currentExercise.tipo === 'alternativas'
										? exercise.selectedAlternative.id !== 0
										: true) &&
									submitAnswer({
										userAnswer: exercise.selectedAlternative,
										alternatives: shuffledAlternatives,
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
									});
							}}
						>
							Verificar
						</button>
					</footer>
				</main>
			</>
		)
	);
}
