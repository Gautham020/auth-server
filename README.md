<h1 align="center" id="title">Backend Overview</h1>

<p align="center"><img src="https://raw.githubusercontent.com/Gautham020/login-app/master/public/signin.png" alt="project-image"></p>

<p id="description">This project is a backend for a laundry service application featuring user registration with OTP verification and a secure login system. The backend is built using Node.js and Express with MongoDB Atlas as the database. The code provides APIs for user registration OTP generation and authentication.</p>

<h2>Project Screenshots:</h2>

<img src="https://raw.githubusercontent.com/Gautham020/login-app/master/public/fv.png" alt="project-screenshot" width="100" height="100/">

<img src="https://raw.githubusercontent.com/Gautham020/login-app/master/public/server.png" alt="project-screenshot" width="300" height="200/">

<h2>🛠️ Installation Steps:</h2>

<p>1. Install dependencies:</p>

```
npm install
```

<p>2. Running the Project</p>

```
nodemon index.js
```

<h2>🍰 Contribution Guidelines:</h2>

PORT: The port the server will run on. DB\_URI: MongoDB Atlas connection string. JWT\_SECRET: Secret key for JWT authentication. EMAIL\_USER: Email address for sending OTPs. EMAIL\_PASS: Password for the email address used to send OTPs. Security Password Hashing: User passwords are hashed before being stored in the database using bcryptjs. JWT Authentication: Secure token-based authentication for user sessions.
