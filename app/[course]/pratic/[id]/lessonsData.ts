import { lessonType, paramsType, Setters } from '@/types/types';


async function getLesson(course: string, id: string): Promise<lessonType> {
	const data = await import(`@/data/${course}/pratic/lessons.json`);
	const exerciseData = data.default.find((ex: lessonType) => ex.id == id);
	return exerciseData;
}


export const fetchData = async (params: paramsType, { setCourse, setId, setData }: Setters) => {
	const courseValue = await params.course;
	setCourse(courseValue);
	const idValue = await params.id;
	setId(idValue);

	const dataValue = await getLesson(courseValue, idValue);
	setData(dataValue);

};
