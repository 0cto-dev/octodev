'use client';
import getCourses from '@/lib/readCoursesNames';
import { useEffect, useState } from 'react';
import './page.css';
import { getLesson } from '../[course]/pratica/[id]/lib/lessonsData';
import { courseType, lessonType } from '../../types/types';
import SectionCourses from './page.section';
import getCourseName from '@/lib/getCourseName';
import { IoChatboxEllipses } from 'react-icons/io5';
import { FaPaperPlane } from 'react-icons/fa';
import openaiApi from '../api/openAI/OpenAIAPI';

export default function Home() {
	// #region States
	const [avaliableCourses, setAvaliableCourses] = useState<courseType[]>([]);
	const [courses, setCourses] = useState<{ course: string; data: lessonType[] }[]>([]);
	const [isCoursesLoaded, setIsCoursesLoaded] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [chatOpened, setChatOpened] = useState(false);
	const [message, setMessage] = useState('');
	const [userMessages, setUserMessages] = useState<string[]>([]);
	const [aIMessages, setAIMessages] = useState<string[]>([]);
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
					return (await getLesson(getCourseName(course.nome), undefined)) as lessonType[];
				});

			const allCoursesLessons = await Promise.all(lessonPromises);

			setCourses(
				allCoursesLessons.map((lessons, i) => {
					return { course: avaliableCourses.filter(course => course.disponivel)[i].nome, data: lessons };
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

	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (target.closest('.chat>.button')) setChatOpened(chatOpened => !chatOpened);
		if (target.closest('.ChatMenuSubmitBtn')) addMessage();
	}

	async function addMessage() {
		if (message.trim() === '') return;
		setUserMessages([...userMessages, message]);
		setMessage('');
		const answer = await openaiApi(message, avaliableCourses);
		setAIMessages([...aIMessages, answer]);
		console.log('Resposta da IA:', answer);
	}
	return (
		isLoaded && (
			<main>
				<SectionCourses avaliableCourses={avaliableCourses} courses={courses} />
				<div className="chat">
					{chatOpened && (
						<div className="chatMenu">
							<div className="chatMenuContent">
								{/* <div className="message messageUser">Vegano pode comer batata?</div>
								<div className="message messageAI">
									Está é a mensagem da ia.... Lorem ipsum dolor sit, amet consectetur adipisicing
									elit. Aliquid delectus necessitatibus nihil asperiores officiis beatae neque facilis
									est! Sapiente, provident! Harum mollitia officiis tempora id laudantium sit dolores
									cumque tempore!
								</div> */}
								{userMessages.map((msg, i) => (
									<div className='msgComp' key={`message-group-${i}`}>
										<div className="message messageUser" key={`q${i}`}>
											{msg}
										</div>
										<div className="message messageAI" key={`a${i}`}>
											{aIMessages[i]||'...'}
										</div>
									</div>
								))}
							</div>

							<div className="chatMenuForm">
								<textarea
									placeholder="Faça a sua pergunta"
									value={message}
									onChange={e => setMessage(e.currentTarget.value)}
									onInput={e => {
										const textarea = e.currentTarget;

										// Ajusta a altura do textarea conforme o conteúdo, 29 caracteres por linha
										textarea.style.height =
											24 * Math.floor((textarea.value.length - 1) / 29) + 40 + 'px';
									}}
								></textarea>
								<button className="ChatMenuSubmitBtn" onClick={handleClick}>
									<FaPaperPlane size={20} />
								</button>
							</div>
						</div>
					)}
					<div className="button" onClick={handleClick}>
						<IoChatboxEllipses size={25} />
					</div>
				</div>
			</main>
		)
	);
}
