Backend Overview
Description
This project is a backend for a laundry service application, featuring user registration with OTP verification and a secure login system. The backend is built using Node.js and Express, with MongoDB Atlas as the database. The code provides APIs for user registration, OTP generation, and authentication.

Features
User Registration with OTP Verification:

Users can register by providing their email and password.
An OTP is sent to the user's email for verification.
The OTP is generated and sent using the Nodemailer library.
Login with Password:

Users can log in using their email and password.
Passwords are securely hashed using bcryptjs.
Packages Used
bcryptjs: For hashing user passwords.
cors: To handle Cross-Origin Resource Sharing.
dotenv: For managing environment variables.
express: Web framework for building the API.
jsonwebtoken: For handling JWT authentication.
mongodb: MongoDB driver for Node.js.
mongoose: ODM for MongoDB.
nodemailer: For sending emails, used for OTP delivery.
router: Lightweight routing library.
Database
The project uses MongoDB Atlas for storing user data, including credentials and OTP information.

Running the Project
Install dependencies:
bash
Copy code
npm install
Start the server:
bash
Copy code
npm start
Environment Variables
Ensure you have a .env file with the following variables:

PORT: The port the server will run on.
DB_URI: MongoDB Atlas connection string.
JWT_SECRET: Secret key for JWT authentication.
EMAIL_USER: Email address for sending OTPs.
EMAIL_PASS: Password for the email address used to send OTPs.
Security
Password Hashing: User passwords are hashed before being stored in the database using bcryptjs.
JWT Authentication: Secure token-based authentication for user sessions.
