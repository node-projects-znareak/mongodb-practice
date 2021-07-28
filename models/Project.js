const { Schema, model } = require("mongoose");

const Project = Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  year: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    trim: true,
    default: "Empty",
  },
  people: [String],
  date: {
    type: Date,
    default: Date.now(),
  },
  summary: {
    bugs: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
});

Project.methods.toJson = function () {
  delete this.__v;
  return JSON.stringify(this);
};

module.exports = model("Project", Project);
