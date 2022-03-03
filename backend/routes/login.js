const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public"));
router.use(bodyParser.json());


const userModel = require('../models/users');


// takes log in info and creates and stores user in database.
router.post("/", (req,res) => {
    console.log(req.body.test);
    userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    })
    .then((id) => {
        console.log(`inserted: ${id}`);
    })
    .catch((err) => console.log(err));
    res.send("login sent")
    
 
});

module.exports = router;