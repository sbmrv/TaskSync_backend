const Task = require("../models/Task");
const User = require("../models/user");

const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    // Ensure required fields are provided
    if (!title || !description || !assignedTo) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const task = await Task.create({ title, description, assignedTo });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Assign Task to Employee
const assignTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const employee = await User.findById(assignedTo);
    if (!employee || employee.role !== "employee") {
      return res.status(400).json({ error: "Invalid employee ID" });
    }

    const task = await Task.create({ title, description, assignedTo, status: "pending" });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Employee Updates Task Status
const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Employee’s Assigned Tasks
const getEmployeeTasks = async (req, res) => {
  try {
    const { employeeId } = req.user; // Extracted from auth middleware

    const tasks = await Task.find({ assignedTo: employeeId });
    if (!tasks.length) return res.status(404).json({ error: "No tasks found for this employee" });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {createTask, assignTask, updateTaskStatus, getEmployeeTasks };
