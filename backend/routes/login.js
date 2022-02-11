const express = require("express");
const router = express.Router();

const UserModel = require('../models/users');


// takes log in info and creates and stores user in database.
router.post("/", async (req,res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
} );

module.exports = router;