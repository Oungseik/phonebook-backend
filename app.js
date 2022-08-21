// @ts-check

const express = require("express");
const app = express();
const { data } = require("./data.js");


app.get("/", (req, res) => {
  res.send("<h1>Welcome to Phonebook Application");
});


app.get("/api/persons", (req, res) => {
  res.json(data);
})

app.get("/info", (req, res) => {
  res.write(`<p>Phonebook has info for ${data.length} people</p>`);
  res.write(`${new Date().toString()}`);
})



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
