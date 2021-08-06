const express = require("express");
const morgan = require("morgan");
const app = express();
const { startServer, connectDb } = require("./config");
const routers = require("./routers");

async function init() {
  await connectDb();
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", routers);
  startServer(app);
}

init();
