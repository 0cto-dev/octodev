'use client';
// #region ICONES
import { FaCode } from 'react-icons/fa6';
import { IoHeartSharp, IoRocket } from 'react-icons/io5';
import { FaTrophy } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { TbNumbers } from 'react-icons/tb';
import { PiMathOperationsBold } from 'react-icons/pi';
import { BiSolidCommentError } from 'react-icons/bi';
import { HiVariable } from 'react-icons/hi';
import { IconType } from 'react-icons';
// #endregion
import { Handle, NodeProps, Position } from '@xyflow/react';
import { exercisesType } from '@/types/types';
import { useRouter } from 'next/navigation';

const iconMap: { [key: string]: { name: IconType; size: number } } = {
	DataTypes: { name: TbNumbers, size: 35 },
	Operators: { name: PiMathOperationsBold, size: 32 },
	Error: { name: BiSolidCommentError, size: 30 },
	Function: { name: HiVariable, size: 30 },
};

export default function LessonsNode(props: NodeProps) {
	const { name: IconComponent, size } = iconMap[props.data.icon as string] || { name: FaCode, size: 30 };
	const position = props.data.position as { index: number; class: string };
	const router = useRouter();
	function handlePush() {
		window.location.href = `/${props.data.course}/pratica/${props.id}`;
	}
	return (
		<div
			className={`nodeContent practice ${props.data.disabled ? 'disabled' : 'enabled'} ${position.class} ${
				props.data.whichSideOpenPopUp
			} ${
				(props.data.lessonIdMenuOpen as string) === props.data.id &&
				position.index < (props.data.lastMadeLesson as number) + 1
					? 'open'
					: ''
			}`}
			aria-label={(props.data.id as string).toString()}
		>
			<div className="nodeHtml">
				<div className="node">
					{position.class === 'first' ? (
						<IoRocket size={30} />
					) : position.class === 'last' ? (
						<FaTrophy size={28} />
					) : position.class === 'current' ? (
						<FaPlay size={25} />
					) : (
						<IconComponent size={size} />
					)}
				</div>

				<p>{props.id.replace('licao', 'Lição ')}</p>
			</div>
			{(props.data.lessonIdMenuOpen as string) === props.data.id &&
				position.index < (props.data.lastMadeLesson as number) + 1 && (
					<div className="popUp">
						<div className="texts">
							<header>
								<div className="hearts">
									{Array.from({ length: 5 }).map((_, i) => (
										<IoHeartSharp size={18} color="var(--red)" key={i} />
									))}
								</div>
								<p>{(props.data.exercises as exercisesType[]).length} exercícios</p>
							</header>
							<h1>{props.data.title as string}</h1>
							<p>{props.data.description as string}</p>
						</div>
						<button onClick={handlePush}>Começar</button>
					</div>
				)}
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
