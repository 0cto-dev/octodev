import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourses {
  courseName: string;
  lastLessonMade: string;
  progress:number;
}

export interface IUser extends Document {
  nome: string;
  email: string;
  courses: ICourses[];
}

const LessonMadeSchema = new Schema<ICourses>({
  courseName: { type: String, required: true },
  lastLessonMade: { type: String, required: true },
  progress: { type: Number, required: true },
});

const UserSchema: Schema<IUser> = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    courses: { type: [LessonMadeSchema], default: [] },
  },
  { timestamps: true }
);

export default (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
