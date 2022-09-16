const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Error!! MongoDB not connected");
  });

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  number: {
    type: String,
    requried: true,

    validate: {
      validator: (num) => {
        num = num.split("-");

        if (
          num.length === 2 &&
          typeof Number(num[0]) === "number" &&
          typeof Number(num[1]) === "number" &&
          (num[0].length === 2 || num[0].length === 3)
        ) {
          return true;
        } else if (num.length === 1) return true;
        else return false;
      },
      message: "Please enter a valid number.",
    },
    minLength: 8,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", schema);
