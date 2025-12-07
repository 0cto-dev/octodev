export default function LeaderBoard() {
	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (target.closest('#leaderboard')) window.location.href = '/placar';

	}
	return (
		<li id="leaderboard" onClick={handleClick}>
			<p>Placar de Lideres</p>
		</li>
	);
}
