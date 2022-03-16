// Each file will represent a different collection in database

const mongoose = require("mongoose");
const teamMembersSchema = new mongoose.Schema({
  // define field and values this schema should have.
  
  studentNum: {
    type: String,
    required: true,
  },
  teamID: {
    type: String,
    required: true,
  },
  role:{
    type:String,
   
    required: true,
}
});

//takes the name of the collection and the schema that represents it
const TeamMembersModel = mongoose.model("resources", teamMembersSchema);

module.exports = TeamMembersModel;
