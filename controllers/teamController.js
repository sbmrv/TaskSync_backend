const Team = require("../models/Team");
const User = require("../models/user");

const createTeam = async (req, res) => {
  try {
    console.log(req.decodedToken)
    const managerId = req.decodedToken.ownerId; // Extracted from JWT
    const { name } = req.body;

    // Check if user is a manager
    // if (req.user.role !== "manager") {
    //   return res.status(403).json({ error: "Only managers can create teams." });
    // }

    // Prevent duplicate team creation by the same manager
    const existingTeam = await Team.findOne({ manager: managerId });
    if (existingTeam) {
      return res.status(400).json({ error: "Manager already has a team." });
    }

    // Create team
    const team = await Team.create({ name, manager: managerId, employees: [] });

    res.status(201).json(team);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const addEmployeesToTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { employees } = req.body; // Array of employee IDs

    // Check if team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Check if employees exist and have the "employee" role
    const validEmployees = await User.find({ _id: { $in: employees }, role: "employee" });
    if (validEmployees.length !== employees.length) {
      return res.status(400).json({ error: "Some employee IDs are invalid or not employees" });
    }

    // Filter out employees already in the team
    const newEmployees = employees.filter(empId => !team.employees.includes(empId));

    if (newEmployees.length === 0) {
      return res.status(400).json({ error: "All employees are already in this team" });
    }

    // Add only new employees
    team.employees.push(...newEmployees);

    await team.save();

    res.status(200).json({ message: "Employees added successfully", team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getManagersTeams = async (req, res) => {
  try {
    const managerId = req.user ? req.user.id : req.query.managerId; // Get manager ID from authentication or query

    if (!managerId) return res.status(400).json({ error: "Manager ID is required" });

    const teams = await Team.find({ manager: managerId }).populate("employees");

    if (!teams.length) return res.status(404).json({ error: "No teams found for this manager" });

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createTeam,
  addEmployeesToTeam,
  getManagersTeams
};