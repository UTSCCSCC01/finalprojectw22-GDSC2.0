const express = require("express");
const app = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());


const answerModel = require('../models/answerModel');

app.post("/createAnswers", (req, res) => {
    console.log(req.body.test);
    answerModel
        .create({ 
            uid: req.body.uid,
            yearofstudy: req.body.yearofstudy,
            interests: req.body.interests,
            experience: req.body.experience,
            courses: req.body.courses,
            optional: req.body.optional
         })
        .then((id) => {
      console.log(`inserted: ${id}`);
    })
        .catch((e) => console.log(e));
    res.send("inserted");
});
