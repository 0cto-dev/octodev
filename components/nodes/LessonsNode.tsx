'use client';
import { FaCode } from 'react-icons/fa6';
import { IoRocket } from 'react-icons/io5';
import { FaTrophy } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { TbNumbers } from "react-icons/tb";
import { PiMathOperationsBold } from "react-icons/pi";
import { BiSolidCommentError } from "react-icons/bi";
import { HiVariable } from "react-icons/hi";
import { FaGlobeAmericas } from "react-icons/fa";



const iconMap:any = {
	DataTypes:{name: TbNumbers,size:35},
	Operators:{name: PiMathOperationsBold,size:32},
	Error:{name: BiSolidCommentError,size:30},
	Function:{name: HiVariable,size:30},
};

import { Handle, NodeProps, Position } from '@xyflow/react';

export default function LessonsNode(props: NodeProps) {
	// const Test = 'Function';
	const { name: IconComponent, size } = iconMap[props.data.icon as string] || {name: FaCode, size: 30};
	function handleClick() {}
	return (
		<div className={`nodeContent ${props.data.position}`} onClick={handleClick}>
			<div className="nodeHtml">
				<div className="node">
					{props.data.position === 'first' ? (
						<IoRocket size={30} />
					) : props.data.position === 'last' ? (
						<FaTrophy size={28} />
					) : props.data.position === 'current' ? (
						<FaPlay size={25} />
					) : (
						<IconComponent size={size} />
					)}
				</div>
				<p>{props.id.replace('licao', 'Lição ')}</p>
			</div>

			<Handle type="target" position={Position.Top} id="target" className="handlers" />

			<Handle type="source" position={Position.Bottom} id="source" className="handlers" />
		</div>
	);
}
