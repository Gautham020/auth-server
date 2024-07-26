const express = require("express");
const ConnectToMongo = require("./db");
const cors = require("cors");

ConnectToMongo();

const app = express();
app.use(express.json());

const allowedOrigins = ['https://login-app-api.vercel.app']; // Your frontend URL

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies or auth headers
}));

const PORT = 4000;

app.use("/customer", require("./Routes/customer_Routes"));

// Handle preflight requests
app.options("*", cors());

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
