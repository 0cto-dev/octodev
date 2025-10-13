'use client';
import './page.css';
import React, { useEffect, useState } from 'react';
import { alternativasType, errorFetch, lessonType, paramsType } from '@/types/types';
import { fetchData } from './lessonsData';
import NavBar from './NavBar';
import shuffle from './shuffler';


export default function Home({ params }: { params: Promise<paramsType> }) {
    const [lesson, setLesson] = useState({ course: '', id: '', data: errorFetch as lessonType, });
    const [loaded, setLoaded] = useState(false)
    const paramsObj = React.use(params);
    
    useEffect(() => {
        fetchData(paramsObj, setLesson, setLoaded);
    }, [paramsObj]);
    if (!lesson.data) return <h1>ERRO, A LIÇÃO QUE VOCÊ TENTOU ACESSAR NÃO EXISTE</h1>
    if (!lesson.data.exercicios) return <h1>ERRO, A LIÇÃO QUE VOCÊ TENTOU ACESSAR NÃO EXISTE</h1>
    
    const totalExercises = lesson.data.exercicios.length;
    const currentExercise = 1;
    const completedExercises = currentExercise - 1;
    const lessonProgress = (completedExercises / totalExercises) * 100;
    const shuffledAlternatives = loaded? shuffle(lesson.data.exercicios[currentExercise - 1].alternativas) as alternativasType[]:[];
    return (
loaded&&<main>
            <NavBar data={lesson.data} currentExercise={currentExercise} totalExercises={totalExercises} lessonProgress={lessonProgress} />
            <section>
                <h1>{lesson.data.exercicios[currentExercise - 1].pergunta}</h1>
                <div className="options">
                    {shuffledAlternatives.map((option) => {
                        return (<button key={option.id} >{option.valor}</button>)
                    })}
                </div>
            </section>
            <footer>
                <button>
                    Verificar
                </button>
            </footer>
        </main>);
}