/*
* This code handles the server endpoints for the backend MongoDB models.
* Models:
* <testModel>: a sample test model
* <users>: the user model
* <answerModel>: the application answers model
* <teams>: the team members model
*/

// required frameworks/modules
require("dotenv").config();
const express = require("express");
const connDB = require("./config/db");
const testModel = require("./models/testModel");
const bodyParser = require("body-parser");
const answerModel = require("./models/answerModel");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
// connect to database
connDB();

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register")
const sendMail = require("./routes/sendMail")
//const getAnsRoute = require("./routes/getAnswers");
//const createAnsRoute = require("./routes/createAnswers");

app.use("/login", loginRoute);
app.use('/register', registerRoute)
app.use("/mail", sendMail)
//app.use("/getAnswers", getAnsRoute);
//app.use("/createAnswers", createAnsRoute);



app.get("/", (req, res) => {
  res.send("API IS RUNNING...");
});

app.get("/data", (req, res) => {
  testModel
    .find({})
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
});

app.post("/", (req, res) => {
  console.log(req.body.test);
  testModel.create({ name: req.body.test }).then((id) => {
    console.log(`inserted: ${id}`);
  });
  res.send("inserted");
});

app.get("/getAnswers", (req, res) => {
  answerModel
    .find({})
    .then((data) => res.json(data))
    .catch((e) => console.log(e));
});
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
//End of endpoints 
const port = process.env.PORT || 5000
app.listen(
  port,
  console.log(`listening on port ${port}`)
);

