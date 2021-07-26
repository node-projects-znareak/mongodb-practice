const express = require("express");
const morgan = require("morgan");
const app = express();
const connectDb = require("./config");
const startServer = require("./config");
const User = require("./models/User");
const routers = require("./routers");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/api", routers);

startServer(app);
