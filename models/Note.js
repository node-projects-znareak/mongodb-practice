import { Schema, model } from "mongoose";
import { userSchema } from "./User";

const Note = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  description: {
    type: String,
    required: true,
    maxLength: 500,
  },
  // this is a sub-document (schema structure)
  // [!] this is different to populate method
  author: userSchema,
  tags: [String],
});

Note.pre("save", function (next) {
  const title = !this.title.trim();
  const desc = !this.description.trim();
  if (title || desc) return next(new Error("Faltan campos"));
  next();
});

export default model("Note", Note);
