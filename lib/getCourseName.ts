export default function getCourseName(courseName: string) {
	let finalName;
	if (courseName.toLowerCase() === 'tenda') finalName = 'logica';
	else finalName = courseName.toLowerCase();
	return finalName;
}
