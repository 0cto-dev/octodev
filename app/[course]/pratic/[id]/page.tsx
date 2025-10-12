'use client';
import { IoMdTime } from 'react-icons/io';
import './page.css';
import React, { useEffect, useState } from 'react';
import { lessonType, paramsType } from '@/types/types';
import { fetchData } from './fechData';

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

    return (
        <main>
            <nav>
                <div className="left">
                    <div className="description">
                        <h1>{data.titulo}</h1>
                        <p>{data.descricao}</p>
                    </div>
                </div>
                <div className="right">
                    <div className="progress">
                        <p>
                            <span className="purple">Questão {currentLesson}</span> de {totalLessons}
                        </p>
                    </div>
                    <div className="timer">
                        <IoMdTime size={20} />
                        <p>05:00</p>
                    </div>
                </div>
                <div
                    className="progress-bar"
                    style={{
                        background: `linear-gradient(90deg, var(--primary) ${lessonProgress}%, var(--input) ${lessonProgress}%)`,
                    }}
                ></div>
            </nav>
        </main>
    );
}
