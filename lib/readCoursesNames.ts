import { courseType } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

export default async function getCourses(
	updateState: Dispatch<SetStateAction<courseType[]>>,
	updateStatus: Dispatch<SetStateAction<boolean>>
) {
	try {
		const data = await import(`@/data/courses.json`);
		updateState(data.default);
		updateStatus(true);
	} catch (error) {
		console.log(error);

		return [error];
	}
}
