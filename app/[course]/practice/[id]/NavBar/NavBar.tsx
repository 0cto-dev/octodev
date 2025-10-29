import { exerciseType, lessonType } from '@/types/types';
import Left from './NavBar.Left';
import Right from './NavBar.Right';
import ProgressBar from './NavBar.progress';

export default function NavBar({
	data,
	goingToNextExercise,
	exercise,
	totalExercises,
	lives,
	seconds
}: {
	data: lessonType;
	goingToNextExercise:boolean
	exercise: exerciseType;
	totalExercises: number;
	lives:number,
	seconds:number
}) {
	return (
		<nav>
			<Left data={data} />
			<Right currentExercise={exercise.currentExerciseNum} totalExercises={totalExercises} lives={lives} seconds={seconds}/>
            <ProgressBar exercise={exercise} totalExercises={totalExercises} goingToNextExercise={goingToNextExercise}/>
		</nav>
	);
}
