const express = require("express");
const router = express.Router();
const {submitStudentForm, studentAppValidator,filterStudentApp,filterMentorApp,studentQueryValidator,
    mentorQueryValidator} = require("../controller/Applications");

// application routes
router.route("/studentSubmit").post(studentAppValidator,submitStudentForm);
router.route("/filterStudentApp").post(studentQueryValidator,filterStudentApp);
router.route("/filterMentorApp").post(mentorQueryValidator,filterMentorApp);

module.exports = router;