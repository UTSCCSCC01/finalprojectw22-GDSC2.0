const resourceModel = require("../models/resourceModel");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  addResource,
  getResource,
  deleteResource,
} = require("../controller/Resources");

router.route("/").post(addResource);
router.route("/").delete(deleteResource);
router.route("/").get(getResource);

module.exports = router;
