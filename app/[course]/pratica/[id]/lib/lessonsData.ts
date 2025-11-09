import { lessonType, fakeData, paramsType, Setters } from '@/types/types';
import { Dispatch, SetStateAction } from 'react';

export async function getLesson(course: string, id: string | undefined): Promise<lessonType | lessonType[]> {
	try {
		const data = await import(`@/data/${course}/pratica/lessons.json`);
		if (!id) return data.default as lessonType[];
		const exerciseData = data.default.find((ex: lessonType) => ex.id == id);
		return exerciseData as lessonType;
	} catch (error) {
		console.log(error);
		console.log(
			'Voce esta numa versão de teste, provavelmente clonou o repositorio do github, certo? experimente criar seus proprios exercicios, criando uma pasta chamada "data" na raiz do projeto e faça o seguinte aninhamento: date>practice>[nome do curso que deseja criar os exercicios]/lessons.json, caso precise de uma base, aqui está:'
		);
		console.log(`COPIE E COLE NO "lessons.json" QUE VOCE CRIOU: \n${JSON.stringify(fakeData)}`);
		return fakeData[1] as lessonType;
	}
}

export const fetchData = async (
	params: Promise<paramsType>,
	setLesson: any,
	setLoaded: Dispatch<SetStateAction<boolean>>
) => {
	const paramsObj = await params;
	const courseValue = await paramsObj.course;
	const idValue = await paramsObj?.id;

	const dataValue = await getLesson(courseValue, idValue);
	if (idValue === undefined) {
		setLesson({ course: courseValue, id: '', data: dataValue });
		setLoaded(true);
		return;
	}

	setLesson({ course: courseValue, id: idValue, data: dataValue });
	setLoaded(true);
};
