const express = require("express");
const app = express.Router();
const { User } = require("../models/User");
const Project = require("../models/Project");
const Note = require("../models/Note");
const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    default: 0,
  },
});
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
const Subdoc = mongoose.model("Subdoc", subdocumentSchema);

app.get("/", (req, res, next) => {
  const doc = new Subdoc();
  // Now doc.child.age has the default value
  res.json(doc);

  // take the first sub-document in the array
  const firstChild = doc.children[0];
  console.log(doc.children);
  console.log(firstChild);
  // remove the specific sub-document in the array of sub-documents
  doc.children.id(firstChild._id).remove();
  
  console.log(doc.children);
});

app.post("/user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password,
    });
    // using a promise
    // await newUser.save();

    newUser.save((err, doc) => {
      if (err) return next(new Error(err));
      // Using a method of user model
      console.log("Usuario creado: ", newUser.toJson());
      console.log("Credenciales de usuario: ", newUser.auth);
      res.json(doc);
    });
  } catch (err) {
    next(err);
  }
});

app.get("/user", async (req, res, next) => {
  try {
    // Using an static method of user model
    const users = await User.getUsers("user");
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.put("/user/:id", (req, res, next) => {
  try {
    // using callback method
    User.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
      if (err) return next(new Error(err));
      res.json(result);
    });
  } catch (err) {
    next(err);
  }
});

app.get("/user/find/:username", (req, res, next) => {
  try {
    User.find(
      { name: new RegExp(`${req.params.username}`, "ig") },
      (err, doc) => {
        if (err) return next(new Error(err));
        res.json(doc);
      }
    );
  } catch (err) {
    next(err);
  }
});

app.get("/user2", async (req, res, next) => {
  try {
    // using with async query helper
    const users = await User.find({}).users();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// Projects api
app.post("/project", async (req, res, next) => {
  try {
    const { title, year, description, people } = req.body;
    const newProject = new Project({ title, year, description, people });
    //await newProject.save();
    newProject.save((err, doc) => {
      if (err) return next(new Error(err));
      res.json(doc);
    });
  } catch (err) {
    next(err);
  }
});

app.get("/project", async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// Notes api
app.post("/note", (req, res, next) => {
  try {
    // the `author` prop must follow the User schema
    const { title, description, author } = req.body;
    const newNote = new Note({ title, description, author });
    newNote.save((err, doc) => {
      if (err) return next(new Error(err));
      res.json(doc);
    });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
