import { courseType, CourseWithProgress, filterType, SectionType, sortType } from '@/types/types';
import Course, { getProgress } from './page.course';
import { SearchBar } from './page.searchBar';
import { useEffect, useState } from 'react';

export default function Section({ avaliableCourses, courses }: SectionType) {
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState<filterType>('');
	const [sort, setSort] = useState<sortType>('');
	const [coursesWithProgress, setCoursesWithProgress] = useState<CourseWithProgress[]>([]);
	const [sortedCourses, setSortedCourses] = useState<courseType[]>([]);

	const filterMap = {
		Difícil: (item: CourseWithProgress) => item.course.dificuldade === 'difícil',
		Médio: (item: CourseWithProgress) => item.course.dificuldade === 'intermediário',
		Fácil: (item: CourseWithProgress) => item.course.dificuldade === 'fácil',
		Disponível: (item: CourseWithProgress) => item.course.disponivel,
		'Não concluido': (item: CourseWithProgress) => item.progress < 100,
	};

	const sortMap = {
		'Ordem alfabética': (a: CourseWithProgress, b: CourseWithProgress) =>
			a.course.nome.localeCompare(b.course.nome),
		Dificuldade: (a: CourseWithProgress, b: CourseWithProgress) => {
			const dificulty: Record<string, number> = { fácil: 0, intermediário: 1, difícil: 2 };
			return dificulty[a.course.dificuldade] - dificulty[b.course.dificuldade];
		},
		Progresso: (a: CourseWithProgress, b: CourseWithProgress) => {
			return b.progress - a.progress;
		},
	};

	useEffect(() => {
		const preCalculateProgress = async () => {
			const calculatedCourses = await Promise.all(
				avaliableCourses.map(async course => {
					const courseDataLength = courses.find(c => c.course === course.nome)?.data.length || 0;
					const progress = await getProgress(course, courseDataLength);
					return { course, progress };
				})
			);
			setCoursesWithProgress(calculatedCourses);
		};

		preCalculateProgress();
	}, [avaliableCourses, courses]);

	useEffect(() => {
		if (coursesWithProgress.length === 0 && avaliableCourses.length > 0) return;

		let processingCourses = [...coursesWithProgress];

		processingCourses = processingCourses.filter(item => {
			if (!search) return true;
			return (
				item.course.descricao.toLowerCase().includes(search.toLowerCase()) ||
				item.course.nome.toLowerCase().includes(search.toLowerCase())
			);
		});

		if (filter) {
			const filterCondition = filterMap[filter];
			processingCourses = processingCourses.filter(filterCondition);
		}

		if (sort === 'Progresso') {
			processingCourses.sort((a, b) => {
				const progressDiff = sortMap.Progresso(a, b);
				if (progressDiff !== 0) return progressDiff;

				if (a.course.disponivel && !b.course.disponivel) return -1;
				if (!a.course.disponivel && b.course.disponivel) return 1;

				return sortMap['Ordem alfabética'](a, b);
			});
		} else if (sort === 'Dificuldade') {
			processingCourses.sort((a, b) => {
				const diff = sortMap.Dificuldade(a, b);
				if (diff !== 0) return diff;

				if (a.course.disponivel && !b.course.disponivel) return -1;
				if (!a.course.disponivel && b.course.disponivel) return 1;

				return sortMap['Ordem alfabética'](a, b);
			});
		} else {
			processingCourses.sort((a, b) => {
				if (a.course.disponivel && !b.course.disponivel) return -1;
				if (!a.course.disponivel && b.course.disponivel) return 1;

				return sortMap['Ordem alfabética'](a, b);
			});
		}

		setSortedCourses(processingCourses.map(({ course }) => course));
	}, [coursesWithProgress, search, filter, sort, avaliableCourses]);

	return (
		<section>
			<SearchBar setSearch={setSearch} search={search} setFilter={setFilter} setSort={setSort} />
			<div className="coursesContent">
				{sortedCourses.map((course, i) => {
					const lessons = courses.find(c => c.course === course.nome);
					return <Course key={i} course={course} LessonsNum={lessons?.data.length || 0} />;
				})}
			</div>
		</section>
	);
}
