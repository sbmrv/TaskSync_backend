const express = require("express");
const { SignupFunc, LoginFunc } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", SignupFunc);
router.post("/login", LoginFunc);

module.exports = router;
