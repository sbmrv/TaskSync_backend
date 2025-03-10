const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { validationResult } = require("express-validator");


const getAllPropertyFunc = async (req, res) => {
    try{
        const propertydata = await User.find(query);
        res.status(200).json({
          message: "Property data retrieved successfully.",
          propertydata,
          error: false,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message || "Something went wrong in getAllPropertyFunc",
          error: true,
        });
      }
}


module.exports = {
    SignupFunc,
    LoginFunc,
  };