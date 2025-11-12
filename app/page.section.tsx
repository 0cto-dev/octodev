import { courseType, lessonType } from '@/types/types';
import Course from './page.course';
import { IoSearch } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useState } from 'react';
import DropDown from '../components/dropDown/DropDown';

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
	const [activeDropDown, setActiveDropDown] = useState('');
	function handleDropDownClick(content:string){
		setActiveDropDown(content)
	}
	return (
		<div className="searchBarArea">
			<div className="searchBar">
				<input type="text" placeholder="Pesquisar por cursos..." id="searchBar" />
				<DropDown
					onClick={handleDropDownClick}
					id="filter"
					items={[
						{ name: 'Fácil', handler: () => {} },
						{ name: 'Médio', handler: () => {} },
						{ name: 'Difícil', handler: () => {} },
						{ name: 'Disponível', handler: () => {} },
						{ name: 'Não concluido', handler: () => {} },
					]}
					active={activeDropDown===''||activeDropDown==='Filtrar'}
				>
					Filtrar
				</DropDown>

				<button className="focus">
					<IoSearch size={25} />
				</button>
			</div>
			<DropDown
				onClick={handleDropDownClick}
				id="order"
				items={[
					{ name: 'Ordem alfabética', handler: () => {} },
					{ name: 'Dificuldade', handler: () => {} },
					{ name: 'Progresso', handler: () => {} },
				]}
				active={activeDropDown===''||activeDropDown==='Ordenar'}
			>
				Ordenar
			</DropDown>
		</div>
	);
}
