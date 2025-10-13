import { lessonType, paramsType, Setters } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';


async function getLesson(course: string, id: string): Promise<lessonType> {
	const data = await import(`@/data/${course}/pratic/lessons.json`);
	const exerciseData = data.default.find((ex: lessonType) => ex.id == id);
	return exerciseData;
}


export const fetchData = async (params: paramsType, setLesson: Setters, setLoaded: Dispatch<SetStateAction<boolean>>) => {
	const courseValue = await params.course;
	const idValue = await params.id;
	
	const dataValue = await getLesson(courseValue, idValue);
	setLesson({course: courseValue, id: idValue, data: dataValue})
	setLoaded(true)
};
