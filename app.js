// @ts-check

const express = require("express");

const { data } = require("./data.js");
let contacts = data;

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("<h1>Welcome to Phonebook Application");
});

app.get("/api/persons", (_req, res) => {
  res.json(contacts);
});

app.get("/info", (_req, res) => {
  res.write(`<p>Phonebook has info for ${data.length} people</p>`);
  res.write(`${new Date().toString()}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const contact = data.find(datum => datum.id === id);

  if (!contact) {
    return res.status(404).end();
  }

  res.json(contact);
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  contacts = data.filter(datum => datum.id !== id);
  res.status(204).end();
});

const generateID = () => {
  const id = contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) : 0;
  return id + 1;
}

app.post("/api/persons", (req, res) => {
  /** @type {{name: string, number: string}}*/
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "name is missing"
    })
  }

  if (!number) {
    return res.status(400).json({
      error: "number is missing"
    })
  }

  const person = {
    name, number, id: generateID(),
  }

  contacts.push(person);
  res.json(person);

})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
