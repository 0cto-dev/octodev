'use client';
import getCourses from '@/lib/readCoursesNames';
import { useEffect, useState } from 'react';
import './page.css';
import { getLesson } from '../[course]/pratica/[id]/lib/lessonsData';
import { courseType, lessonType } from '../../types/types';
import Image from 'next/image';
import SectionCourses from './page.section';
import getCourseName from '@/lib/getCourseName';

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
						getCourseName(course.nome),
						undefined
					)) as lessonType[];
				});

			const allCoursesLessons = await Promise.all(lessonPromises);

			setCourses(
				allCoursesLessons.map((lessons, i) => {
					return { course: avaliableCourses.filter((course=>course.disponivel))[i].nome, data: lessons };
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
				<SectionCourses avaliableCourses={avaliableCourses} courses={courses} />
			</main>
		)
	);
}
