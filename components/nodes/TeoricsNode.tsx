'use client';
import { Handle, NodeProps, Position } from '@xyflow/react';

export default function TeoricsNode(props: NodeProps) {
	return (
		<div className={`nodeContent teoric`}>
			<div className="texts">
				<div>
					<h1>Em breve...</h1>
					<hr />
				</div>
				<p>Em breve teremos Vídeo-Aulas para inteirar o seu conhecimento em {props.data.course as string}</p>
			</div>
			<Handlers />
		</div>
	);
}

function Handlers() {
	return (
		<>
			<Handle type="target" position={Position.Top} id="target" className="handlers" />

			<Handle type="source" position={Position.Bottom} id="source" className="handlers" />
		</>
	);
}
