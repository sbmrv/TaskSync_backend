const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["manager", "employee"], required: true }, // Role-based access
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null }, // If employee, belongs to a team
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
