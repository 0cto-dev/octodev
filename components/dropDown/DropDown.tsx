import { AnimationEventHandler, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import './DropDown.css';
type DropDownType = {
	children: string;
	id: string;
	items: { name: string; handler: () => void }[];
	active: boolean;
	onClick?: (content: string) => void;
	updateState: Dispatch<SetStateAction<any>>;
	
};

export default function DropDown({ children, id, items, active, onClick,updateState }: DropDownType) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState(-1);
	const [close, setClose] = useState(false);

	useEffect(()=>{
		updateState(currentItem!==-1?items[currentItem].name:'') 
	},[currentItem])

	function handleClick(i: number = -1) {
		if(!active) return

		if (isOpen) {
			i >= 0 && items[i].handler();
			setCurrentItem(currentItem => (i === currentItem ? -1 : i));
			
			setClose(true);
		}
		if (!isOpen) setIsOpen(true);
		onClick && onClick(children);
	}
	
	function handleEndAnimation(e: React.AnimationEvent<HTMLElement>) {
		if (e.animationName === 'hide') {
			setIsOpen(false);
			setClose(false);
			onClick && onClick('');
		}
	}
	return (
		<>
			<button id={id} onClick={() => handleClick()}>
				{currentItem === -1 ? children : items[currentItem]?.name}
				<RiArrowDropDownLine size={25} />
			</button>

			{isOpen && (
				<ul className={`options ${close ? 'close' : ''}`} onAnimationEnd={handleEndAnimation}>
					{items.map((item, i) => {
						const selected = item.name === items[currentItem]?.name;
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
