
const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
    team_name:{
        type:String,
        unique: true,
        required: true
    },
    description:{
        type:String,
        required: false
    },
    pitch:{
        type:String,
        required: false
    },
    creation_time:{
        type:Date,
        default: Date.now,
        immutable: true
    }
})

const teamModel = mongoose.model("team", teamSchema);

module.exports = teamModel;