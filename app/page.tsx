'use client';
import getCourses from '@/lib/readCoursesNames';
import { useEffect, useState } from 'react';
import './page.css';
import { getLesson } from './[course]/pratica/[id]/lib/lessonsData';
import { courseType, lessonType } from '../types/types';
import Image from 'next/image';
import ProgressBarComp from '../components/progressBar/ProgressBar';

export default function Home() {
	// #region States
	const [avaliableCourses, setAvaliableCourses] = useState<courseType[]>([]);
	const [courses, setCourses] = useState<{ course: string; data: lessonType[] }[]>([]);
	const [isCoursesLoaded, setIsCoursesLoaded] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	// #endregion

	// #region Effects
	useEffect(() => {
		getCourses(setAvaliableCourses, setIsCoursesLoaded);
	}, []);

	useEffect(() => {
		// Ao carregar os cursos disponiveis, carrega o conteudo de cada curso
		const Lessonsfetch = async () => {
			const lessonPromises = avaliableCourses
				.filter(course => course.disponivel)
				.map(async course => {
					return (await getLesson(
						course.nome === 'Tenda' ? 'logica' : course.nome.toLowerCase(),
						undefined
					)) as lessonType[];
				});

			const allCoursesLessons = await Promise.all(lessonPromises);

			setCourses(
				allCoursesLessons.map((lessons, i) => {
					return { course: avaliableCourses[i].nome, data: lessons };
				})
			);
		};

		Lessonsfetch();
	}, [isCoursesLoaded]);

	useEffect(() => {
		if (courses.length > 0) {
			setIsLoaded(true);
		}
	}, [courses]);
	// #endregion

	return (
		isLoaded && (
			<main>
				<header>
					<ul>
						<li>OctoDev</li>
						<li>ProfilePicture</li>
					</ul>
				</header>
				<section>
					{avaliableCourses.map((course, i) => {
						return <Course key={i} course={course} lengthExercises={courses[i]?.data.length} />;
					})}
				</section>
				<footer>footer</footer>
			</main>
		)
	);
}

function Course({ course, lengthExercises }: { course: courseType; lengthExercises: number }) {
	// Calcula o progresso do curso com base no localStorage
	const progress = lengthExercises
		? (((localStorage.getItem(`${course.nome === 'Tenda' ? 'logica' : course.nome.toLocaleLowerCase()}Progress`) ||
				0) as number) /
				lengthExercises) *
		  100
		: 0;

	return (
		<div className={`courseCard ${course.disponivel ? '' : 'disabled'}`}>
			<div className="image">
				<img
					src={'https://placehold.co/900x400/8868ff/f7f8ff?text=Banner+' + course.nome}
					alt={`${course.nome}Banner`}
					width={100}
					height={100}
				></img>
			</div>
			<div className="texts">
				<h1>{course.nome}</h1>
				<ProgressBarComp progress={progress} />
				<p>{course.descricao}</p>
			</div>
		</div>
	);
}
