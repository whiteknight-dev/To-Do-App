require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: 1,
    title: "test",
    completed: false,
  },
];

app.get("/tasks", (request, response) => {
  response.json(tasks);
});

app.post("/tasks", (request, response) => {
  const { title } = request.body;
  const id = crypto.randomUUID();

  const newTask = {
    id: id,
    title: title,
    completed: false,
  };

  tasks.push(newTask);
  response.status(201).json(newTask);
});

// Default Route
app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`);
});
