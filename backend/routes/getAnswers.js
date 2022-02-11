const express = require("express");
const app = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());


const answerModel = require('../models/answerModel');

app.get("/getAnswers", (req, res) => {
    answerModel
      .find({})
      .then((data) => res.json(data))
      .catch((e) => console.log(e));
  });