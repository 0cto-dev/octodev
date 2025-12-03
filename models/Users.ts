import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourses {
	courseName: string;
	lastLessonMade: number;
	progress: number;
}

export interface IUser extends Document {
	name: string;
	email: string;
	courses: ICourses[];
	streak: number;
	lastLessonDate: string;
}

const LessonMadeSchema = new Schema<ICourses>({
	courseName: { type: String, required: true },
	lastLessonMade: { type: Number, required: true },
	progress: { type: Number, required: false },
});

const UserSchema: Schema<IUser> = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		courses: { type: [LessonMadeSchema], default: [] },
		streak: { type: Number, default: 0 },
		lastLessonDate: { type: String, default: '' },
	},
	{ timestamps: true }
);

export default (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
