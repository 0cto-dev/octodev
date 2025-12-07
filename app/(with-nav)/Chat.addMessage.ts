import { courseType, emptyCourse } from '@/types/types';
import openaiApi from '../api/openAI/OpenAIAPI';
import { Dispatch, SetStateAction } from 'react';

type addMessageProps = {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
	setUserMessages: Dispatch<SetStateAction<string[]>>;
	avaliableCourses: courseType[];
	setAIMessages: Dispatch<SetStateAction<string[]>>;
	aIMessages: string[];
};

export default async function addMessage({
	message,
	setUserMessages,
	setMessage,
	avaliableCourses,
	setAIMessages,
	aIMessages,
}: addMessageProps) {
	if (message.trim() === '') return;
	setUserMessages(userMessages => [...userMessages, message]);
	setMessage('');
	const answer = await openaiApi(
		message,
		`Você é um assistente útil que ajuda os usuários a entender conceitos de programação de forma fácil e descontraída,
			seja breve e não use emojis e nem markdown.
			Caso a pergunta não seja relacionada a programação, ou à plataforma diga: "Desculpe, esta pergunta não está relacionada à programação."
			informações sobre o aplicativo(OctoDev): OctoDev é uma plataforma educacional gamificada focada no ensino de programação, 
			oferecendo uma abordagem interativa e divertida para aprender a programar.
			na tela inicial do aplicativo, o usuário pode escolher entre várias linguagens de programação, 
			aqui está um json mostrando os cursos disponíveis no momento: ${JSON.stringify(
				avaliableCourses.length > 0 ? avaliableCourses : [emptyCourse]
			)}.
			Recomende bastante tenda, pois é uma ótima linguagem para iniciantes. principalmente para pessoas que não dominam o inglês.
			Cada curso é dividido em lições que abrangem desde conceitos básicos até tópicos avançados, 
			incluindo exercícios práticos e quizzes para reforçar o aprendizado.
			`
	);
	setAIMessages([...aIMessages, answer]);
}
