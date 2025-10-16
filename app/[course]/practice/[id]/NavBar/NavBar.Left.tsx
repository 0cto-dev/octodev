import { lessonType } from "@/types/types";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Left({ data }: { data: lessonType }) {
    return (
        <div className="left">
            <button className="exit">
                <FaArrowLeftLong size={20} />
            </button>
            <div className="description">
                <h1>{data.titulo}</h1>
                <p>{data.descricao}</p>
            </div>
        </div>
    );
}