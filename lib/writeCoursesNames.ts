import fs from 'fs';
import path from 'path';

export default function generateCourseIndex() {
	const coursesDir = path.join(process.cwd(), 'data'); // Diretório onde os cursos estão armazenados
	const courseFolders = fs
		.readdirSync(coursesDir)
		.filter(course => course[0] !== '.' && fs.statSync(path.join(coursesDir, course)).isDirectory());
	const courses = courseFolders.map(course => {
		const data = fs.readFileSync(`data/${course}/about.json`, 'utf8');

		return data;
	});
	fs.writeFileSync(
		path.join(process.cwd(), 'data/courses.json'),
		JSON.stringify(JSON.parse(`[${courses.join(',')}]`), null, 2)
	);
}

module.exports = generateCourseIndex;
