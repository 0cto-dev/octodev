import DropDown from '@/components/dropDown/DropDown';
import { Dispatch, SetStateAction, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { filterType, sortType } from './page.section';

type SearchBarType = {
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
	setFilter: Dispatch<SetStateAction<filterType>>;
	setSort: Dispatch<SetStateAction<sortType>>;
};

export function SearchBar({ search, setSearch, setFilter, setSort }: SearchBarType) {
	const [activeDropDown, setActiveDropDown] = useState('');
	function handleDropDownClick(content: string) {
		setActiveDropDown(content);
	}
	return (
		<div className={`searchBarArea ${activeDropDown ? 'active' : ''}`}>
			<div className="searchBar">
				<input
					type="text"
					placeholder="Pesquisar por cursos..."
					id="searchBar"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
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
					updateState={setFilter}
					active={activeDropDown === '' || activeDropDown === 'Filtrar'}
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
				updateState={setSort}
				active={activeDropDown === '' || activeDropDown === 'Ordenar'}
			>
				Ordenar
			</DropDown>
		</div>
	);
}
