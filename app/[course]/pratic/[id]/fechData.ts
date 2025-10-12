import { getLesson } from '@/lib/getLesson';
import { paramsType, Setters } from '@/types/types';

export const fetchData = async (params: paramsType,{setCourse, setId,setData}:Setters) => {
	const courseValue = await params.course;
	setCourse(courseValue);
	const idValue = await params.id;
	setId(idValue);

	const dataValue = await getLesson(courseValue, idValue);
	setData(dataValue);
};
