'use client';
import './page.exercicios.css';
import { useEffect, useMemo, useState } from 'react';
import { alternativasType, errorFetch, lessonType, nullAlternative, paramsType } from '@/types/types';
import NavBar from './NavBar/NavBar';
import shuffle from './shuffler';
import LessonSection from './LessonSection/section';
import { useCode } from '@/app/api/code-import/getCode';
import '@/public/hljs.css';
import submitAnswer from '@/app/[course]/pratica/[id]/lib/submitAnswer';
import mainAnimationHandler from '@/app/[course]/pratica/[id]/lib/ExerciseMainAnimationHandler';
import updateTimer from '@/app/[course]/pratica/[id]/lib/timer';
import { fetchData } from '@/app/[course]/pratica/[id]/lib/lessonsData';
import StartNextExercise from '@/app/[course]/pratica/[id]/lib/startNewExercise';
import { saveProgress } from '@/app/[course]/pratica/[id]/lib/saveProgrss';
import PopUp from '@/components/popUp/PopUp';
import { useIsMobile } from '@/lib/isMobile';
import TargetCursor from '@/components/targetCursor/TargetCursor';
import { runCode } from './lib/runCode';
import useIsVisitor from '@/lib/isVisitor';

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
	const [seconds, setSeconds] = useState(999999);
	const [mouseOverSection, setMouseOverSection] = useState(false);
	// #endregion
	// #region alias Variables
	const exercicios = lesson.data?.exercicios || errorFetch.exercicios;
	const currentExerciseIndex = exercise.currentExerciseNum - 1;
	const currentExercise = exercicios[currentExerciseIndex];
	// #endregion

	const swrCode = useCode(lesson, currentExercise);
	const isMobile = useIsMobile();
	const isVisitor = useIsVisitor();

	// #region Memos
	const shuffledAlternatives = useMemo(() => {
		return shuffle(currentExercise?.alternativas || []) as alternativasType[];
	}, [currentExercise]);
	// #endregion
	// #region Effects
	useEffect(() => {
		// Atualiza assim que o fetchdata retorna o valor de lesson (apenas uma vez durante toda a lição)
		exercicios[0]?.id &&
			// Deixa o timer dinâmico, com base na quantidade e tipo de lição:
			//		30 segundos para cada lição do tipo alternativas e 4 minutos para cada lição do tipo código
			setSeconds(
				exercicios.reduce((acc, cur) => {
					let increaseValue = 0;

					if (cur.tipo === 'alternativas') increaseValue = 30;
					if (cur.tipo === 'codigo') increaseValue = 240;
					return acc + increaseValue;
				}, 0),
			);
	}, [exercicios[0].id]);
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

		goingToNextExercise &&
			isMobile &&
			setTimeout(() => {
				setGoingToNextExercise(false);
			}, 200);
	}, [exercise.exerciseStatus]);

	useEffect(() => {
		// Atualiza a cada secundo para atualizar o timer caso o exercício não tenha sido finalizado
		if (seconds !== 999999) {
			!(exercise.exerciseStatus === 'finish' || exercise.exerciseStatus === 'lose') && updateTimer(setSeconds);
			!seconds && setExercise(exercise => ({ ...exercise, exerciseStatus: 'lose' }));
		}
	}, [seconds]);

	// #endregion

	if (!lesson.data) return <h1>ERRO, A LIÇÃO QUE VOCÊ TENTOU ACESSAR NÃO EXISTE</h1>;

	const totalExercises = exercicios.length;
	const isPistonCourse = lesson.course !== 'logica';
	// Estamos enfrentando um problema com o pistonAPI, e enquanto isso não é resolvido, estamos dando a opção do aluno aceitar o resultado do código e pular para o próximo exercício, caso o exercício seja do tipo código e o curso não seja o de lógica (que é o único que não utiliza o pistonAPI)
	function acceptAndSkipCodeExercise() {
		if (exercise.exerciseStatus !== '' || currentExercise.tipo !== 'codigo') return;

		if (exercise.lastExercise) {
			setExercise(current => ({ ...current, exerciseStatus: 'finish' }));
			saveProgress(lesson.course, lesson.id, isVisitor);
			return;
		}

		setExercise(current => ({ ...current, exerciseStatus: 'correct' }));
		setGoingToNextExercise(true);
		StartNextExercise(setExercise, setCode);
	}

	return (
		loaded && (
			<>
				<PopUp type={exercise.exerciseStatus} course={lesson.course} className={showPopup ? 'show' : ''} />
				{mouseOverSection && !showPopup && currentExercise?.tipo === 'alternativas' && (
					<TargetCursor warn={seconds <= 10} spinDuration={1.5} hideDefaultCursor={true} parallaxOn={true} />
				)}
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
						setmouseOverSection={setMouseOverSection}
					/>
					<footer>
						{currentExercise.tipo === 'codigo' && (
							<button onClick={() => runCode(lesson, code, setCode, setOutput)}>Verificar</button>
						)}
						{currentExercise.tipo === 'codigo' && isPistonCourse && (
							<button className="skipButton" onClick={acceptAndSkipCodeExercise}>
								Aceitar e pular
							</button>
						)}
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
										isVisitor,
									});
							}}
						>
							{currentExercise.tipo === 'codigo' ? 'Enviar' : 'Verificar'}
						</button>
					</footer>
				</main>
			</>
		)
	);
}
