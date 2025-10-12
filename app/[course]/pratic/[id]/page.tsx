'use client';
import './page.css';
import React, { useEffect, useState } from 'react';
import { lessonType, paramsType } from '@/types/types';
import { fetchData } from './lessonsData';
import NavBar from './NavBar';

const errorFetch: lessonType = {
    id: ' ',
    titulo: ' ',
    descricao: '  ',
    exercicios: [],
};

export default function Home({ params }: { params: Promise<paramsType> }) {
    const [course, setCourse] = useState('');
    const [id, setId] = useState('');
    const [data, setData] = useState<lessonType>(errorFetch);
    const totalLessons = 10;
    const currentLesson = 7;
    const completedLessons = currentLesson - 1;
    const lessonProgress = (completedLessons / totalLessons) * 100;
    const paramsObj = React.use(params);

    useEffect(() => {
        fetchData(paramsObj, { setCourse, setId, setData });
    }, [course, id, paramsObj]);

    if (!data) return <h1>ERRO, A LIÇÃO QUE VOCÊ TENTOU ACESSAR NÃO EXISTE</h1>

    return (
        <main>
            <NavBar data={data} currentLesson={currentLesson} totalLessons={totalLessons} lessonProgress={lessonProgress} />
        </main>
    );
}
