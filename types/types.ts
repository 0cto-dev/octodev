import { Dispatch, SetStateAction } from "react";

export type paramsType = {
	course: string;
	id: string;
};

export type lessonType = {// Type of lesson object
	id: string;
	titulo: string;
	descricao: string;
	exercicios: [];
};
export type Setters = { //Use in app/[course]/pratic/[id]/fetchData.ts
	setCourse: Dispatch<SetStateAction<string>>;
	setId: Dispatch<SetStateAction<string>>;
	setData: Dispatch<SetStateAction<lessonType>>;
};