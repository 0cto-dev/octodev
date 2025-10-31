import { alternativasType, LessonSectionType } from '@/types/types';
import { useEffect, useState } from 'react';

type OptionComponentType = {
	option: alternativasType;
} & Omit<LessonSectionType, 'lesson' | 'shuffledAlternatives'|'code'|'output'|'setCode'|'goingToNextExercise'>;

export default function Option({ option, setExercise, exercise }: OptionComponentType) {
	const isSelected = option.id === exercise.selectedAlternative?.id;
	const isCorrectPhase = exercise.exerciseStatus === 'correct';
	const isWrong = isCorrectPhase && !option.correto;
	const [rotationValue,setRotationValue] = useState(0)

	useEffect(()=>{
		setRotationValue(Math.random() * 500)
	},[exercise.exerciseStatus])

	function handleEndRotation(e: React.AnimationEvent<HTMLButtonElement>) {
		const target = e.target as HTMLElement
		if (e.animationName !== 'rotate') return;
		setRotationValue(0)
		target.style.transform = 'rotate(0deg) !important';
	}
	const getButtonStyle = (): React.CSSProperties => {
		if (!isCorrectPhase) return {};
		if (isWrong) {
			return {
				transform: `${isCorrectPhase ? `rotate(${rotationValue}deg)` : ''}`,
			};
		}
		return {
			transform: 'translate(-50%, -150%)',
			position: 'absolute',
			top: '50%',
			left: '50%',
		};
	};

	const handleClick = () => !isCorrectPhase && setExercise(prev => ({ ...prev, selectedAlternative: option }));
	return (
		<div className={isWrong ? 'wrong' : ''}>
			<button
				onClick={handleClick}
				className={`option-button ${isSelected ? 'selected' : ''} ${isWrong ? 'wrong' : ''}`}
				style={getButtonStyle()}
				onAnimationEnd={handleEndRotation}
			>
				{option.valor}
			</button>
		</div>
	);
}
