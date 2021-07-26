const express = require("express");
const app = express.Router();
const User = require("../models/User");

app.get("/", (req, res) => {
  res.json({
    data: "Hello word",
  });
});

app.post("/user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    // Using a method of user model
    console.log("Usuario creado: ", newUser.toJson());
    res.json(newUser);
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

app.get("/user2", async (req, res, next) => {
  try {
    // using with query helper
    const users = await User.find({}).users();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
