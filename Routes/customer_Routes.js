const express = require("express");
const router = express.Router();
const { Register, Login, verifyOtp } = require("../controller/Customer");

router.post("/register", Register);
router.post("/login", Login);
router.post("/verifyotp", verifyOtp);

// Example of a protected route

module.exports = router;
