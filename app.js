const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogsRouter = require("./routers/blogs");
const { MONGODB_URI } = require("./utils/config");

const app = express();

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use("/api/", blogsRouter);

module.exports = app;
