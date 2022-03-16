// Each file will represent a different collection in database

const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  // define field and values this schema should have.
  
  name: {
    type: String,
    required: true,
  }
  
});

//takes the name of the collection and the schema that represents it
const TeamsModel = mongoose.model("resources", teamSchema);

module.exports = TeamsModel;
