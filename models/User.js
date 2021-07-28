const { Schema, model } = require("mongoose");

const user = new Schema({
  name: {
    type: String,
    minLength: 4,
    maxLength: 50,
  },
  email: String,
  password: {
    type: String,
    minLength: 6,
    maxLength: 20,
  },
  role: {
    type: String,
    default: "user",
  },
});

// The schemas model may have its own methods
user.methods.toJson = function () {
  return JSON.stringify(this);
};

// Static method  (without to create a new instance)
user.statics.getUsers = function (role) {
  return new Promise((resolve, reject) => {
    model("User").find({ role }, (err, data) => {
      if (err) return reject(new Error("Ocurrió un error", err));
      resolve(data);
    });
  });
};

// Query helper, useful when you use queries commands
user.query.users = function () {
  return new Promise((resolve, reject) => {
    // the query command
    this.where({ role: "user" }).exec((err, data) => {
      if (err) return reject(new Error(err));
      resolve(data);
    });
  });
};

// Virtual setters an getters
user
  .virtual("auth")
  .get(function () {
    return this.email + ":" + this.password;
  })
  .set(function ({ email, password }) {
    this.email = email;
    this.password = password;
  });

module.exports = {
  User: model("User", user),
  userSchema: user,
};
