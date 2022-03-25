const express = require("express");
const router = express.Router();
const {submitEvent, getAllEvents, getUpcomingEvents, getPastEvents} = require("../controller/Event");

// event routes
router.route("/eventSubmit").post(submitEvent); //add an event
router.route("/eventGetAll").get(getAllEvents); //get all events
router.route("/eventGetUpcoming").get(getUpcomingEvents); //get upcoming events and descriptions
router.route("/eventGetPast").get(getPastEvents); //get past events and descriptions

module.exports = router;