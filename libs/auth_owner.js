const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModel = require("../models/user");
const { AsyncLocalStorage } = require("async_hooks");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log(decodedToken, "sfsdfdf")

    const owner = await adminModel.findById(decodedToken.ownerId);
    if (!owner) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "wrong credentials,need login" });
  }
};
