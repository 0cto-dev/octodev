import { exerciseType, lessonType } from '@/types/types';
import Left from './NavBar.Left';
import Right from './NavBar.Right';
import ProgressBar from './NavBar.progress';

export default function NavBar({
	data,
	goingToNextExercise,
	exercise,
	totalExercises,
	lives
}: {
	data: lessonType;
	goingToNextExercise:boolean
	exercise: exerciseType;
	totalExercises: number;
	lives:number
}) {
	return (
		<nav>
			<Left data={data} />
			<Right currentExercise={exercise.currentExercise} totalExercises={totalExercises} lives={lives}/>
            <ProgressBar exercise={exercise} totalExercises={totalExercises} goingToNextExercise={goingToNextExercise}/>
			{/* create am gradient effect on progress bar */}
		</nav>
	);
}
