import mongoose from "mongoose";
import { childSchema } from "./Child";

const subdocumentSchema = new mongoose.Schema({
  children: {
    type: [{ type: childSchema, default: () => ({}) }],
    default: [
      { name: "Libardo", age: 20 },
      { name: "Mariana", age: 21 },
    ],
  },

  child: {
    type: childSchema,

    /*
        If you use sub-documents and you want keep safe the prop `Subdoc.child`
        you must to add an default object value
      */
    default: () => ({}),
  },
});

const SubDocument = mongoose.model("SubDocument", subdocumentSchema);

export { SubDocument as default, subdocumentSchema };
