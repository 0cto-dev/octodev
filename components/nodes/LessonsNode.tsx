'use client'
import { NodeProps } from '@xyflow/react';

export default function LessonsNode(props: NodeProps) {
	return <div className="node"> {props.id}</div>;
}
