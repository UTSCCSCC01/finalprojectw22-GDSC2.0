const router = require("express").Router()
const fs = require("fs")
const BugReport = require("../models/bugReportModel")

router.get("/", async (req, res) => {
    try {
        const bugReportData = await BugReport.find({})
        res.status(200).json({
            bugReportData
        })
    }catch(ex) {
        res.status(500).json(ex)
    }
})
router.post("/", async (req, res) => {
    const {email, severity, occurs, information} = req.body.data
    try {
        const newBug = new BugReport({
            email, bugSeverity: severity, occurance: occurs, information
        })
        await newBug.save()
        res.status(200)
    }catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router
