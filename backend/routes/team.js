const express = require("express");
const router = express.Router();
const {getAll,getAllTeams,createTeam,deleteTeam,getTeamMembers,addTeamMember,removeTeamMember} = require("../controller/Teams")

router.route("/getAll").get(getAll);
router.route("/getAllTeams").get(getAllTeams);
router.route("/createTeam").post(createTeam);
router.route("/deleteTeam").post(deleteTeam);
router.route("/getTeamMembers").post(getTeamMembers);
router.route("/addTeamMember").post(addTeamMember);
router.route("/removeTeamMember").post(removeTeamMember);

module.exports = router;