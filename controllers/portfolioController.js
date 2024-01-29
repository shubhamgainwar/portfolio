const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { name, email, msg } = req.body;

  if (!name || !email || !msg) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields." });
  }

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${msg}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", info);
    return res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email." });
  }
});
module.exports = { sendEmail };
