import useIsVisitor from "@/lib/isVisitor";

export default function LeaderBoard() {
	const isVisitor = useIsVisitor();

	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (isVisitor) return;
		if (target.closest('#leaderboard')) window.location.href = '/placar';

	}
	return (
		// Quando pagina de leaderboard estiver pronta, remover a classe disabled
		<li id="leaderboard" onClick={handleClick} className={`disabled`+isVisitor ? 'disabled' : ''}>
			<p>Placar de Lideres</p>
		</li>
	);
}
