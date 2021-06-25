import { Schema, model, Document } from "mongoose";

export interface IImage extends Document {
  path: string;
  relativepath: string;
  filename: string;
  timestamp: Date;
}

const imgSchema = new Schema<IImage>({
  path: String,
  relativepath: String,
  filename: String,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export default model<IImage>("image", imgSchema);
