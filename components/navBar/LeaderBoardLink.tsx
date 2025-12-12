import useIsVisitor from "@/lib/isVisitor";

export default function LeaderBoard() {
	const isVisitor = useIsVisitor();

	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (isVisitor) return;
		if (target.closest('#leaderboard')) window.location.href = '/placar';

	}
	return (
		<li id="leaderboard" onClick={handleClick} className={isVisitor ? 'disabled' : ''}>
			<p>Placar de Lideres</p>
		</li>
	);
}
