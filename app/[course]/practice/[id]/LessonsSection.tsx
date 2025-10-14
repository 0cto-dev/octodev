import { LessonSectionType } from '@/types/types';

export default function LessonSection({
	lesson,
	exerciseStatus,
	setExercise,
	exercise,
	shuffledAlternatives,
}: LessonSectionType) {
	return (
		<section>
			<h1>{lesson.data.exercicios[exercise.currentExercise - 1].pergunta}</h1>
			<div className="options">
				{shuffledAlternatives.map(option => {
					const buttonIsWrong = exerciseStatus === 'correct' && !option.correto;
					return (
						<div key={option.id} className={buttonIsWrong ? 'wrong' : ''}>
							<button
								key={option.id}
								onClick={() =>
									exerciseStatus != 'correct' &&
									setExercise(prev => ({ ...prev, selectedAlternative: option }))
								}
								className={`${option.id === exercise.selectedAlternative.id ? 'selected' : ''} ${
									buttonIsWrong ? 'wrong' : ''
								}`}
                                style={{
                                    transform:`${buttonIsWrong?`rotate(${Math.random()*500}deg)`:`${
                                        exerciseStatus === 'correct'&&!buttonIsWrong?'translate(-50%,-150%)':'initial'
                                    }`}`,
                                    position:`${exerciseStatus === 'correct'&&!buttonIsWrong?'absolute':'static'}`,
                                    top:`${exerciseStatus === 'correct'&&!buttonIsWrong?'50%':'initial'}`,
                                    left:`${exerciseStatus === 'correct'&&!buttonIsWrong?'50%':'initial'}`,
                                }}
							>
								{option.valor}
							</button>
						</div>
					);
				})}
			</div>
		</section>
	);
}
