// Each file will represent a different collection in database

const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  // define field and values this schema should have.
  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
      type:String,
      required: true,
  },
  userName: {
    type:String,
    required: true,
},
email: {
    type:String,
    required: true,
},
password: {
    type:String,
    required: true,
}
  
});

//takes the name of the collection and the schema that represents it
const AdminTableModel = mongoose.model("resources", adminSchema);

module.exports = AdminTableModel;
