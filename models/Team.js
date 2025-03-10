const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Manager who created the team
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true }] // Employees in the team
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);
