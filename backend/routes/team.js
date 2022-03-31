const express = require("express");
const router = express.Router();
const {setPitch,getPitch, setDescription, getDescription,getAll,getAllTeams,createTeam,deleteTeam,getTeamMembers,addTeamMember,removeTeamMember} = require("../controller/Team")

router.route("/setPitch").post(setPitch);
router.route("/getPitch").get(getPitch);
router.route("/getDescription").get(getDescription);
router.route("/setDescription").post(setDescription);


router.route("/getAll").get(getAll);
router.route("/getAllTeams").get(getAllTeams);
router.route("/createTeam").post(createTeam);
router.route("/deleteTeam").post(deleteTeam);
router.route("/getTeamMembers").post(getTeamMembers);
router.route("/addTeamMember").post(addTeamMember);
router.route("/removeTeamMember").post(removeTeamMember);

module.exports = router;