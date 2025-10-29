'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

export default function PopUp({ type, course, lessonId }: { type: string; course: string; lessonId: string }) {
	const [isMounted, setIsMounted] = useState(false);
	const router = useRouter();

	let title: string = '';
	let text: string = '';

	let buttons;
	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) return null; // Or return some fallback UI

	if (type === 'lose') {
		title = 'Você perdeu!';
		text = 'Não desista, tente novamente!';
		buttons = [
			{
				id: 1,
				textContent: 'Sair',
				active: false,
				onclick: ()=>{router.push(`/${course}`)},
			},
			{
				id: 2,
				textContent: 'Tentar novamente',
				active: true,
				onclick: ()=>{window.location.reload()},
			},
		];
	}

	if (type === 'finish') {
		title = 'Parabéns, você conseguiu!';
		text = 'Deseja continuar fazendo as lições ou sair para assistir uma videoaula?';
		buttons = [
			{
				id: 1,
				textContent: 'Sair',
				active: false,
				onclick: ()=>{router.push(`/${course}`)},
			},
		];
	}

	return (
		<div className="popUp">
			<div className="texts">
				<h1>{title}</h1>
				<p>{text}</p>
			</div>
			<div className="buttons">
				{buttons &&
					buttons.map(button => {
						return (
							<button
								className={button.active ? 'active' : ''}
								key={button.id}
								onClick={() => button.onclick()}
							>
								{button.textContent}
							</button>
						);
					})}
			</div>
		</div>
	);
}
