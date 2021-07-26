const { Schema, model } = require("mongoose");

const user = new Schema({
  name: String,
  email: String,
  password: String,
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

module.exports = model("User", user);
