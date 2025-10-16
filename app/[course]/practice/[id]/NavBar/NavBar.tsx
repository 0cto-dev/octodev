import { exerciseType, lessonType } from '@/types/types';
import Left from './NavBar.Left';
import Right from './NavBar.Right';
import ProgressBar from './NavBar.progress';

export default function NavBar({
	data,
	goingToNextExercise,
	exercise,
	totalExercises,
}: {
	data: lessonType;
	goingToNextExercise:boolean
	exercise: exerciseType;
	totalExercises: number;
}) {
	return (
		<nav>
			<Left data={data} />
			<Right currentExercise={exercise.currentExercise} totalExercises={totalExercises}/>
            <ProgressBar exercise={exercise} totalExercises={totalExercises} goingToNextExercise={goingToNextExercise}/>
			{/* create am gradient effect on progress bar */}
		</nav>
	);
}
