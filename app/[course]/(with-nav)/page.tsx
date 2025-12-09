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
import { FaArrowDown } from 'react-icons/fa';
import { BiCurrentLocation } from 'react-icons/bi';
import { computeProgress } from '@/app/api/progress/progress';
import { getSession } from 'next-auth/react';
import { useIsMobile } from '@/lib/isMobile';

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

	const isMobile = useIsMobile()
	const nodeSize = 40;

	const [lastMadeLesson, setLastMadeLesson] = useState<number>(0);

	useEffect(() => {
		async function loadLastMadeLesson() {
			if (!isLoaded) return;
			
			const session = await getSession();
			const last = session?.user?.courses?.find((c: any) => c.courseName === lessons.course)?.lastLessonMade ?? 0;

			setLastMadeLesson(Number(last) || 0);
		}
		loadLastMadeLesson();
	}, [isLoaded, lessons.course]);

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
		if (lessons.data.length === 0) return;

		async function updateProgress() {
			const session = await getSession();

			const lastLesson =
				session?.user?.courses?.find((c: any) => c.courseName === lessons.course)?.lastLessonMade || 0;

			const progressPercent = computeProgress(lastLesson, lessons.data.length);

			await fetch('/api/progress/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					userId: session?.user?.id,
					courseName: lessons.course,
					lessonId: lastLesson,
					progress: progressPercent,
				}),
			});
		}

		updateProgress();
	}, [lessons.data]);

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
			lastMadeLesson,
			nodeSize,
			setNodes,
			nodesType,
			isMobile
		});
	}, [lessons, lessonIdMenuOpen, nodesType, lastMadeLesson]);

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
	}
	if (!windowWidth || !windowHeight || !isLoaded || nodes[0]?.id === '0' || edges[0]?.id === '0') return null;

	const lastNodePos = 200 * (nodes.length - 1) + windowHeight * 0.2;
	const maxHeight = nodesType === 'pratica' ? lastNodePos + windowHeight - 220 : windowHeight;
	return (
		<main onClick={handleOnClick} key="trilha">
			<div className="blur"></div>
			<ReactFlowProvider>
				<Tab nodesType={nodesType} setNodesType={setNodesType} />
				<GoToPosition className={'goToTop'} type="yCords" value={0}>
					<FaArrowUp size={15} />
				</GoToPosition>

				<GoToPosition
					className={'goToCurrent'}
					type="nodeNumber"
					value={+lastMadeLesson + 1}
					nodesType={nodesType}
				>
					<BiCurrentLocation size={15} />
				</GoToPosition>

				<GoToPosition className={'goToBottom'} type="nodeNumber" value={nodes.length} nodesType={nodesType}>
					<FaArrowDown size={15} />
				</GoToPosition>

				<ReactFlow
					minZoom={1}
					maxZoom={1}
					translateExtent={[
						[0, 0],
						[windowWidth, maxHeight],
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

function GoToPosition({
	type,
	value = 0,
	nodesType = 'pratica',
	className,
	children,
}: {
	type: 'yCords' | 'nodeNumber';
	value: number;
	nodesType?: 'pratica' | 'teorica';
	className?: string;
	children: React.ReactNode;
}) {
	const { setViewport } = useReactFlow();

	let yPosition: number;
	switch (type) {
		case 'yCords':
			yPosition = value;
			break;
		case 'nodeNumber':
			yPosition = nodesType === 'pratica' ? 200 * (value - 1) + 40 : 0;
			break;

		default:
			yPosition = 0;
			break;
	}

	function handleClick() {
		setViewport({ x: 0, y: -yPosition, zoom: 1 }, { interpolate: 'smooth', duration: 1000 });
	}
	return (
		<button className={className} onClick={handleClick}>
			{children}
		</button>
	);
}
