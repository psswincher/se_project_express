const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/index");
const { logRequest } = require("./middleware/middleware");

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const authorizeUser = (req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  next();
};

app.use(authorizeUser);
app.use(bodyParser.json());
app.use("/", logRequest);
app.use("/", mainRouter);

app.listen(PORT);
