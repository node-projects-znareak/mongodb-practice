import mongoose from "mongoose";

const validationSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: [true, "The field `name` is required!"],
  },
  email: {
    type: String,
    minLength: 3,
    required: [true, "El correo debe ser obligatorio"],
  },
});

const Validation = mongoose.model("Validation", validationSchema);

export { Validation as default, validationSchema };
