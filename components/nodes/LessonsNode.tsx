'use client';
import { FaCode } from 'react-icons/fa6';
import { IoRocket } from 'react-icons/io5';
import { FaTrophy } from 'react-icons/fa';

import { Handle, NodeProps, Position } from '@xyflow/react';

export default function LessonsNode(props: NodeProps) {
	return (
		<div className={`nodeContent ${props.data.position}`}>
			<div className="nodeHtml">
				<div className="node">
					{props.data.position === 'first' ? (
						<IoRocket size={30} />
					) : props.data.position === 'last' ? (
						<FaTrophy size={25} />
					) : (
						<FaCode size={25} />
					)}
				</div>
				<p>{props.id.replace('licao', 'Lição ')}</p>
			</div>

			<Handle type="target" position={Position.Top} id="target" className="handlers" />

			<Handle type="source" position={Position.Bottom} id="source" className="handlers" />
		</div>
	);
}
