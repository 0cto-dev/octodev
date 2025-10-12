import { lessonType } from "@/types/types";

export async function getLesson(course:string,id:string):Promise<lessonType>{
        const data = await import(`@/data/${course}/pratic/lessons.json`)
        const exerciseData = data.default.find((ex:lessonType)=>ex.id == id);
    return exerciseData
}
