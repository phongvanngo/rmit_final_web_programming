const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
const url = "mongodb+srv://rmit:rmit2022@cluster0.r7qjcbu.mongodb.net/exam";
mongoose.connect(url);
//define a "table" structure
var TaskSchema = new mongoose.Schema({
  name: String,
  status: String,
});
//create a model Student ==> students (database collection)
//Teacher => teachers , Course => courses
var Task = mongoose.model("Task", TaskSchema);
app.get("/tasks", function (req, res) {
  Task.find({}, function (err, tasks) {
    res.send(tasks);
  });
});
app.post("/tasks", function (req, res) {
  Task.create(req.body, function (err, task) {
    res.send(task);
  });
});
app.delete("/tasks/:id", function (req, res) {
  Task.deleteOne({ _id: req.params.id }, function (err, result) {
    res.send(result);
  });
});
app.put("/tasks", function (req, res) {
  Task.findOneAndUpdate(
    { _id: req.body.id },
    { name: req.body.name, status: req.body.status },
    function (err, result) {
      res.send(result);
    }
  );
});
app.get("/tasks/search/:keyword", function (req, res) {
  Task.find({ name: req.params.keyword }, function (err, result) {
    res.send(result);
  });
});
app.listen(9000);
