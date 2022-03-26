const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    event_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: false
    }
});

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;