'use client';
import { useEffect, useState } from 'react';
import LessonsNode from '@/components/nodes/LessonsNode';
import './page.css';
import { ReactFlow, Background, type Node, SelectionMode, PanOnScrollMode,  Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { emptyNodes, lessonType, paramsType } from '@/types/types';
import { fetchData } from '@/lib/lessonsData';
import roundedEdge from '@/components/edges/LessonsEdge';
import loadNodes from './page.loadNodes';
import loadEdges from './page.loadEdges';

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
	const [isLoaded, setIsLoaded] = useState(false);
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [lessonIdMenuOpen, setLessonIdMenuOpen] = useState('');
	// #endregion

	const nodeSize = 40;
	const lastMadeLesson = 3;

	useEffect(() => {
		// Ao carregar os dados necessários, é chamado essa função
		const width = window.innerWidth;
		const height = window.innerHeight;
		setWindowWidth(width);
		setWindowHeight(height);
		fetchData(params, setLessons, setIsLoaded);
	}, []);

	useEffect(() => {
		// Ao carregar as lições do lessons.json é chamada essa função
		// Ela é responsável por criar os nodes de lições e definir a sua posição horizontal
		setNodes(emptyNodes);

		if (!(windowWidth && windowHeight)) return;

		const jumpBetweenPositions = (windowWidth / nodeSize) * 4;
		let position = windowWidth / 2 - nodeSize;

		loadNodes({
			lessons,
			position,
			windowHeight,
			windowWidth,
			lessonIdMenuOpen,
			lastMadeLesson,
			jumpBetweenPositions,
			nodeSize,
			setNodes,
		});
	}, [lessons]);

	useEffect(() => {
		// Ao carregar os nodes cria um array sem o último node e cria edges ligando com o id da proxima lição
		loadEdges({ lessons, nodes, setEdges });
	}, [nodes]);

	function handleOnClick() {}

	if (!windowWidth || !windowHeight || !isLoaded || nodes[0]?.id === '0' || edges[0]?.id === '0') return null;

	return (
		<main onClick={handleOnClick}>
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
				panOnDrag={[1, 2]}
				selectionMode={SelectionMode.Partial}
				panOnScrollMode={'vertical' as PanOnScrollMode}
				elementsSelectable={false}
			>
				<Background size={4} gap={30} color="color-mix(in srgb, var(--disabled-foreground) 20%, transparent)" />
			</ReactFlow>
		</main>
	);
}
