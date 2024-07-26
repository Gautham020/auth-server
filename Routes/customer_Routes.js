const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  Register,
  Login,
  Otp,
  verifyOtp,
  customer,
} = require("../controller/Customer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customer/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", Register);
router.post("/login", Login);
router.post("/otp", Otp);
router.post("/verifyotp", verifyOtp);
router.get("/viewcustomer", customer);

// Example of a protected route

module.exports = router;
