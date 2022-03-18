const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();

const UserModel = require('../models/users');


// takes log in info and creates and stores user in database.
router.post("/", async (req,res) => {
    const {username, email, password} = req.body.data
    try {
        const user = await UserModel.findOne({email}).lean()
        if(!user) {
            return res.status(404).json({message: "User does not exists"})
        }
        if(user.password !== password) {
            return res.status(400).json({message: "Invalid Credentails"})
        }
        const token = jwt.sign(
            {user_id: user._id, username, email},
            process.env.SECRET_KEY
        )
        user.token = token
        res.status(200).json(user)
    }catch(err) {
        res.status(500).json(err)
    }
});


module.exports = router;