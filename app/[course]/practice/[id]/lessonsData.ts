import { lessonType, fakeData, paramsType, Setters } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

async function getLesson(course: string, id: string): Promise<lessonType> {
	try {
		const data = await import(`@/data/${course}/practice/lessons.json`);
		const exerciseData = data.default.find((ex: lessonType) => ex.id == id);
		return exerciseData;
	} catch (error) {
		console.log(error)
		console.log('Voce esta numa versão de teste, provavelmente clonou o repositorio do github, certo? experimente criar seus proprios exercicios, criando uma pasta chamada "data" na raiz do projeto e faça o seguinte aninhamento: date>practical>[nome do curso que deseja criar os exercicios]/lessons.json, caso precise de uma base, aqui esta:')
		console.log(`COPIE E COLE NO "lessons.json" QUE VOCE CRIOU: \n${JSON.stringify(fakeData)}`)
		return fakeData[1];
	}
}

export const fetchData = async (
	params: paramsType,
	setLesson: Setters,
	setLoaded: Dispatch<SetStateAction<boolean>>
) => {
	const courseValue = await params.course;
	const idValue = await params.id;

	const dataValue = await getLesson(courseValue, idValue);
	setLesson({ course: courseValue, id: idValue, data: dataValue });
	setLoaded(true);
};
