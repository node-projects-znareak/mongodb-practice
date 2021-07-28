const { Schema, model } = require("mongoose");
const { userSchema } = require("./User");

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
});

Note.pre("save", function (next) {
  const title = !this.title.trim();
  const desc = !this.description.trim();
  if (title || desc) return next(new Error("Faltan campos"));
  next();
});
 
module.exports = model("Note", Note);
