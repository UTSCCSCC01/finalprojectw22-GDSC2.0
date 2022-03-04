const express = require("express");
const router = express.Router();
const smtpTransport = require('nodemailer-smtp-transport');

const nodemailer = require("nodemailer")

router.post("/", (req, res) => {
    const {email, severity, occurs, information} = req.body.data
    const output = `
        <p>You have a new bug</p>
        <h3>User Details</h3>
        <ul>
            <li>Email: ${email}</li>
        </ul>
        <h3>Buf Information</h3>
        <ul>
            <li>Bug Severity: ${severity}</li>
            <li>How often does it occurs ?: ${occurs}</li>
        </ul>
        <h3>Bug Details</h3>
        <p>${information}</p>
    `

    const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        auth: {
               user: process.env.EMAILID,
               pass: process.env.PASSWORD
           }
       }));
       const mailOptions = {
         from: email, // sender address
         to: process.env.EMAILID, // list of receivers
         subject: 'Bug Issue', // Subject line
         html: output
       };
       transporter.sendMail(mailOptions, (err, info) => {
          if(err)
            res.status(500).json(err)
          else
            res.status(200).json({"message": "success"})
       });
})

module.exports = router