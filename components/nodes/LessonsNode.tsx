'use client';
import { FaCode } from 'react-icons/fa6';
import { Handle, NodeProps, Position } from '@xyflow/react';

export default function LessonsNode(props: NodeProps) {
	return (
		<div className="nodeContent">
			<div className="node">
				<FaCode size={25} />
			</div>
			<p>{props.id.replace('licao', 'Lição ')}</p>

			<Handle type="target" position={Position.Right} id="target" className="handlers" />

			<Handle type="source" position={Position.Left} id="source" className="handlers" />
		</div>
	);
}
