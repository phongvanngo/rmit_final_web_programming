const express = require("express");
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

const mongoDB = "mongodb://root:example@localhost:3001/?authMechanism=DEFAULT";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
const Schema = mongoose.Schema;

function isOlder18(timestamp) {
  const birthday = new Date(timestamp);
  console.log(birthday, new Date());
  const year = birthday.getFullYear();
  const month = birthday.getMonth();
  const day = birthday.getDate();
  return new Date(year + 18, month - 1, day) <= new Date() - birthday;
}

//create new schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/,
      "Passwords must be at least 8 characters and contain letters, numbers and special characters",
    ],
  },
  birthday: {
    type: Number,
    validate: {
      validator: function (v) {
        return isOlder18(v);
      },
      message: (props) => `Age must be more than 18`,
    },
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  address: {
    type: String,
    minLength: 10,
    maxLength: 100,
  },
  mobile_phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
  zalo: {
    type: String,
    minLength: 10,
    maxLength: 10,
  },
});

const UserModel = mongoose.model("User", UserSchema);

app.post("/register", (req, res) => {
  const newUser = new UserModel(req.body);
  newUser.save((err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.message);
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
