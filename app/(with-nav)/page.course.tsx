import ProgressBarComp from '@/components/progressBar/ProgressBar';
import { courseType } from '@/types/types';
import { useEffect, useState } from 'react';
import CourseImage from './page.sectionImage';
import CourseInfo from './page.sectionInfo';
import getCourseName from '@/lib/getCourseName';
import { getSession } from 'next-auth/react';
import { computeProgress } from '../api/progress/progress';

export type CourseProps = { course: courseType; LessonsNum: number };

export default function Course({ course, LessonsNum }: CourseProps) {
	const [isHovered, setIsHovered] = useState(false);

	const shadowStyle =
		isHovered && course.disponivel
			? course.nome !== 'Tenda'
				? { boxShadow: `0px 0px 15px 6px ${course.cor}` }
				: {}
			: {};

	function handleClick() {
		if (course.disponivel) location.href = `/${getCourseName(course.nome)}`;
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
			<CourseProgressBar course={course} len={LessonsNum} />
		</div>
	);
}

function CourseProgressBar({ course, len }: { course: courseType; len: number }) {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		async function getProgressBarProgress(course: courseType) {
			setProgress(await getProgress(course, len));
		}

		getProgressBarProgress(course);
	}, [course]);

	return (
		<ProgressBar>
			<span>progresso</span>
			<span>{progress.toFixed(0)}%</span>
			<ProgressBarComp progress={progress} />
		</ProgressBar>
	);
}
export async function getProgress(course: courseType, LessonsNum: number) {
	const session = await getSession();
	const courseName = getCourseName(course.nome);

	const last = session?.user?.courses?.find((c: any) => c.courseName === courseName)?.lastLessonMade ?? 0;
	
	return computeProgress(last, LessonsNum||1);
}

function ProgressBar({ children }: { children: React.ReactNode }) {
	return <div className="progress-barDiv">{children}</div>;
}
