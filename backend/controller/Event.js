const mongoose = require("mongoose");
const eventModel = require("../models/events");

// Event Endpoints
/**
 * payload:{
 * }
 */
exports.getAllEvents = (async (req,res)=>{
    const events = await eventModel.find().sort({"event_date":-1})
    res.status(200).json({
        "events": events
    })
})

/**
 * payload:{
 *  name: String
 *  event_date: Date
 *  description: String (optional)
 *  location: String (optional)
 *  link: String (optional)
 * }
 */
exports.submitEvent = async (req, res) => {
  eventModel
    .create(req.body)
    .then((id) => {
      console.log(id);
    })
    .catch((e) => {
      console.log(e);
    });
  res.status(201).json({
    status: "success",
  });
};


/**
 * payload:{
 * }
 */
exports.getPastEvents = async (req,res)=>{
    const events = await eventModel.find({event_date: {$lte: ISODate()}}).exec()
    .catch((e)=>{
        res.status(404).json({
            "error": "past events do not exist"
        })
    })
    .then((events)=>{
        res.status(200).json({
            'events':events
        })
    })
    .catch((e)=>{
        res.status(400).json({
            'error':"you should not get here"
        })
    })
};

/**
 * payload:{
 * }
 */
 exports.getUpcomingEvents = async (req,res)=>{
    const events = await eventModel.find({event_date: {$gt: ISODate()}}).exec()
    .catch((e)=>{
        res.status(404).json({
            "error": "past events do not exist"
        })
    })
    .then((events)=>{
        res.status(200).json({
            'events':events
        })
    })
    .catch((e)=>{
        res.status(400).json({
            'error':"you should not get here"
        })
    })
};

