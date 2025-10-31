'use client';
import { useEffect, useState } from 'react';
import LessonsNode from '@/components/nodes/LessonsNode';
import './page.css';
import { ReactFlow, Background, type Node, SelectionMode, PanOnScrollMode } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { emptyNode, lessonType, paramsType } from '@/types/types';
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
	const panOnDrag = [1, 2];

	// const INITIAL_NODES: Node[] = [
	// {
	//   id: '1',
	//   type: 'lessonsNode',
	//   position: {
	//     x: width / 2 + (Math.random() *400 - 200),
	//     y: 100,
	//   },
	//   data: {},
	// },
	// ];

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
				? lessons.data.map((lesson, i) => {
						return {
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
						};
				  })
				: (emptyNode as Node[]);
		setNodes(INITIAL_NODES);

	}, [lessons]);

	if (windowWidth === null) return null;
	console.log(nodes.length);
	return (
		isLoading &&
		windowHeight &&
		nodes[0].id !== '0' && (
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
