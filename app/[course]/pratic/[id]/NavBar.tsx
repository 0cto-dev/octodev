import { lessonType } from "@/types/types"
import { FaArrowLeftLong } from "react-icons/fa6"
import { IoMdTime } from "react-icons/io"

export default function NavBar({ data, currentLesson, totalLessons, lessonProgress }: {
    data: lessonType,
    currentLesson: number,
    totalLessons: number,
    lessonProgress: number
}) {
    return (
        <nav>
            <div className="left">
                <div className="exit">
                    <FaArrowLeftLong size={20} />
                </div>
                <div className="description">
                    <h1>{data.titulo}</h1>
                    <p>{data.descricao}</p>
                </div>
            </div>
            <div className="right">
                <div className="progress">
                    <p>
                        <span className="purple">Questão {currentLesson}</span> de {totalLessons}
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
                    background: `linear-gradient(90deg, var(--primary) ${lessonProgress}%, var(--input) ${lessonProgress}%)`,
                }}
            ></div>
        </nav>
    )
}
