const express = require("express");
const { SignupFunc, LoginFunc } = require("../controllers/getAll");
const router = express.Router();

router.post("/getAll", SignupFunc);
router.post("/login", LoginFunc);

module.exports = router;
