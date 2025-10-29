import { GoHeartFill } from 'react-icons/go';
import { IoMdTime } from 'react-icons/io';

export default function Right({
	currentExercise,
	totalExercises,
	lives,
	seconds,
}: {
	currentExercise: number;
	totalExercises: number;
	lives: number;
	seconds: number;
}) {
	const timerMinutes = (Math.floor(seconds/60))<10?`0${Math.floor(seconds/60)}`:Math.floor(seconds/60)
	const timerSeconds = (seconds%60)<10?`0${seconds%60}`:seconds%60
	return (
		<div className="right">
			<div className="lives">
				<p>{lives}</p>
				<GoHeartFill color="var(--red)" size={20} />
			</div>
			<div className="progress">
				<p>
					<span className="purple">Questão {currentExercise}</span> de {totalExercises}
				</p>
			</div>

			<div className="timer">
				<IoMdTime size={20} />
				<p>{`${timerMinutes}:${timerSeconds}`}</p>
			</div>
		</div>
	);
}
