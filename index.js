const express = require("express");
require("dotenv").config();
const Person = require("./models/person");
const App = express();
const morgan = require("morgan");

App.use(express.json());
App.use(express.static("build"));

morgan(function (tokens, req, res) {
  let log = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  console.log(log);
});

morgan.token("body", (req) => JSON.stringify(req.body));
App.use(morgan(":url :method :body:"));

// HARDCODE DATA

// let data = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

App.get("/", (request, response) => {
  response.send("<h1>Hello world!!</h1>  ");
});

App.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    let numOfPerson = persons.length;
    let info = `<div><h4>Phonebook has info for ${numOfPerson} people</h4><h4>${new Date().toLocaleDateString(
      "en-GB",
      {
        timeZoneName: "long",
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }
    )}</h4></div> `;

    response.send(info);
  });
});

App.get("/api/persons/", (request, response) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((err) => {
      response.end(err);
    });
});

App.get("/api/persons/:id", (request, response, next) => {
  //HARDCODE DATA
  // const id = Number(request.params.id);
  // const datum = data.find((n) => n.id === id);
  // console.log(datum);
  // response.json(datum);

  // DATABASE

  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

App.post("/api/persons/", (request, response, next) => {
  //HARDCODE DATA
  // let datum = request.body;
  // let nameAlreadyExists = data.some((n) => {
  //   return n.name === datum.name;
  // });

  // if (nameAlreadyExists) response.send("Name already exists!!");
  // else if (!datum.name || !datum.number)
  //   response.status(406).send("Name or number missing!!");
  // else {
  //   datum.id = Math.floor(Math.random() * 10000000);
  //   data.push(datum);
  //   response.status(201).json(datum);
  // }

  // DATABASE

  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  person
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

App.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => {
      next(error);
    });
});

App.delete("/api/persons/:id", (request, response, next) => {
  //HARDCODE DATA
  // const id = Number(request.params.id);
  // data = data.filter((n) => n.id !== id);
  // response.json(data.find((n) => n.id === id));

  //DATABASE

  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).json(result);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === "MongoServerError") {
    return response.status(400).send({ error: "This name already exists" });
  }

  next(error);
};

// this has to be the last loaded middleware.
App.use(errorHandler);
// eslint-disable-next-line
const PORT = process.env.PORT || "3001";

App.listen(PORT, () => {
  console.log(`Server running @ http://localhost:${PORT}/`);
});
