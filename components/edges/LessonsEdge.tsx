import { BaseEdge, getSmoothStepPath } from '@xyflow/react';

export default function roundedEdge({
	id,
	sourceX,
	sourceY,
	sourcePosition,
	targetX,
	targetY,
	targetPosition,
	style,
}: any) {
	const [path] = getSmoothStepPath({
		sourceX,
		sourceY: sourceY+13,
		sourcePosition,
		targetX,
		targetY: targetY+18,
		targetPosition,
		borderRadius:20,
	});

	return <BaseEdge id={id} path={path} style={style} />;
}
