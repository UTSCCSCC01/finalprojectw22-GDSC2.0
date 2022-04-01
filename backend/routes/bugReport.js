const router = require("express").Router()
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

router.post("/resolved", async (req, res) => {
    const {id, isResolved} = req.body.data
    try {
        const bug = await BugReport.findById(id)
        if(!bug) {
            return res.status(404).json({"message": "Bug Id not found"})
        }
        bug.resolved = isResolved
        await bug.save()
        res.status(200)
    }catch(err) {
        res.status(500).json(err)
    }
})

router.post("/deleteBug", async(req, res) => {
    const {id} = req.body.data
    try {
        const bug = await BugReport.findByIdAndDelete(id)
        if(!bug) {
            return res.status(404).json({message: "Bug Id not found"})
        }
        res.status(200)
    }catch(err) {
        res.status(500).json(err)
    }
})

router.post("/editBug", async(req, res) => {
    const {id, email, severity, occurs, information} = req.body.data
    try {
        const bug = await BugReport.findById(id)
        bug.email = email
        bug.bugSeverity = severity
        bug.occurance = occurs
        bug.information = information
        const data = await bug.save()
        res.status(200).json({data})
    }catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
