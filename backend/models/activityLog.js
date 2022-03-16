// Each file will represent a different collection in database

const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema({
  // define field and values this schema should have.
  
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
    default: Date.now,
    immutable: true,
}
});

//takes the name of the collection and the schema that represents it
const ActivityLogModel = mongoose.model("resources", activitySchema);

module.exports = ActivityLogModel;
