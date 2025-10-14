'use client';
import './page.css';
import React, { useEffect, useMemo, useState } from 'react';
import { alternativasType, errorFetch, lessonType, paramsType } from '@/types/types';
import { fetchData } from './lessonsData';
import NavBar from './NavBar';
import shuffle from './shuffler';
import LessonSection from './LessonsSection';

export default function Home({ params }: { params: Promise<paramsType> }) {
    const [lesson, setLesson] = useState({ course: '', id: '', data: errorFetch as lessonType });
    const [loaded, setLoaded] = useState(false);
    const [exercise, setExercise] = useState({
        selectedAlternative: { id: 0, valor: '', correto: false } as alternativasType,
        currentExercise: 6,
        completedExercises: 0,
        exerciseStatus: '',
    });
    const shuffledAlternatives = useMemo(() => {
        setExercise(exercise => ({ ...exercise, completedExercises: exercise.currentExercise - 1 }));
        //sempre o numero de exercicios completos vai ser o valor de exercicio atual menos 1
        return shuffle(lesson.data?.exercicios[exercise.currentExercise - 1]?.alternativas || []) as alternativasType[];
    }, [lesson.data, exercise.currentExercise]);

    useEffect(() => {
        fetchData(params, setLesson, setLoaded);
    }, [params]);

    function submitAnswer(userAnswer: alternativasType, alternatives: alternativasType[]) {
        const correctAnswer = alternatives.filter(alternative => alternative.correto);

        setExercise(exercise => ({
            ...exercise,
            exerciseStatus: userAnswer.id === correctAnswer[0].id ? 'correct' : 'wrong',
        }));
    }

    if (!lesson.data) return <h1>ERRO, A LIÇÃO QUE VOCÊ TENTOU ACESSAR NÃO EXISTE</h1>;

    const totalExercises = lesson.data.exercicios.length;
    const lessonProgress = (exercise.completedExercises / totalExercises) * 100;

    return (
        loaded && (
            <main
                className={exercise.exerciseStatus}
                onAnimationEnd={() => setExercise(exercise => ({ ...exercise, exerciseStatus: '' }))}
            >
                <NavBar
                    data={lesson.data}
                    currentExercise={exercise.currentExercise}
                    totalExercises={totalExercises}
                    lessonProgress={lessonProgress}
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
