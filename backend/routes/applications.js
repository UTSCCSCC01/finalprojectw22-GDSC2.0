const express = require("express");
const router = express.Router();
const {submitStudentForm, submitMentorForm, studentAppValidator, mentorAppValidator, filterStudentApp,filterMentorApp,studentQueryValidator,
    mentorQueryValidator,acceptMentorForm,acceptStudentForm,rejectMentorForm,rejectStudentForm,getStatus,statusValidator} = require("../controller/Applications");

// application routes
router.route("/studentSubmit").post(studentAppValidator,submitStudentForm);
router.route("/mentorSubmit").post(mentorAppValidator,submitMentorForm);
router.route("/filterStudentApp").post(studentQueryValidator,filterStudentApp);
router.route("/filterMentorApp").post(mentorQueryValidator,filterMentorApp);
router.route("/acceptStudent").post(acceptStudentForm);
router.route("/acceptMentor").post(acceptMentorForm);
router.route("/rejectStudent").delete(rejectStudentForm);
router.route("/rejectMentor").post(rejectMentorForm);
router.route("/status").post(statusValidator,getStatus);

module.exports = router;