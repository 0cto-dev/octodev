'use client';
import { useEffect, useState } from 'react';
import LessonsNode from '@/components/nodes/LessonsNode';
import './page.css';
import { ReactFlow, Background, type Node, SelectionMode, PanOnScrollMode, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { emptyEdges, emptyNodes, lessonType, paramsType } from '@/types/types';
import { fetchData } from '@/lib/lessonsData';

const NODE_TYPES = {
	lessonsNode: LessonsNode,
};

export default function Home({ params }: { params: Promise<{ course: paramsType['course'] }> }) {
	const [windowWidth, setWindowWidth] = useState<number | null>(null);
	const [windowHeight, setWindowHeight] = useState<number | null>(null);
	const [lessons, setLessons] = useState({ course: '', id: '', data: [] as lessonType[] });
	const [isLoading, setIsLoading] = useState(false);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const panOnDrag = [1, 2];

	useEffect(() => {
		// Ao carregar os dados necessários, é chamado essa função
		const width = window.innerWidth;
		const height = window.innerHeight;
		setWindowWidth(width);
		setWindowHeight(height);
		console.log(height);
		fetchData(params, setLessons, setIsLoading);
	}, []);

	useEffect(() => {
		const INITIAL_NODES: Node[] =
			windowWidth && windowHeight
				? lessons.data.map((lesson, i) => ({
						id: lesson.id,
						type: 'lessonsNode',
						position: {
							x: windowWidth / 2 + (Math.random() * 200 - 100),
							y: windowHeight * 0.25 * i + windowHeight * 0.1,
						},
						data: {
							title: lesson.titulo,
							description: lesson.descricao,
							exercicios: lesson.exercicios,
							id: lesson.id,
						},
				  }))
				: (emptyNodes as Node[]);
		setNodes(INITIAL_NODES);
	}, [lessons]);

	useEffect(() => {
		const INITIAL_EDGES: Edge[] =
			// Ao carregar os nodes cria um array sem o ultimo node e cria edges ligando com o id da proxima lição
			nodes[0]?.id !== '0'
				? lessons.data.slice(0, lessons.data.length - 1).map((lesson, i) => ({
						id: `${lesson.id}-${+lesson.id.split('licao')[1] + 1}`,
						type: 'smoothstep',

						source: lesson.id,
						target: `licao${+lesson.id.split('licao')[1] + 1}`,
				  }))
				: (emptyEdges as Edge[]);
		console.log(nodes);
		console.log(INITIAL_EDGES);
		setEdges(INITIAL_EDGES);
	}, [nodes]);

	if (windowWidth === null) return null;
	console.log(nodes.length);
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
						[windowWidth, windowHeight * 0.25 * nodes.length + windowHeight * 0.1],
					]}
					nodeTypes={NODE_TYPES}
					nodes={nodes}
					edges={edges}
					panOnScroll
					selectionOnDrag
					panOnDrag={panOnDrag}
					selectionMode={SelectionMode.Partial}
					panOnScrollMode={'vertical' as PanOnScrollMode}
					elementsSelectable={false}
				>
					<Background
						size={3}
						gap={30}
						color="color-mix(in srgb, var(--disabled-foreground) 20%, transparent)"
					/>
				</ReactFlow>
			</main>
		)
	);
}
