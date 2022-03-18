
const express = require("express");
const router = express.Router();
const {
  getPastProjects,
  addPastProjects,
  createValidator,
  deletePastProjects,
} = require("../controller/PastProjects.js");

router.route("/create").post(createValidator,addPastProjects);
router.route("/").get(getPastProjects);
router.route("/delete").post(deletePastProjects);


module.exports = router;