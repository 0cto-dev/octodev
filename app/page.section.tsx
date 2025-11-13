import { courseType, lessonType } from '@/types/types';
import Course, { getProgress } from './page.course';
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
			const courseDataLength = courses.find(courseI => courseI.course === course.nome)?.data.length || 0;

			return getProgress(course, courseDataLength) < 100;
		},
	};
	const sortMap = {
		'Ordem alfabética': (a: courseType, b: courseType) => a.nome.localeCompare(b.nome),
		Progresso: (a: courseType, b: courseType) => {
			const aCourseDataLength = courses.find(courseI => courseI.course === a.nome)?.data.length || 0;
			const bCourseDataLength = courses.find(courseI => courseI.course === b.nome)?.data.length || 0;
			console.log(getProgress(b,bCourseDataLength),getProgress(a,aCourseDataLength))
			const compareProgress = getProgress(b,bCourseDataLength) - getProgress(a,aCourseDataLength) 
			return compareProgress
		},
		Dificuldade: (a: courseType, b: courseType) => {
			const dificulty: Record<string, number> = { fácil: 0, intermediário: 1, difícil: 2 };

			return (dificulty[a.dificuldade] - dificulty[b.dificuldade]);
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
						return filterCondition(course);
					})
					.toSorted((a, b) => {
						if (a.disponivel && !b.disponivel) return -1;
						if (!a.disponivel && b.disponivel) return 1;
						if (!sort) return a.nome.localeCompare(b.nome);
						const sortCompare = sortMap[sort];
						return sortCompare(a, b) || a.nome.localeCompare(b.nome);
					})
					.map((course, i) => {
						return (
							<Course
								key={i}
								course={course}
								LessonsNum={
									courses[courses.findIndex((c) => c.course === course.nome)]?.data.length
								}
							/>
						);
					})}
			</div>
		</section>
	);
}
