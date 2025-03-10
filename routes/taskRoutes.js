const express = require("express");
const { assignTask, updateTaskStatus, getEmployeeTasks } = require("../controllers/taskController");
const router = express.Router();

router.post("/", assignTask);
router.put("/:taskId/status", updateTaskStatus);
router.get("/", getEmployeeTasks);

module.exports = router;
