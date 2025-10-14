import { lessonType } from "@/types/types"
import { FaArrowLeftLong } from "react-icons/fa6"
import { IoMdTime } from "react-icons/io"
import { GoHeartFill } from "react-icons/go";


export default function NavBar({ data, currentExercise, totalExercises, lessonProgress }: {
    data: lessonType,
    currentExercise: number,
    totalExercises: number,
    lessonProgress: number
}) {
    return (
        <nav>
            <div className="left">
                <button className="exit">
                    <FaArrowLeftLong size={20} />
                </button>
                <div className="description">
                    <h1>{data.titulo}</h1>
                    <p>{data.descricao}</p>
                </div>
            </div>
            <div className="right">

                <div className="lives">
                    <p>5</p>
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
            <div
                className="progress-bar"
                style={{
                    background: `
                        linear-gradient(
                            90deg,
                            var(--primary), 
                            color-mix(in srgb, var(--accent)70% ,var(--primary)) 
                        ),
                        var(--input)
                        `,
                    backgroundSize: `${lessonProgress}% 100%, 100% 100%`,
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>{/* create am gradient effect on progress bar */}
        </nav>
    )
}
