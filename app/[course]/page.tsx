'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import LessonsNode from '@/components/nodes/LessonsNode';
import './page.trilha.css';
import {
	ReactFlow,
	Background,
	type Node,
	SelectionMode,
	PanOnScrollMode,
	Edge,
	ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { emptyNodes, lessonType, paramsType } from '@/types/types';
import { fetchData } from '@/app/[course]/pratica/[id]/lib/lessonsData';
import roundedEdge from '@/components/edges/LessonsEdge';
import loadNodes from './page.loadNodes';
import loadEdges from './page.loadEdges';
import TeoricsNode from '@/components/nodes/TeoricsNode';
import { useReactFlow } from '@xyflow/react';
import Tab from './page.Tab';
import { FaArrowUp } from 'react-icons/fa';

const NODE_TYPES = {
	lessonsNode: LessonsNode,
	teoricNode: TeoricsNode,
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
	const [nodesType, setNodesType] = useState<'pratica' | 'teorica'>('pratica');
	// #endregion

	const nodeSize = 40;
	const lastMadeLesson = 0;

	// #region Effects
	useEffect(() => {
		// Ao carregar os dados necessários, é chamado essa função
		setWindowWidth(window.innerWidth);
		setWindowHeight(window.innerHeight);
		window.addEventListener('resize', () => {
			setWindowWidth(window.innerWidth);
			setWindowHeight(window.innerHeight);
		});
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
			jumpBetweenPositions,
			nodeSize,
			setNodes,
			nodesType,
		});
	}, [lessons, lessonIdMenuOpen, nodesType]);

	useEffect(() => {
		// Ao carregar os nodes cria um array sem o último node e cria edges ligando com o id da proxima lição
		loadEdges({ lessons, nodes, setEdges });
	}, [nodes]);

	useEffect(() => {
		// Sempre que clicar em um node de lição esse useEffect será chamado e mudará o z-index de todos os elementos deixando o elemento
		// que foi clicado na frente, impedindo de que outros elementos fiquem na frente do popUp
		setNodes(INITIAL_NODES =>
			INITIAL_NODES.map(node => ({
				...node,
				style: {
					...node.style,
					zIndex: lessonIdMenuOpen === node.id ? 100 : 1,
				},
			}))
		);
	}, [lessonIdMenuOpen, setNodes]);
	// #endregion

	function handleOnClick(e: React.MouseEvent<Element>) {
		const clickedAriaLabel = (e.target as HTMLElement).closest('.nodeContent')?.ariaLabel;

		if (clickedAriaLabel === undefined || clickedAriaLabel === null) {
			setLessonIdMenuOpen('');
			return null;
		}
		setLessonIdMenuOpen(lessonIdMenuOpen => (lessonIdMenuOpen === clickedAriaLabel ? '' : clickedAriaLabel));

		console.log(clickedAriaLabel);
	}

	if (!windowWidth || !windowHeight || !isLoaded || nodes[0]?.id === '0' || edges[0]?.id === '0') return null;
	return (
		<main onClick={handleOnClick} key="trilha">
			<div className="blur"></div>
			<ReactFlowProvider>
				<Tab  nodesType={nodesType} setNodesType={setNodesType} />
				<GoToTopButton  />
				<ReactFlow
					minZoom={1}
					maxZoom={1}
					translateExtent={[
						[0, 0],
						[
							windowWidth,
							nodesType === 'pratica' ? 200 * nodes.length + windowHeight * 0.1 + 300 : windowHeight,
						],
					]}
					nodeTypes={NODE_TYPES}
					nodes={nodes}
					edges={edges}
					edgeTypes={EDGE_TYPES}
					panOnScroll
					selectionOnDrag
					nodesDraggable={false}
					panOnDrag={[1, 2]}
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
			</ReactFlowProvider>
		</main>
	);
}
function GoToTopButton(){

	return(
		<button className='goToTop'>
			<FaArrowUp size={15}/>
		</button>
	)
}