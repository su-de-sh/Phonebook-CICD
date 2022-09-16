const mongoose = require("mongoose");

const password = process.argv[2];

const url = `mongodb+srv://sudesh:${password}@cluster0.ej4lg.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then((result) => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.log("Error!! MongoDB not connected");
  });

const schema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", schema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((r) => console.log(r.name, r.number));
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: Number(process.argv[4]),
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
