const customerSchema = require("../Models/customer_schema");
const temporarySchema = require("../Models/temporary_schema");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

const SECRETE_KEY = process.env.TOKEN_SECRET; // Use a secure and environment-specific secret key

// Register a new customer
const Register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const checkEmail = await temporarySchema.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newCustomer = new temporarySchema({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    const savedCustomer = await newCustomer.save();

    // Generate and send OTP
    const generateOtp = Math.floor(1000 + Math.random() * 9000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Gautham Kotian" <gauthamkotian020@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Please verify your email address", // Subject line
      html: `
        <!doctype html>
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Simple Transactional Email</title>
            <style media="all" type="text/css">
              body { font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
              table { border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; }
              table td { font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; }
              body { background-color: #f4f5f6; margin: 0; padding: 0; }
              .body { background-color: #f4f5f6; width: 100%; }
              .container { margin: 0 auto !important; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; }
              .content { box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0; }
              .main { background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%; }
              .wrapper { box-sizing: border-box; padding: 24px; }
              .footer { clear: both; padding-top: 24px; text-align: center; width: 100%; }
              .footer td, .footer p, .footer span, .footer a { color: #9a9ea6; font-size: 16px; text-align: center; }
              p { font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px; }
              a { color: #0867ec; text-decoration: underline; }
              .btn { box-sizing: border-box; min-width: 100% !important; width: 100%; }
              .btn > tbody > tr > td { padding-bottom: 16px; }
              .btn table { width: auto; }
              .btn table td { background-color: #ffffff; border-radius: 4px; text-align: center; }
              .btn a { background-color: #ffffff; border: solid 2px #0867ec; border-radius: 4px; box-sizing: border-box; color: #0867ec; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; }
              .btn-primary table td { background-color: #0867ec; }
              .btn-primary a { background-color: #0867ec; border-color: #0867ec; color: #ffffff; }
              @media all { .btn-primary table td:hover { background-color: #ec0867 !important; } .btn-primary a:hover { background-color: #ec0867 !important; border-color: #ec0867 !important; } }
              .last { margin-bottom: 0; }
              .first { margin-top: 0; }
              .align-center { text-align: center; }
              .align-right { text-align: right; }
              .align-left { text-align: left; }
              .text-link { color: #0867ec !important; text-decoration: underline !important; }
              .clear { clear: both; }
              .mt0 { margin-top: 0; }
              .mb0 { margin-bottom: 0; }
              .preheader { color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0; }
              .powered-by a { text-decoration: none; }
              @media only screen and (max-width: 640px) {
                .main p, .main td, .main span { font-size: 16px !important; }
                .wrapper { padding: 8px !important; }
                .content { padding: 0 !important; }
                .container { padding: 0 !important; padding-top: 8px !important; width: 100% !important; }
                .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; }
                .btn table { max-width: 100% !important; width: 100% !important; }
                .btn a { font-size: 16px !important; max-width: 100% !important; width: 100% !important; }
              }
              @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } }
            </style>
          </head>
          <body>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
              <tr>
                <td>&nbsp;</td>
                <td class="container">
                  <div class="content">
                    <span class="preheader">Otp is sent successfully</span>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
                      <tr>
                        <td class="wrapper">
                          <h2>Email Verification</h2>
                          <p>It seems you are registering at our website and trying to verify your email.</p>
                          <p>Here is the verification code. Please copy it and verify your Email</p>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td> <a href="#">${generateOtp}</a> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p>If this email is not intended to you please ignore and delete it.Thank you for understanding.</p>
                        </td>
                      </tr>
                    </table>
                    <div class="footer">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td class="content-block">
                            <span class="apple-link">Company Gautham Kotian, Mysore </span>
                            <br> Don't like these emails? <a href="#">Unsubscribe</a>.
                          </td>
                        </tr>
                        <tr>
                          <td class="content-block powered-by">
                            Powered by <a href="#">gauthamkotian020@gmail.com</a>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </td>
                <td>&nbsp;</td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (info.messageId) {
      await temporarySchema.findOneAndUpdate({ email }, { otp: generateOtp });

      return res
        .status(200)
        .json({ message: "OTP Sent Successfully", success: true });
    }

    return res.status(500).json({ message: "Failed to send OTP" });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).json({ error: err, message: "Internal Server Error" });
  }
};

// Customer login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(req.body);
    const user = await customerSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email or Password Invalid!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Email or Password Invalid!" });
    }

    const token = jsonwebtoken.sign({ userId: user.id }, SECRETE_KEY, {
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
    res.status(500).json({ error: err, message: "Internal Server Error" });
  }
};



// Verify OTP for user authentication
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required!" });
    }

    const user = await temporarySchema.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    // Transfer data to the main customer schema
    const newCustomer = new customerSchema({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });

    await newCustomer.save();
    await temporarySchema.findOneAndDelete({ email });

    const token = jsonwebtoken.sign({ userId: newCustomer._id }, SECRETE_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "OTP verification successful and user registered!",
      success: true,
      loggedInUser: newCustomer,
      authToken: token,
    });
  } catch (err) {
    console.error("Error occurred:", err);
    res
      .status(500)
      .json({ error: err.message, message: "Internal Server Error" });
  }
};

// Get all customers

module.exports = {
  Register,
  Login,
  verifyOtp,
};
