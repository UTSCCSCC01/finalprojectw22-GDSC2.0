const express = require("express");
const router = express.Router();

const UserModel = require('../models/users');


// takes log in info and creates and stores user in database.
router.post("/", async (req,res) => {
    try {
        const {firstName, lastName, userName, studentNumber, email, password} = req.body.data;
        const userExists = await UserModel.findOne({email})
        if(userExists) {
            return res.status(422).json({message: "User already exist"})
        }
        const newUser = new UserModel({firstName, lastName, userName, studentNumber, email, password});
        const user = await newUser.save(); 
        res.status(200).json({user});
    }catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
 });



module.exports = router;