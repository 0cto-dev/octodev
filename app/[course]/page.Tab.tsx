import { Dispatch, SetStateAction } from "react";
import { useReactFlow } from "@xyflow/react";

export default function Tab({
	nodesType,
	setNodesType,
}: TabType) {
	const { setViewport } = useReactFlow();

	function handleChangeToTeoric(nodesType: 'pratica' | 'teorica') {
		setViewport({ x: 0, y: 0, zoom: 1 },{interpolate:'smooth',duration:1000});
		setNodesType(nodesType);
	}
	return (
		<aside>
			<ul>
				<li className="buttons">
					<button
						className={nodesType === 'pratica' ? 'active' : ''}
						onClick={() => handleChangeToTeoric('pratica')}
					>
						Prática
					</button>
				</li>
				<li className="buttons">
					<button
						className={nodesType === 'teorica' ? 'active' : ''}
						onClick={() => handleChangeToTeoric('teorica')}
					>
						Teórica
					</button>
				</li>
			</ul>
		</aside>
	);
}
type TabType = {
	nodesType: 'pratica' | 'teorica';
	setNodesType: Dispatch<SetStateAction<'pratica'|'teorica'>>;
}