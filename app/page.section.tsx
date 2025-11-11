import { courseType, lessonType } from '@/types/types';
import Course from './page.course';
import { IoSearch } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';

export default function Section({
	avaliableCourses,
	courses,
}: {
	avaliableCourses: courseType[];
	courses: { course: string; data: lessonType[] }[];
}) {
	return (
		<section>
			<SearchBar />
			<div className="coursesContent">
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
			</div>
		</section>
	);
}

export function SearchBar() {
	return (
		<div className="searchBarArea">
			<div className="searchBar">
				<input type="text" placeholder="Pesquisar por cursos..." id="searchBar" />
				<button id="filter">
					Filtrar
					<RiArrowDropDownLine size={25} />
				</button>
				<button className="focus">
					<IoSearch size={25} />
				</button>
			</div>
			<button id="order">
				Ordenar
				<RiArrowDropDownLine size={25} />
			</button>
		</div>
	);
}
