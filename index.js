const express = require("express");
const ConnectToMongo = require("./db");
const cors = require("cors");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://login-app-api.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

// Database connection
ConnectToMongo();

// Routes
app.use("/customer", require("./Routes/customer_Routes"));

// Vercel function handler
module.exports = (req, res) => {
  app(req, res);
};
