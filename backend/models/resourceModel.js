// Each file will represent a different collection in database

const mongoose = require("mongoose");
const ResourceSchema = new mongoose.Schema({
  // define field and values this schema should have.

  name: {
    type: String,
    required: true,
  },
  section: {
    type: String,
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
const ResourceModel = mongoose.model("resources", ResourceSchema);

module.exports = ResourceModel;
