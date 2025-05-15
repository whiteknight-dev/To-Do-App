require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/todos", (request, response) => {
  const notes = require("./notes");

  if (notes) response.status(200).send(notes);
  response.status(404);
});

app.post("/api/todos", (request, response) => {
  const notes = require("./notes");
  const body = request.body;

  if (body) {
    const note = { id: body.id, title: body.title, completed: body.completed };
    notes.push(note);
    response.status(201).send("New note created");
  }
});

app.put("/api/todos/:id", (request, response) => {
  const notes = require("./notes");
  const { id } = request.params;
  const body = request.body;
  if (!body) response.status(400).send("Invalid Request");
  const note = notes.find((note) => note.id === id);
  note = { ...note, title: body.title, completed: body.completed };
});

app.delete("/api/todos/:id", (request, response) => {
  const notes = require("./notes");
  const { id } = request.params;

  if (!id) response.status(400).send("Invalid ID");

  notes = notes.filter((note) => note.id !== id);
  response.status(202).send("Note deleted");
});

app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
