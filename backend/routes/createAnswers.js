const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public"));
router.use(bodyParser.json());


const answerModel = require('../models/answerModel');

router.post("/", (req, res) => {
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
module.exports = router;