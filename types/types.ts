import { Dispatch, SetStateAction } from 'react';

export type paramsType = {
	course: string;
	id: string;
};
export type alternativasType = {
	id: number;
	valor: string;
	correto: boolean;
};
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
export type Setters = Dispatch<SetStateAction<{ course: string; id: string; data: lessonType }>>;

export type LessonSectionType = {
	lesson: {
		course: string;
		id: string;
		data: lessonType;
	};
    exerciseStatus:string
	setExercise: React.Dispatch<
		SetStateAction<{
			selectedAlternative: alternativasType;
			currentExercise: number;
			completedExercises: number;
			exerciseStatus: string;
		}>
	>;
	exercise: {
		selectedAlternative: alternativasType;
		currentExercise: number;
		completedExercises: number;
		exerciseStatus: string;
	};
	shuffledAlternatives: alternativasType[];
};

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
					id: 0,
					valor: 'carregando',
					correto: false,
				},
			],
		},
	],
};

export const fakeData = [
	{
		id: 'lesson1',
		titulo: 'Este vai ser o título da sua lição',
		descricao: 'Aqui é a descrição da lição',
		exercicios: [
			{
				id: 'ex001',
				pergunta: 'Coloque a pergunta que quiser aqui',
				alternativas: [
					{ id: 1, valor: 'alternativa 1', correto: false },
					{ id: 2, valor: 'alternativa 2', correto: true },
					{ id: 3, valor: 'alternativa 3', correto: false },
					{ id: 4, valor: 'alternativa 4', correto: false },
				],
			},
		],
	},
	{
		id: 'lesson1',
		titulo: 'Olá Tenda',
		descricao: 'Introdução à linguagem tenda',
		exercicios: [
			{
				id: 'ex001',
				pergunta: 'Qual é a forma correta de escrever "Hello World" utilizando a Linguagem Tenda?',
				alternativas: [
					{ id: 1, valor: 'mostrar("Hello World")', correto: false },
					{ id: 2, valor: 'exiba("Hello World")', correto: true },
					{ id: 3, valor: 'escreva("Hello World")', correto: false },
					{ id: 4, valor: 'print("Hello World")', correto: false },
				],
			},
		],
	},
];
