import { courseType, lessonType } from '@/types/types';
import Course from './page.course';
import { SearchBar } from './page.searchBar';
import { useEffect, useState } from 'react';

type SectionType = {
	avaliableCourses: courseType[];
	courses: { course: string; data: lessonType[] }[];
};
export type filterType = 'Fácil' | 'Médio' | 'Difícil' | 'Disponível' | 'Não concluido' | '';
export type sortType = 'Ordem alfabética' | 'Dificuldade' | 'Progresso' | '';

export default function Section({ avaliableCourses, courses }: SectionType) {
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState<filterType>('');
	const [sort, setSort] = useState<sortType>('');
	const filterMap = {
		Difícil: (course: courseType) => course.dificuldade === 'difícil',
		Médio: (course: courseType) => course.dificuldade === 'intermediário',
		Fácil: (course: courseType) => course.dificuldade === 'fácil',
		Disponível: (course: courseType) => course.disponivel,
		'Não concluido': (course: courseType) => {
			const courseName = course.nome === 'Tenda' ? 'logica' : course.nome;

			const progress = +(localStorage.getItem(`${courseName.toLowerCase()}Progress`) || 0);
			const courseData = courses.find(courseI => courseI.course === course.nome)?.data || [];
			const completionPercentage = ((progress / courseData.length) * 100) | 0;
			return completionPercentage < 100;
		},
	};
	return (
		<section>
			<SearchBar setSearch={setSearch} search={search} setFilter={setFilter} setSort={setSort} />
			<div className="coursesContent">
				{avaliableCourses
					// Filtra de acordo com a pesquisa da SearchBar
					.filter(course => {
						if (!search) return true;
						return (
							course.descricao.toLowerCase().includes(search.toLowerCase()) ||
							course.nome.toLowerCase().includes(search.toLowerCase())
						);
					})
					.filter((course, i) => {
						if (!filter) return true;
						const filterCondition = filterMap[filter];
						return filterCondition ? filterCondition(course) : true;
					})
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
