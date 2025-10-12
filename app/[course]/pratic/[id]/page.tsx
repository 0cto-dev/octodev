import Error from '@/app/components/Error';
import { IoMdTime } from "react-icons/io";

import getLesson from '@/lib/getLesson';
import './page.css'

type HomeProps = {
    params: {
        course: string,
        id: string
    }
}

export default async function Home({ params }: HomeProps) {
    const { course, id } = await params;
    let error = false;
    const totalLessons = 10
    const actualLesson = 6
    const completedLessons = actualLesson-1
    const lessonProgress = (completedLessons/totalLessons)*100
    
    if (!course || !id) error = true

    const data = await getLesson(course, id);

    if (!data?.id) error = true
    if (error) return (<Error />)

    return (
        <main>
            <nav>
                <div className="left">
                    <div className="description">
                        <h1>{data.titulo}</h1>
                        <p>{data.descricao}</p>
                    </div>
                </div>
                <div className="right">
                    <div className="timer">
                        <IoMdTime size={20} />
                        <p>05:00</p>
                    </div>

                </div>
                    <div className="progress-bar" style={{background: `linear-gradient(90deg, var(--primary) ${lessonProgress}%, var(--input) ${lessonProgress}%)`}}>
                    </div>
            </nav>
        </main>
    )
}