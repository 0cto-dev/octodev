import { courseType, lessonType } from '@/types/types';
import Course from './page.course';

export default function Section({
	avaliableCourses,
	courses,
}: {
	avaliableCourses: courseType[];
	courses: { course: string; data: lessonType[] }[];
}) {
	return (
		<section>
			{avaliableCourses
				.toSorted((a, b) => {
					if (a.disponivel && !b.disponivel) return -1;
					if (!a.disponivel && b.disponivel) return 1;

					return a.nome.localeCompare(b.nome);
				})
				.map((course, i) => {
					return (
						<Course
							key={i}
							course={course}
							LessonsNum={
								courses.toSorted((a, b) => a.course.localeCompare(b.course))[i]?.data.length || 0
							}
						/>
					);
				})}
		</section>
	);
}
