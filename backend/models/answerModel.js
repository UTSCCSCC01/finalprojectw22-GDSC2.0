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
