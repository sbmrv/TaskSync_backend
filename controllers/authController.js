const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { validationResult } = require("express-validator");

const SignupFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(200).json({
        error: true,
        result: result.errors[0],
      });
    }
    const { name, email, password, role } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(200)
        .json({ message: "Email already present!", error: true });
    }
    const hashedPass = await bcrypt.hash(password, 10); //hashed here

    const newowner = new User({
      name,
      email,
      password: hashedPass,
      role
    });
    const ownerSave = await newowner.save();

    if (ownerSave) {
      // const token = jwt.sign({ ownerId: ownerSave._id }, process.env.SECRET, {
      //   expiresIn: "7d",
      // });
      res
        .status(200)
        .json({ message: "Manager created successfully!", error: false });
    } else {
      res.status(200).json({ message: "No data is submitted!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "Something went wrong in creating owner account",
      error: true,
    });
  }
};

const LoginFunc = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    const UserData = await User.findOne({ email });
    if (!UserData) {
      return res.status(200).json({ message: "Email not found", error: true });
    }
    const passwordMatch = await bcrypt.compare(password, UserData.password); //unhashed and compared
console.log(UserData, "fdghgfhd")
    if (!passwordMatch) {
      return res
        .status(200)
        .json({ message: "Password is incorrect", error: true });
    }
    const token = jwt.sign({ ownerId: UserData._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({ message: "Login successful", error: false, UserData, token });
  } catch (err) {
    res
      .status(200)
      .json({ message: err.message || "Something went wrong", error: true });
  }
};

module.exports = {
    SignupFunc,
    LoginFunc,
  };