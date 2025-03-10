const express = require("express");
const { addEmployeesToTeam, getManagersTeams, createTeam } = require("../controllers/teamController");
const router = express.Router();

router.put("/:teamId/add-employees", addEmployeesToTeam);
router.post("/create-team", addEmployeesToTeam);
router.get("/", getManagersTeams);

module.exports = router;
