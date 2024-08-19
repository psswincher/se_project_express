const express = require("express");
const mainRouter = require("./routes/index");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { logRequest, authorizeUser } = require("./middleware/middleware");
const { PORT = 3001 } = process.env;

const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to DB"));

app.use(authorizeUser);
app.use(bodyParser.json());
app.use("/", logRequest);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log("Express is running.");
});
