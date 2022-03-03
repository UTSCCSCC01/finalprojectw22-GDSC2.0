const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public"));
router.use(bodyParser.json());


const answerModel = require('../models/answerModel');

router.get("/", (req, res) => {
    answerModel
      .find({})
      .then((data) => res.json(data))
      .catch((e) => console.log(e));
  });

module.exports = router;