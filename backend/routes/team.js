const express = require("express");
const router = express.Router();
const {getAll,getAllTeams,createTeam,deleteTeam,getTeamMembers,addTeamMember,removeTeamMember,getMentorApp,getStudentApp} = require("../controller/Team")

router.route("/getAll").get(getAll);
router.route("/getAllTeams").get(getAllTeams);
router.route("/createTeam").post(createTeam);
router.route("/deleteTeam").post(deleteTeam);
router.route("/getTeamMembers").post(getTeamMembers);
router.route("/addTeamMember").post(addTeamMember);
router.route("/removeTeamMember").post(removeTeamMember);
router.route("/getMentorApp").get(getMentorApp);
router.route("/getStudentApp").get(getStudentApp);

module.exports = router;