import { Schema, model } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    minLength: 4,
    maxLength: 50,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El e-mail es obligatorio"],
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 20,
    required: [true, "La contraseña es obligatorio"],
  },
  age: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: "user",
  },
});

// The schemas model may have its own methods
userSchema.methods.toJson = function () {
  return JSON.stringify(this);
};

// Static method  (without to create a new instance)
userSchema.statics.getuserSchemas = function (role) {
  return new Promise((resolve, reject) => {
    model("userSchema").find({ role }, (err, data) => {
      if (err) return reject(new Error("Ocurrió un error", err));
      resolve(data);
    });
  });
};

// Query helper, useful when you use queries commands
userSchema.query.userSchemas = function () {
  return new Promise((resolve, reject) => {
    // the query command
    this.where({ role: "userSchema" }).exec((err, data) => {
      if (err) return reject(new Error(err));
      resolve(data);
    });
  });
};

// Virtual setters an getters
userSchema
  .virtual("auth")
  .get(function () {
    return this.email + ":" + this.password;
  })
  .set(function ({ email, password }) {
    this.email = email;
    this.password = password;
  });

export const User = model("User", userSchema);
