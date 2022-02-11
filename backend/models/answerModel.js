/*
* This code defines the answer model in the MongoDB backend.
* Attributes:
* <uid>: user ID
* <yearofstudy>: year of study
* <experience>: listed experience
* <courses>: listed courses
* <optional>: optional submitted comments
*/

const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    yearofstudy: {
        type: String,
        required: true,
    },
    interests: { 
        type: String,
        required:true,
    },
    experience: {
        type: String,
        required:true,
    },
    courses: {
        type: String,
        required:true,
    },
    optional: {
        type: String,
    },
});

const answerModel = mongoose.model("answers", answerSchema);

module.exports = answerModel;
