const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testModel = mongoose.model("testModel", new Schema({ name: String }));

module.exports = testModel;
