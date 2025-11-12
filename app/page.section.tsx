import { courseType, lessonType } from '@/types/types';
import Course from './page.course';
import { IoSearch } from 'react-icons/io5';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useState } from 'react';

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
				<DropDownMenu
					id="filter"
					items={[
						{ name: 'Fácil', handler: () => {} },
						{ name: 'Médio', handler: () => {} },
						{ name: 'Difícil', handler: () => {} },
						{ name: 'Disponível', handler: () => {} },
						{ name: 'Não concluido', handler: () => {} },
					]}
				>
					Filtrar
				</DropDownMenu>

				<button className="focus">
					<IoSearch size={25} />
				</button>
			</div>
			<DropDownMenu
				id="order"
				items={[
					{ name: 'Ordem alfabética', handler: () => {} },
					{ name: 'Dificuldade', handler: () => {} },
					{ name: 'Progresso', handler: () => {} },
				]}
			>
				Ordenar
			</DropDownMenu>
		</div>
	);
}
type DropDownMenuType = { children: React.ReactNode; id: string; items: { name: string; handler: () => void }[] };

function DropDownMenu({ children, id, items }: DropDownMenuType) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState(-1);

	function handleClick(i: number = -1) {
		if (isOpen) {
			i >= 0 && items[i].handler();
			setCurrentItem(currentItem => (i === currentItem ? -1 : i));
		}
		
		setIsOpen(isOpen => !isOpen);
	}
	return (
		<>
			<button id={id} onClick={() => handleClick()}>
				{currentItem === -1 ? children : items[currentItem]?.name}
				<RiArrowDropDownLine size={25} />
			</button>

			{isOpen && (
				<ul className='options'>
					{items.map((item, i) => {
						const selected = item.name === items[currentItem]?.name;
						console.log(item)
						return (
							<li key={i} onClick={() => handleClick(i)}>
								<button className={`option ${selected ? 'selected' : ''}`}>{item.name}</button>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
}
