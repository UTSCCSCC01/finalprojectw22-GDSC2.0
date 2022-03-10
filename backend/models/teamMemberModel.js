
const mongoose = require("mongoose");
const schema = mongoose.Schema
const teamMemberSchema = new mongoose.Schema({
    student_num:{
        type: String,
        required: true,
        unique:true
    },
    team:{
        type: schema.Types.ObjectId,
        ref: "team",
        required: true
    },
    role:{
        type:String,
        required: true,
        enum: ["student","mentor"]
    },
    creation_time:{
        type:Date,
        default: Date.now,
        immutable: true
    }
})


const teamMemberModel = mongoose.model("teamMember", teamMemberSchema);

module.exports = teamMemberModel;