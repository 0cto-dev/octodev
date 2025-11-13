import { Dispatch, SetStateAction } from 'react';
import { emptyEdges, lessonType } from '../../types/types';
import { Edge, Node } from '@xyflow/react';

type loadEdgesType = {
	nodes: Node[];
	lessons: {
		course: string;
		id: string;
		data: lessonType[];
	};
	setEdges: Dispatch<SetStateAction<Edge[]>>;
};
export default function loadEdges({ nodes, lessons, setEdges }: loadEdgesType) {
	const edgeColor = window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'var(--disabled-foreground)'
		: 'var(--border)';
		console.log(edgeColor)

	const INITIAL_EDGES: Edge[] =
		nodes[0]?.id !== '0'
			? lessons.data.slice(0, lessons.data.length - 1).map((lesson, i) => ({
					id: `${lesson.id}-${+lesson.id.split('licao')[1] + 1}`,
					type: 'roundedEdge',

					source: lesson.id,
					target: `licao${+lesson.id.split('licao')[1] + 1}`,
					style: { strokeWidth: 3, stroke: edgeColor, transform: 'translateY(-10%)' },
			  }))
			: (emptyEdges as Edge[]);
	setEdges(INITIAL_EDGES);
}
