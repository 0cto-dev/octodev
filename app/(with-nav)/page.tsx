'use client';
import getCourses from '@/lib/readCoursesNames';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import './page.css';
import { getLesson } from '../[course]/pratica/[id]/lib/lessonsData';
import { courseType, lessonType } from '../../types/types';
import SectionCourses from './page.section';
import getCourseName from '@/lib/getCourseName';
import Chat from './Chat';

export default function Home() {
	const { data: session } = useSession();
	const role = session?.user?.role;

	// #region States
	const [avaliableCourses, setAvaliableCourses] = useState<courseType[]>([]);
	const [courses, setCourses] = useState<{ course: string; data: lessonType[] }[]>([]);
	const [isCoursesLoaded, setIsCoursesLoaded] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	// #endregion

	// #region Effects
	useEffect(() => {
		if (role === 'Contratante') return;
		getCourses(setAvaliableCourses, setIsCoursesLoaded);
	}, [role]);

	useEffect(() => {
		if (role === 'Contratante') return;
		// Ao carregar os cursos disponiveis, carrega o conteudo de cada curso
		const Lessonsfetch = async () => {
			const lessonPromises = avaliableCourses
				.filter(course => course.disponivel)
				.map(async course => {
					return (await getLesson(getCourseName(course.nome), undefined)) as lessonType[];
				});

			const allCoursesLessons = await Promise.all(lessonPromises);

			setCourses(
				allCoursesLessons.map((lessons, i) => {
					return { course: avaliableCourses.filter(course => course.disponivel)[i].nome, data: lessons };
				}),
			);
		};

		Lessonsfetch();
	}, [isCoursesLoaded, role, avaliableCourses]);

	useEffect(() => {
		if (role === 'Contratante') return;
		if (courses.length > 0) {
			setIsLoaded(true);
		}
	}, [courses, role]);
	// #endregion

	if (role === 'Contratante') {
		return (
			<main className="mainPage">
				<div style={{ padding: '24px', color: '#fff' }}>
					<h1>Área do Contratante</h1>
					<p>Em breve.</p>
				</div>
			</main>
		);
	} else {
		return (
			isLoaded && (
				<main className="mainPage">
					<SectionCourses avaliableCourses={avaliableCourses} courses={courses} />
					<Chat avaliableCourses={avaliableCourses} />
				</main>
			)
		);
	}
}
