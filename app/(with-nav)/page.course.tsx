import ProgressBarComp from '@/components/progressBar/ProgressBar';
import { courseType } from '@/types/types';
import { useState } from 'react';
import CourseImage from './page.sectionImage';
import CourseInfo from './page.sectionInfo';
import getCourseName from '@/lib/getCourseName';

export type CourseProps = { course: courseType; LessonsNum: number };

export default function Course({ course, LessonsNum }: CourseProps) {
	const [isHovered, setIsHovered] = useState(false);

	const progress = getProgress(course, LessonsNum);

	const shadowStyle =
		isHovered && course.disponivel
			? course.nome !== 'Tenda'
				? { boxShadow: `0px 0px 15px 6px ${course.cor}` }
				: {}
			: {};

	function handleClick(){

		if(course.disponivel)location.href = `/${getCourseName(course.nome)}`
	}

	return (
		<div
			className={`courseCard ${course.nome.toLowerCase()} ${course.disponivel ? '' : 'disabled'}`}
			style={shadowStyle}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={handleClick}
		>
			<CourseImage course={course} />
			<CourseInfo course={course} LessonsNum={LessonsNum} />
			<ProgressBar>
				<span>progresso</span>
				<span>{progress.toFixed(0)}%</span>
				<ProgressBarComp progress={progress} />
			</ProgressBar>
		</div>
	);
}

export function getProgress(course: courseType, LessonsNum: number) {
	const key = getCourseName(course.nome)
	const stored = typeof window !== 'undefined' ? localStorage.getItem(`${key}Progress`) : null;
	const value = Number(stored ?? 0);
	return LessonsNum ? (value / LessonsNum) * 100 : 0;
}

function ProgressBar({ children }: { children: React.ReactNode }) {
	return <div className="progress-barDiv">{children}</div>;
}
