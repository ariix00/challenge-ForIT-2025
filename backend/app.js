require("dotenv").config();
const fileSys = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const { error } = require("console");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something broke!" });
});

const tasksPath = path.join(__dirname, process.env.TASKS_PATH);

const readTasks = () => {
  try {
    const taskLisk = fileSys.readFileSync(tasksPath, "utf-8");

    return JSON.parse(taskLisk);
  } catch (error) {
    console.error("Error reading the tasks file:", error);
    return [];
  }
};
const writeTasks = (taskList) => {
  try {
    fileSys.writeFileSync(
      tasksPath,
      JSON.stringify(taskList, null, " "),
      "utf-8"
    );
  } catch (error) {
    console.error("Error wrtitting the tasks file:", error);
  }
};

app.get("/", (req, res) => {});
app.get("/api/tasks", (req, res) => {
  const taskList = fileSys.readFileSync(tasksPath, "utf-8");
  res.send(taskList);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.post("/api/tasks", (req, res) => {
  const taskList = readTasks();
  const newTask = {
    id: taskList.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: false,
  };

  console.log(taskList);
  taskList.push(newTask);
});
app.put("/api/tasks/:id", (req, res) => {
  const taskList = readTasks();
  const editedTask = taskList.find((task) => task.id == req.params.id);
  if (!editedTask) {
    return res.status(404).send({ error: "not found" });
  }
  editedTask.description = req.body.description;
  editedTask.title = req.body.title;

  writeTasks(taskList);
});
app.put("/api/tasks/completed/:id", (req, res) => {
  const taskList = readTasks();
  if (!taskToComplete) {
    return res.status(404).send({ error: "not found" });
  }
  const taskToComplete = taskList.find((task) => task.id == req.params.id);
  taskToComplete.completed = req.body.completed;

  writeTasks();
}),
  app.delete("/api/tasks/:id", (req, res) => {
    console.log(req.params.id);
    const taskList = readTasks();
    const filteredTask = taskList.filter((task) => {
      return task.id != req.params.id;
    });
    writeTasks(filteredTask);
  });
