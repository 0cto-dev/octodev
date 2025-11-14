import { lessonType } from '@/types/types';
import { Node } from '@xyflow/react';
import { Dispatch, SetStateAction } from 'react';
import { useIsMobile } from '../../../lib/isMobile';

type loadNodesType = {
	lessons: {
		course: string;
		id: string;
		data: lessonType[];
	};

	position: number;
	windowHeight: number;
	windowWidth: number;
	jumpBetweenPositions: number;
	lastMadeLesson: number;
	nodeSize: number;

	lessonIdMenuOpen: string;
	setNodes: Dispatch<SetStateAction<Node[]>>;
	nodesType: 'teorica' | 'pratica';
};
let xPositions: number[] = [];
let positionOfCurrentLessonNode = 0;

export default function loadNodes({
	lessons,
	position,
	windowHeight,
	windowWidth,
	lessonIdMenuOpen,
	jumpBetweenPositions,
	lastMadeLesson,
	nodeSize,
	setNodes,
	nodesType,
}: loadNodesType) {
	const isMobile = useIsMobile();

	// console.log(`${lessons.course}Progress: `+localStorage.getItem(`${lessons.course}Progress`))

	const INITIAL_NODES: Node[] =
		nodesType === 'pratica'
			? lessons.data.map((lesson, i) => {
					i === 0 && !xPositions[0] && xPositions.push(position);
					if (!positionOfCurrentLessonNode && i === +lastMadeLesson)
						positionOfCurrentLessonNode = position + nodeSize / 2;
					
					console.log(200 * i +windowHeight*0.2)

					const lessonObj = {
						id: lesson.id,
						type: 'lessonsNode',
						position: {
							x: xPositions[i] || position,
							y: 200 * i + windowHeight * 0.2,
						},
						data: {
							course: lessons.course,
							title: lesson.titulo,
							description: lesson.descricao,
							exercises: lesson.exercicios,
							id: lesson.id,
							icon: lesson.icone,
							lessonIdMenuOpen,
							whichSideOpenPopUp:
								windowWidth - xPositions[i] < 210 ? 'left' : xPositions[i] < 130 ? 'right' : '',
							lastMadeLesson,
							disabled: i > +lastMadeLesson,
							position: {
								index: i,
								class:
									i === 0
										? 'first'
										: i + 1 === lessons.data.length
										? 'last'
										: i === +lastMadeLesson && positionOfCurrentLessonNode > windowWidth / 2
										? 'current leftTitle'
										: i === +lastMadeLesson && positionOfCurrentLessonNode <= windowWidth / 2
										? 'current rightTitle'
										: '',
							},
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

					if (position < (isMobile ? 0 : 220)) {
						position += jumpBetweenPositions * 2;
					}

					if (position > windowWidth - nodeSize - 70) {
						position -= jumpBetweenPositions * 2;
					}

					!xPositions[i + 1] && xPositions.push(position);

					return lessonObj;
			  })
			: [
					{
						id: 'LicaoTeoricaTempMsg',
						type: 'teoricNode',
						position: {
							// centralizando no responsivamente em portrait e landscape
							x: windowWidth / 2 - (isMobile ? (windowWidth * 0.95) / 2 : (windowWidth * 0.45) / 2),
							y: windowHeight / 2 - 150,
						},
						data: {
							course: lessons.course,
						},
					},
			  ];

	setNodes(INITIAL_NODES);
}
