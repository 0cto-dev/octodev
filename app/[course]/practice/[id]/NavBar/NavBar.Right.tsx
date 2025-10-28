import { GoHeartFill } from "react-icons/go";
import { IoMdTime } from "react-icons/io";

export default function Right({currentExercise,totalExercises,lives}:{currentExercise:number,totalExercises:number,lives:number}) {
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
				<p>05:00</p>
			</div>
		</div>
	);
}
