import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { IoChatboxEllipses } from 'react-icons/io5';
import openaiApi from '../api/openAI/OpenAIAPI';
import { courseType, emptyCourse } from '@/types/types';
import addMessage from './Chat.addMessage';

export default function Chat({ avaliableCourses }: { avaliableCourses: courseType[] }) {
	const [chatOpened, setChatOpened] = useState<'' | boolean>('');
	const [message, setMessage] = useState('');
	const [userMessages, setUserMessages] = useState<string[]>([]);
	const [aIMessages, setAIMessages] = useState<string[]>([]);

	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (target.closest('.chat>.button')) setChatOpened(chatOpened => !chatOpened);
		if (target.closest('.ChatMenuSubmitBtn'))
			addMessage({ message, setUserMessages, setMessage, avaliableCourses, aIMessages, setAIMessages });
	}
	return (
		<div className="chat">
			<div className={`chatMenu ${chatOpened === '' ? '' : chatOpened ? 'open' : 'close'}`}>
				<div className="chatMenuContent">
					{userMessages.map((msg, i) => (
						<div className="msgComp" key={`message-group-${i}`}>
							<div className="message messageUser" key={`q${i}`}>
								{msg}
							</div>
							<div className="message messageAI" key={`a${i}`}>
								{aIMessages[i] || '...'}
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
							textarea.style.height = 24 * Math.floor((textarea.value.length - 1) / 29) + 40 + 'px';
						}}
					></textarea>
					<button className="ChatMenuSubmitBtn" onClick={handleClick}>
						<FaPaperPlane size={20} />
					</button>
				</div>
			</div>

			<div className="button" onClick={handleClick}>
				<IoChatboxEllipses size={25} />
			</div>
		</div>
	);
}
