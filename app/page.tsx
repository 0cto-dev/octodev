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
					{avaliableCourses
						.toSorted((a, b) => {
							if (a.disponivel && !b.disponivel) return -1;
							if (!a.disponivel && b.disponivel) return 1;

							return a.nome.localeCompare(b.nome);
						})
						.map((course, i) => {
							return (
								<Course
									key={i}
									course={course}
									lengthExercises={
										courses.toSorted((a, b) => a.course.localeCompare(b.course))[i]?.data.length ||
										0
									}
								/>
							);
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
		const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			className={`courseCard ${course.nome.toLowerCase()} ${course.disponivel ? '' : 'disabled'}`}
			style={isHovered?{ boxShadow: `${course.nome !== 'Tenda'?`0px 0px 15px 4px ${course.cor}`:''}` }:{}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="image">
				<img
					src={
						`https://placehold.co/900x400/${course.cor.replace('#','')}/f7f8ff?text=Banner+` +
						course.nome.replaceAll('+', '%2B').replaceAll('#', '%23')
					}
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
