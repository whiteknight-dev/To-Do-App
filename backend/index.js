require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: "1",
    title: "test",
    completed: false,
  },
];

app.get("/tasks", (request, response) => {
  response.json(tasks);
});

app.post("/tasks", (request, response) => {
  const { title } = request.body;

  if (!title) return response.status(400).json({ error: "Title is required" });

  const newTask = {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
  };

  tasks.push(newTask);
  response.status(201).json(newTask);
});

app.put("/tasks/:id", (request, response) => {
  const { id } = request.params;
  const { title, completed } = request.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return response.status(404).json({ error: "Task not found" });
  }

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  response.json(task);
});

app.delete("/tasks/:id", (request, response) => {
  const { id } = request.params;

  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return response.status(404).json({ error: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  response.status(204).end();
});

// Default Route
app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`);
});
