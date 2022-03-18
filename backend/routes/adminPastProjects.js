
const resourceModel = require("../models/projects.js");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  
  reqPastProjects,
} = require("../controller/PastProjects.js");

router.route("/").post(reqPastProjects);


module.exports = router;