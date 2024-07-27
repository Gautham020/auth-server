const customerSchema = require("../Models/customer_schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const SECRET_KEY = process.env.TOKEN_SECRET; // Corrected variable name

// Register a new customer
const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if email already exists
    const existingCustomer = await customerSchema.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new customer record
    const newCustomer = new customerSchema({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // Save the new customer to the database
    const savedCustomer = await newCustomer.save();
    console.log("New customer registered successfully");
    res.status(201).json({
      success: true,
      message: "New customer registered successfully",
      customer: savedCustomer,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Customer login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await customerSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("Login successful!");
    res.json({
      message: "Login successful!",
      success: true,
      loggedInUser: user,
      authToken: token,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Send OTP for email verification
const Otp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Generate a 4-digit OTP
    const generateOtp = Math.floor(1000 + Math.random() * 9000);

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Send the OTP email
    const info = await transporter.sendMail({
      from: "no-reply@example.com", // Use a standard no-reply address
      to: email,
      subject: "Your OTP Code",
      html: `<b>Your OTP is: <i>${generateOtp}</i></b>`,
    });

    if (info.messageId) {
      // Update user with the generated OTP
      const user = await customerSchema.findOneAndUpdate(
        { email },
        { otp: generateOtp },
        { new: true }
      );

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      return res.status(200).json({ message: "OTP sent successfully", success: true });
    }

    return res.status(500).json({ message: "Failed to send OTP" });
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Verify OTP for user authentication
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required!" });
    }

    // Find user with matching email and OTP
    const user = await customerSchema.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    // Clear the OTP after verification
    user.otp = null; 
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "OTP verification successful and login complete!",
      success: true,
      loggedInUser: user,
      authToken: token,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerSchema.find();
    res.json(customers);
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  Register,
  Login,
  Otp,
  verifyOtp,
  getAllCustomers,
};
