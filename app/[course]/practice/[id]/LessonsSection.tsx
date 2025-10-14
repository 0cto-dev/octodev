import { LessonSectionType } from "@/types/types"

export default function LessonSection({ lesson,exerciseStatus, setExercise, exercise, shuffledAlternatives }: LessonSectionType) {
    return (
        <section>
            <h1>{lesson.data.exercicios[exercise.currentExercise - 1].pergunta}</h1>
            <div className="options">
                {shuffledAlternatives.map((option) => {
                    return (
                        <button
                            key={option.id}
                            onClick={() => exerciseStatus!="correct"&&setExercise(prev => ({ ...prev, selectedAlternative: option }))}
                            className={option.id === exercise.selectedAlternative.id ? "selected" : ''}
                        >
                            {option.valor}
                        </button>)
                })}
            </div>
        </section>
    )
}