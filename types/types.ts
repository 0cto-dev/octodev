import { Dispatch, SetStateAction } from 'react';

export type paramsType = {
	course: string;
	id: string;
};
export type alternativasType = {
	id:number
valor:string,
correto:boolean

}
export type exercisesType = {
	id: string;
	pergunta: string;
	alternativas: alternativasType[]; 
};
export type lessonType = {
	// Type of lesson object
	id: string;
	titulo: string;
	descricao: string;
	exercicios: exercisesType[];
};
export type Setters = Dispatch<SetStateAction<{course: string; id: string; data: lessonType;}>>

export const errorFetch: lessonType = {
    id: ' ',
    titulo: ' ',
    descricao: '  ',
    exercicios: [
        {
            id: 'carregando',
            pergunta: 'carregando',
            alternativas: [
                {
                    id:0,
                    valor: "carregando",
                    correto: false
                }
            ],
        }
    ],
};
