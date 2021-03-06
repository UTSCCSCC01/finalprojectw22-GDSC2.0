const mongoose = require("mongoose")

const BugReportSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    bugSeverity: {
        type: String,
        required: true,
    },
    occurance: {
        type: String,
        required: true
    },
    information: {
        type: String, 
        required: true,
    },
    resolved: {
        type: Boolean,
        default: false
    }
})

const bugReport = mongoose.model("BugReport", BugReportSchema)
module.exports = bugReport