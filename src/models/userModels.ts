import { Schema, Document, model } from "mongoose";
import post, { IPost } from "./postModels";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  posts: Array<IPost>;
}
const userSchema = new Schema<IUser>({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, requiered: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
  posts: { type: [post.schema] },
});

export default model<IUser>("User", userSchema);
