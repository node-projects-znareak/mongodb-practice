const Mongoose = require("mongoose");
const message = require("../utils/messages");
const wrapServerErrors = require("../middlewares/errorHandler");
const MONGODB_URL =
  "mongodb+srv://znareak:28001320@cluster0.oegdf.mongodb.net/mongo_testing?retryWrites=true";
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

Mongoose.connection.on("open", () => {
  message.success("Connect to database in " + MONGODB_URL);
});

async function connectDb() {
  try {
    return await Mongoose.connect(MONGODB_URL, OPTIONS);
  } catch (err) {
    message.error("Error in connect to mongodb", err);
    const id = setTimeout(() => {
      if (connectionTries === CONNECTION_TOTAL_TRIES) return clearTimeout(id);
      message.warn(`Reconnecting to mongodb server {${connectionTries}}...`);
      connectionTries++;
      connectDb();
    }, 4000);
  }
}

async function startServer(app) {
  try {
    wrapServerErrors(app);

    const server = app.listen(5000, async () => {
      console.clear();
      message.success(`Server has started in http://localhost:5000/`);
    });
  } catch (err) {
    message.error("Error Ocurred while starting the server", err);
  }
}

module.exports = {
  connectDb,
  startServer,
};
