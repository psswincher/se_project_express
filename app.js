const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const mainRouter = require("./routes/index");
const { logRequest } = require("./middlewares/logRequest");

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(bodyParser.json());
app.use("/", logRequest);
app.use("/", mainRouter);

app.listen(PORT);
