require("dotenv").config();
const fileSys = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(express.json());

app.use(express.urlencoded());
app.use(cors());

const tasksPath = path.join(__dirname, process.env.TASKS_PATH);

app.get("/", (req, res) => {});
app.get("/api/tasks", (req, res) => {
  const taskList = fileSys.readFileSync(tasksPath, "utf-8");
  res.send(taskList);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.post("/api/tasks", (req, res) => {
  const taskList = JSON.parse(fileSys.readFileSync(tasksPath, "utf-8"));
  const newTask = {
    id:
      taskList[taskList.length] > 0 ? taskList[taskList.length - 1].id + 1 : 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };
  console.log(req.body.title);
  console.log(req.body.description);

  console.log(taskList);
  taskList.push(newTask);
  fileSys.writeFileSync(
    tasksPath,
    JSON.stringify(taskList, null, " "),
    "utf-8"
  );

  res.redirect("/");
});
app.put("/api/tasks/:id", (req, res) => {
  const taskList = JSON.parse(fileSys.readFileSync(tasksPath, "utf-8"));
  const editedTask = taskList.find((task) => task.id == req.params.id);
  editedTask.description = req.body.description;
  editedTask.title = req.body.title;

  fileSys.writeFileSync(
    tasksPath,
    JSON.stringify(taskList, null, " "),
    "utf-8"
  );
  res.redirect("/");
});
app.delete("api/tasks/:id", (req, res) => {
  console.log(req.params.id);
  const taskList = JSON.parse(fileSys.readFileSync(tasksPath, "utf-8"));
  const filteredTask = taskList.filter((task) => {
    return task.id != req.params.id;
  });
  fileSys.writeFileSync(
    tasksPath,
    JSON.stringify(filteredTask, null, " "),
    "utf-8"
  );
  res.redirect("/");
});
