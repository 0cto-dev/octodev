import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourses {
	courseName: string;
	lastLessonMade: number;
	progress: number;
}

export interface IUser extends Document {
	name: string;
	nickname?: string;
	email: string;
	image: string;
	courses: ICourses[];
	streak: number;
	lastLessonDate: string;
	role: 'Aluno' | 'Contratante';
	linkedin?: string;
	github?: string;
	bio?: string;
	empresa?: string;
	descricaoContratante?: string;
}

const LessonMadeSchema = new Schema<ICourses>({
	courseName: { type: String, required: true },
	lastLessonMade: { type: Number, required: true },
	progress: { type: Number, required: false },
});

const UserSchema: Schema<IUser> = new Schema(
	{
		name: { type: String, required: true },
		nickname: { type: String, default: '' },
		email: { type: String, required: true, unique: true },
		image: { type: String, required: false },
		courses: { type: [LessonMadeSchema], default: [] },
		streak: { type: Number, default: 0 },
		lastLessonDate: { type: String, default: '' },
		role: { type: String, enum: ['Aluno', 'Contratante'], default: 'Aluno' },
		linkedin: { type: String, default: '' },
		github: { type: String, default: '' },
		bio: { type: String, default: '' },
		empresa: { type: String, default: '' },
		descricaoContratante: { type: String, default: '' },
	},
	{ timestamps: true },
);

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
