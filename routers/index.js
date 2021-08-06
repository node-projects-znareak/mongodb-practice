import express from "express";
import Note from "../models/Note";
import Validation from "../models/Validation";
import SubDocument from "../models/SubDocument";
import User from "../models/User";
import { error } from "../utils/httpResponses";
import {
  validationsSchema,
  userSchemaValidation,
  projectSchemaValidation,
} from "../utils/validations/validations";
import validate from "../utils/validations/validate";

const app = express.Router();
const Project = require("../models/Project");

app.get("/", async (req, res, next) => {
  const query = Note.find({ "author.role": "administrator" });
  // just select some fields
  query.select("title description");
  // after, execute the query
  const notes = await query.exec();

  const doc = new SubDocument();
  // Now doc.child.age has the default value
  res.json({
    doc,
    notes,
  });

  // take the first sub-document in the array
  const firstChild = doc.children[0];
  console.log(doc.children);
  console.log(firstChild);
  // remove the specific sub-document in the array of sub-documents
  doc.children.id(firstChild._id).remove();

  console.log(doc.children);
});

app.get("/validations", validate(validationsSchema), (req, res, next) => {
  try {
    const { name, email } = req.body;
    const doc = new Validation({ name, email });
    doc.save((err, document) => {
      if (err) return res.json(error(res, err, 400));
      res.json(document);
    });
  } catch (err) {
    next(err);
  }
});

app.post("/user", validate(userSchemaValidation), async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;
    const newUser = new User({
      name,
      email,
      password,
      age,
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

// app.get("/user", async (req, res, next) => {
//   try {
//     // Using an static method of user model
//     const users = await User.getUsers("user");
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// });

app.get("/user", (req, res, next) => {
  try {
    User.find({
      age: {
        // age range
        $gte: 18,
        $lte: 30,
      },
    })
      // i just want the first 3 users
      .limit(3)
      .sort({ name: "desc" })
      // Select some fields
      .select("name email age")
      // Execute the query
      .exec((err, data) => {
        if (err) return next(new Error(err));
        res.json(data);
      });
  } catch (err) {
    next(err);
  }
});

app.get("/user2", (req, res, next) => {
  try {
    User.find({})
      .where("role")
      .eq("administrator")
      .limit(3)
      .sort({ name: "desc" })
      .select("name email")
      .exec((err, data) => {
        if (err) return next(new Error(err));
        res.json(data);
      });
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
app.post(
  "/project",
  validate(projectSchemaValidation),
  async (req, res, next) => {
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
  }
);

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
    const newNote = new Note({
      title,
      description,
      author,
      tags: ["default tag "],
    });
    newNote.save((err, doc) => {
      if (err) return next(new Error(err));
      res.json(doc);
    });
  } catch (error) {
    next(error);
  }
});

app.get("/note", (req, res, next) => {
  try {
    Note.find({})
      .where("author.role")
      .eq("administrator")
      .select("title description tags")
      .limit(10)
      .exec((err, data) => {
        if (err) return next(new Error(err));
        res.json(data);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = app;
