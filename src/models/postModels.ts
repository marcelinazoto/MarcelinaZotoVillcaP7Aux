import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IPost extends Document {
  title: string;
  url: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});
export default model<IPost>("Post", postSchema);
