import fs from 'fs';
import path from 'path';

export default function generateCourseIndex() {
  const coursesDir = path.join(process.cwd(), 'data'); // Diretório onde os cursos estão armazenados
  const courseFolders = fs.readdirSync(coursesDir).filter(course=>course[0]!=='.'&&fs.statSync(path.join(coursesDir, course)).isDirectory())
  
  fs.writeFileSync(path.join(process.cwd(), 'data/courses.json'), JSON.stringify([courseFolders], null, 2));

}

module.exports = generateCourseIndex;
