'use client';
import getCourses from '@/lib/readCoursesNames';
import { useEffect, useState } from 'react';
import './page.css';
import { getLesson } from './[course]/pratica/[id]/lib/lessonsData';
import { courseType, lessonType } from '../types/types';
import Image from 'next/image';
import { useIsMobile } from '../lib/isMobile';

export default function Home() {
	// #region States
	const [avaliableCourses, setAvaliableCourses] = useState<courseType[]>([]);
	const [courses, setCourses] = useState<{ course: string; data: lessonType[] }[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	// #endregion

	// #region Effects
	useEffect(() => {
		getCourses(setAvaliableCourses, setIsLoaded);
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
			console.log(allCoursesLessons);

			setCourses(
				allCoursesLessons.map((lessons, i) => {
					return { course: avaliableCourses[i].nome, data: lessons };
				})
			);
		};

		Lessonsfetch();
	}, [isLoaded, avaliableCourses]);

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
						return <Course key={i} course={course} />;
					})}
				</section>
				<footer>footer</footer>
			</main>
		)
	);
}

function Course({ course }: { course: courseType }) {
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
				<hr />
				<p>{course.descricao}</p>
			</div>
		</div>
	);
}
