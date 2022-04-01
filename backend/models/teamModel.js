
const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
    team_name:{
        type:String,
        unique: true,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    pitch:{
        type:String,
        required: true
    },
    creation_time:{
        type:Date,
        default: Date.now,
        immutable: true
    }
})

const teamModel = mongoose.model("team", teamSchema);

module.exports = teamModel;