import { LessonSectionType } from "@/types/types";
import Option from "./section.option";

export default function Options({ setExercise, exercise, shuffledAlternatives }: Omit<LessonSectionType, 'lesson'>) {
	return (
		<div className="options">
			{shuffledAlternatives.map(option => {
				return (
					<Option
						key={option.id}
						option={option}
						setExercise={setExercise}
						exercise={exercise}
					/>
				);
			})}
		</div>
	);
}
