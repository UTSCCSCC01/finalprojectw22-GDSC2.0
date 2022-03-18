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
const applicationRoute = require("./routes/applications");
const auth = require("./middleware/auth")
const app = express();
const portalStatus = {
  active : true
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connect to database
connDB();

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register")
const sendMail = require("./routes/sendMail")
const bugReport = require("./routes/bugReport")
//const getAnsRoute = require("./routes/getAnswers");
//const createAnsRoute = require("./routes/createAnswers");

app.use("/login", loginRoute);
app.use('/register', registerRoute)
app.use("/mail", auth, sendMail)
app.use("/bugReport", auth, bugReport)
//app.use("/getAnswers", getAnsRoute);
//app.use("/createAnswers", createAnsRoute);
app.use("/applications", auth, applicationRoute);


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

app.get("/getPortalStatus", (req, res) => {
  res.send(portalStatus);
});

app.post("/postPortalStatus",(req,res)=>{
  portalStatus.active = req.body.status;
  res.send(portalStatus);
})
//End of endpoints 
const port = process.env.PORT || 8000
app.listen(
  port,
  console.log(`listening on port ${port}`)
);

module.exports = app;