// Each file will represent a different collection in database

const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  // define field and values this schema should have.
  
  name: {
    type: String,
    required: true,
  },
  ImagePath: {
      type:String,
      required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//takes the name of the collection and the schema that represents it
const ProjectModel = mongoose.model("resources", projectSchema);

module.exports = ProjectModel;
