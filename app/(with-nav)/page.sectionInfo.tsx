import { CourseProps } from './page.course';

type CourseInfoType = {
	course: CourseProps['course'];
	LessonsNum: CourseProps['LessonsNum'];
}
export default function CourseInfo({ course, LessonsNum }: CourseInfoType) {
	return (
		<div className="texts">
			<div className="header">
				<div className="tags">
					<span
						className={
							`${course.dificuldade === 'fácil' ? 'easy' : ''}` +
							`${course.dificuldade === 'intermediário' ? 'medium' : ''}` +
							`${course.dificuldade === 'difícil' ? 'hard' : ''}`
						}
					>
						{course.dificuldade}
					</span>
				</div>
				<h1>{course.nome}</h1>
			<div className="info">
				<span>{LessonsNum || '???'} Lições</span>
			</div>
			</div>
			<p>{course.descricao}</p>
		</div>
	);
}
