import ProgressBarComp from '@/components/progressBar/ProgressBar';
import { courseType } from '@/types/types';
import { useState } from 'react';
import CourseImage from './page.sectionImage';
import CourseInfo from './page.sectionInfo';

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

	return (
		<div
			className={`courseCard ${course.nome.toLowerCase()} ${course.disponivel ? '' : 'disabled'}`}
			style={shadowStyle}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
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

function getProgress(course: courseType, LessonsNum: number) {
	const key = course.nome === 'Tenda' ? 'logica' : course.nome.toLowerCase();
	const stored = typeof window !== 'undefined' ? localStorage.getItem(`${key}Progress`) : null;
	const value = Number(stored ?? 0);
	return LessonsNum ? (value / LessonsNum) * 100 : 0;
}
function ProgressBar({ children }: { children: React.ReactNode }) {
	return <div className="progress-barDiv">{children}</div>;
}
