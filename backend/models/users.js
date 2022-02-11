// Each file will represent a different collection in database
  
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    // define field and values this schema should have.
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
    
});

//takes the name of the collection and the schema that represents it
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel; 