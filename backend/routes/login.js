const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();

const UserModel = require('../models/users');


// takes log in info and creates and stores user in database.
router.post("/", async (req,res) => {
    const {username, email, password, mode} = req.body.data
    try {
        const user = await UserModel.findOne({email}).lean()
        if(!user) {
            return res.status(404).json({message: "User does not exists"})
        }
        if(user.password !== password) {
            return res.status(400).json({message: "Invalid Credentails"})
        }
        if(mode === "admin" && user.isAdmin === false) {
            return res.status(400).json({message: "Please use student login"})
        }
        if(mode === "user" && user.isAdmin === true) {
            return res.status(400).json({message: "Please use admin login"})
        }
        const token = jwt.sign(
            {user_id: user._id, username, email, isAdmin: user.isAdmin},
            process.env.SECRET_KEY
        )
        user.token = token
        res.status(200).json(user)
    }catch(err) {
        res.status(500).json(err)
    }
});


module.exports = router;