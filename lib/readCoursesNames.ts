import { Dispatch, SetStateAction } from 'react';

export default async function getCourses(
	updateState: Dispatch<SetStateAction<string[]>>,
	updateStatus: Dispatch<SetStateAction<boolean>>
) {
	try {
		const data = await import(`@/data/courses.json`);
		updateState(data.default[0]);
		updateStatus(true);
	} catch (error) {
		console.log(error);

		return [error];
	}
}
