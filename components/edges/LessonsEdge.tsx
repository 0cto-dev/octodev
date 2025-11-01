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
		sourceY,
		sourcePosition,
		targetX,
		targetY: targetY+20,
		targetPosition,
		borderRadius:20,
	});

	return <BaseEdge id={id} path={path} style={style} />;
}
