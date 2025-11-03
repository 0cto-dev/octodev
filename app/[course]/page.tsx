'use client';
import { useEffect, useState } from 'react';
import LessonsNode from '@/components/nodes/LessonsNode';
import './page.css';
import { ReactFlow, Background, type Node, SelectionMode, PanOnScrollMode, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { emptyEdges, emptyNodes, lessonType, paramsType } from '@/types/types';
import { fetchData } from '@/lib/lessonsData';
import roundedEdge from '@/components/edges/LessonsEdge';

const NODE_TYPES = {
	lessonsNode: LessonsNode,
};
const EDGE_TYPES = {
	roundedEdge: roundedEdge,
};

export default function Home({ params }: { params: Promise<{ course: paramsType['course'] }> }) {
	// #region States
	const [windowWidth, setWindowWidth] = useState<number | null>(null);
	const [windowHeight, setWindowHeight] = useState<number | null>(null);
	const [lessons, setLessons] = useState({ course: '', id: '', data: [] as lessonType[] });
	const [isLoading, setIsLoading] = useState(false);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	// #endregion
	
	const panOnDrag = [1, 2];
	const nodeSize = 40;
	const lastMadeLesson = 3;

	useEffect(() => {
		// Ao carregar os dados necessários, é chamado essa função
		const width = window.innerWidth;
		const height = window.innerHeight;
		setWindowWidth(width);
		setWindowHeight(height);
		fetchData(params, setLessons, setIsLoading);
	}, []);

	useEffect(() => {
		// Ao carregar as lições do lessons.json é chamada essa função
		// Ela é responsável por criar os nodes de lições e definir a sua posição horizontal
		setNodes(emptyNodes);

		if (!(windowWidth && windowHeight)) return;

		// Caso seja disposivo movel, cada pulo é 20% da tela, caso seja computador é 10%
		const jumpBetweenPositions = (windowWidth / nodeSize) * 4;
		let position = windowWidth / 2 - nodeSize;

		const INITIAL_NODES: Node[] = lessons.data.map((lesson, i) => {
			console.log(200 * i + windowHeight * 0.1);
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
	}, [lessons]);

	useEffect(() => {
		const INITIAL_EDGES: Edge[] =
			// Ao carregar os nodes cria um array sem o ultimo node e cria edges ligando com o id da proxima lição
			nodes[0]?.id !== '0'
				? lessons.data.slice(0, lessons.data.length - 1).map((lesson, i) => ({
						id: `${lesson.id}-${+lesson.id.split('licao')[1] + 1}`,
						type: 'roundedEdge',

						source: lesson.id,
						target: `licao${+lesson.id.split('licao')[1] + 1}`,
						style: { strokeWidth: 3, stroke: 'var(--disabled-foreground)', transform: 'translateY(-10%)' },
				  }))
				: (emptyEdges as Edge[]);
		setEdges(INITIAL_EDGES);
	}, [nodes]);

	if (windowWidth === null) return null;
	return (
		isLoading &&
		windowHeight &&
		nodes[0]?.id !== '0' &&
		edges[0]?.id !== '0' && (
			<main>
				<ReactFlow
					minZoom={1}
					maxZoom={1}
					translateExtent={[
						[0, 0],
						[windowWidth, 200 * nodes.length + windowHeight * 0.1],
					]}
					nodeTypes={NODE_TYPES}
					nodes={nodes}
					edges={edges}
					edgeTypes={EDGE_TYPES}
					panOnScroll
					selectionOnDrag
					panOnDrag={panOnDrag}
					selectionMode={SelectionMode.Partial}
					panOnScrollMode={'vertical' as PanOnScrollMode}
					elementsSelectable={false}
				>
					<Background
						size={4}
						gap={30}
						color="color-mix(in srgb, var(--disabled-foreground) 20%, transparent)"
					/>
				</ReactFlow>
			</main>
		)
	);
}
