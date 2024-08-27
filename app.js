const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
require("dotenv").config();

const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");

const { PORT = 3001 } = process.env;

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(requestLogger);
app.use(cors());
app.use(bodyParser.json());
app.use("/", mainRouter);

app.use(errorLogger);
app.use(errors());
app.use("/", errorHandler);

app.listen(PORT);
