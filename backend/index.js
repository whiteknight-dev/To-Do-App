require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/todos", (request, response) => {
  const notes = require("./mock.json");

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

app.use((request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
