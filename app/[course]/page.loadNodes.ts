import { lessonType } from '@/types/types';
import { Node } from '@xyflow/react';
import { Dispatch, SetStateAction } from 'react';

type loadNodesType = {
	lessons: {
		course: string;
		id: string;
		data: lessonType[];
	};

	position: number;
	lastMadeLesson: number;
	windowHeight: number;
	windowWidth: number;
	jumpBetweenPositions: number;
	nodeSize: number;

	lessonIdMenuOpen: string;
	setNodes: Dispatch<SetStateAction<Node[]>>;
};

export default function loadNodes({
	lessons,
	position,
	windowHeight,
	windowWidth,
	lessonIdMenuOpen,
	lastMadeLesson,
	jumpBetweenPositions,
	nodeSize,
	setNodes,
}: loadNodesType) {
	const INITIAL_NODES: Node[] = lessons.data.map((lesson, i) => {
		const lessonObj = {
			id: lesson.id,
			type: 'lessonsNode',
			position: {
				x: position,
				y: 200 * i + windowHeight * 0.1,
			},
			data: {
				title: lesson.titulo,
				description: lesson.descricao,
				exercicios: lesson.exercicios,
				id: lesson.id,
				icon: lesson.icone,
				lessonIdMenuOpen,
				position:
					i === 0
						? 'first'
						: i + 1 === lessons.data.length
						? 'last'
						: i === lastMadeLesson
						? 'current'
						: i > lastMadeLesson
						? 'disabled'
						: '',
			},
		};

		let random: number = 0;

		for (let _ = 0; _ < 2; _++) {
			// (Math.floor(Math.random() * 3) - 1) pode ser tanto -1,0,1, e isso é multiplicado por 1/10 do tamanho horizontal da pagina
			// ou seja:
			// -1: vai retornar um valor negativo, fazendo o próximo node ser à esquerda do anterior
			// 0: vai retornar 0, fazendo o próximo node ser na mesma linha do anterior
			// 1: vai retornar um valor positivo, fazendo o próximo node ser à direita do anterior
			// ele vai resortear o valor até o numero randomico ser != 0 ou ele ter sorteado 2 vezes
			// Isso faz com que diminua as ocorrencias de não mudar de linha
			random = jumpBetweenPositions * (Math.floor(Math.random() * 3) - 1);
			if (random !== 0) break;
		}
		position += random;

		if (position < nodeSize) {
			position += jumpBetweenPositions * 2;
		}
		if (position > windowWidth - nodeSize) {
			position -= jumpBetweenPositions * 2;
		}
		return lessonObj;
	});

	setNodes(INITIAL_NODES);
}
