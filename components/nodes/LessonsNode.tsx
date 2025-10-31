'use client';
import { FaCode } from 'react-icons/fa6';
import { NodeProps } from '@xyflow/react';

export default function LessonsNode(props: NodeProps) {
	return (
		<div className='nodeContent'>
			<div className="node">
				<FaCode size={25} />
			</div>
			<p>{props.id.replace("licao","Lição ")}</p>
		</div>
	);
}
