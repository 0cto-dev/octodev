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
	const [sortedCourses, setSortedCourses] = useState<courseType[]>([]); 

	const filterMap = {
		Difícil: (course: courseType) => course.dificuldade === 'difícil',
		Médio: (course: courseType) => course.dificuldade === 'intermediário',
		Fácil: (course: courseType) => course.dificuldade === 'fácil',
		Disponível: (course: courseType) => course.disponivel,
		'Não concluido': async (course: courseType) => {
			const courseDataLength = courses.find(courseI => courseI.course === course.nome)?.data.length || 0;
			return await getProgress(course, courseDataLength) < 100;
		},
	};

	
	const sortMap = {
		'Ordem alfabética': (a: courseType, b: courseType) => a.nome.localeCompare(b.nome),
		Dificuldade: (a: courseType, b: courseType) => {
			const dificulty: Record<string, number> = { fácil: 0, intermediário: 1, difícil: 2 };
			return dificulty[a.dificuldade] - dificulty[b.dificuldade];
		},
		Progresso: async (a: courseType, b: courseType) => {
			const aCourseDataLength = courses.find(courseI => courseI.course === a.nome)?.data.length || 0;
			const bCourseDataLength = courses.find(courseI => courseI.course === b.nome)?.data.length || 0;

			
			const aProgress = await getProgress(a, aCourseDataLength);
			const bProgress = await getProgress(b, bCourseDataLength);

			return bProgress - aProgress; 
		},
	};

	useEffect(() => {
		const getCoursesWithProgress = async () => {
			
			let filteredCourses = avaliableCourses
				.filter(course => {
					if (!search) return true;
					return (
						course.descricao.toLowerCase().includes(search.toLowerCase()) ||
						course.nome.toLowerCase().includes(search.toLowerCase())
					);
				})
				.filter(course => {
					if (!filter) return true;
					const filterCondition = filterMap[filter];
					return filterCondition(course);
				});

			
			const coursesWithProgress = await Promise.all(
				filteredCourses.map(async (course) => {
					const courseDataLength = courses.find(c => c.course === course.nome)?.data.length || 0;
					const progress = await getProgress(course, courseDataLength);
					return { course, progress }; 
				})
			);

			
			if (sort === 'Progresso') {
				
				coursesWithProgress.sort((a, b) => {
					const progressDiff = b.progress - a.progress;
					if (progressDiff !== 0) return progressDiff;

					if (a.course.disponivel && !b.course.disponivel) return -1; 
					if (!a.course.disponivel && b.course.disponivel) return 1; 

					return sortMap['Ordem alfabética'](a.course, b.course);
				});
			}
			if (sort === 'Dificuldade') {
				
				coursesWithProgress.sort((a, b) => {
					const diff = sortMap['Dificuldade'](a.course, b.course);
					if (diff !== 0) return diff;
					if (a.course.disponivel && !b.course.disponivel) return -1; 
					if (!a.course.disponivel && b.course.disponivel) return 1; 
					return sortMap['Dificuldade'](a.course, b.course);
				});
			}
			if (sort === 'Ordem alfabética'||sort ==='') {
				
				coursesWithProgress.sort((a, b) => {
					
					if (a.course.disponivel && !b.course.disponivel) return -1; 
					if (!a.course.disponivel && b.course.disponivel) return 1; 

					
					return sortMap['Ordem alfabética'](a.course, b.course);
				});
			}

			
			setSortedCourses(coursesWithProgress.map(({ course }) => course)); 
		};

		getCoursesWithProgress();
	}, [avaliableCourses, courses, search, filter, sort]); 

	return (
		<section>
			<SearchBar setSearch={setSearch} search={search} setFilter={setFilter} setSort={setSort} />
			<div className="coursesContent">
				{sortedCourses.map((course, i) => {
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
