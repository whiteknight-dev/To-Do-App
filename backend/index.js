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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});
