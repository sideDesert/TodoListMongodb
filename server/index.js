const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Todo = require("./models/todo");
const Key = require("./models/deletion");
//
mongoose.connect("mongodb://localhost:27017/todo-list");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "../")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", async (req, res) => {
  let record = await Todo.find({});
  res.json(record);
  console.log(record);
});

app.post("/api", async (req, res) => {
  const index = req.body;
  const length = index.length;
  let item = index[length - 1];
  const response = await Todo.create(item);
  console.log(response);
});

app.delete("/api", async (req, res) => {
  console.log("Deleting " + req.body);
  await Todo.deleteOne({ id: req.body.id });
  res.send("Deleted!");
});

app.listen(PORT, () => {
  console.log("Listening at port " + PORT);
});
