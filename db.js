// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// MongoDB connection URI from environment variables
// const mongoURI = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL,() => {
    console.log("Mongo connected");
});

// Optional: handle connection events for better debugging
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from DB');
});

module.exports = mongoose;
