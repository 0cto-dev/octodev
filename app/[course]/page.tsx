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
	const [lessons, setLessons] = useState({ course: '', id: '', data: [{}] as lessonType[] });
	const [isLoading, setIsLoading] = useState({});
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
		setWindowWidth(width);
		fetchData(params, setLessons, setIsLoading);
	}, []);

	useEffect(() => {
		const INITIAL_NODES: Node[] =
			windowWidth !== null
				? lessons.data.map((lesson, i) => {
						return {
							id: lesson.id,
							type: 'lessonsNode',
							position: {
								x: windowWidth / 2 + (Math.random() * 200 - 100),
								y: 150 * i + 100,
							},
							data: {
								title: lesson.titulo,
								description: lesson.descricao,
								exercicios: lesson.exercicios,
								id: lesson.id,
							},
						};
				  })
				: emptyNode;
		setNodes(INITIAL_NODES);
	}, [lessons]);

	if (windowWidth === null) return null;

	return (
		isLoading && (
			<main>
				<ReactFlow
					minZoom={1}
					maxZoom={1}
					nodeTypes={NODE_TYPES}
					nodes={nodes}
					panOnScroll
					selectionOnDrag
					panOnDrag={panOnDrag}
					selectionMode={SelectionMode.Partial}
          panOnScrollMode={'vertical' as PanOnScrollMode}
          
				>
					<Background size={2} gap={25} color="color-mix(in srgb, var(--primary) 50%, transparent)" />
				</ReactFlow>
			</main>
		)
	);
}
