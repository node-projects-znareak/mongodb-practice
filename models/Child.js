import mongoose from "mongoose";
const childSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    default: 0,
  },
});

const ChildModel = mongoose.model("Child", childSchema);

export { ChildModel as default, childSchema };
