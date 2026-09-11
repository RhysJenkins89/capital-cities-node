const nodemailer = require("nodemailer");

// // Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: "smtp.example.com",
//   port: 587,
//   secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
});

async function emailTest(req, res) {
  console.log("This is the email test function.");

  res.json("This is the email route.");

  try {
    const emailTestData = await transporter.sendMail({
      from: '"rhys-test" <rhys@test.com>',
      to: "email@test.com",
      subject: "Hello there!",
      text: "This is the text property",
      html: "<p>And this is the html property</p>",
    });
    console.log("The email has been sent successfullly.");
  } catch (error) {
    console.log("Something has gone wrong.", error);
  }
}

module.exports = emailTest;

// Start to convert this repo to TypeScript

// I need to understand conceptually what is going on here

// The Nodemailer package doesn't send an email per se. Nodemailer hands an email to an SMTP server, which then delivers the email. SMTP stands for Simple Mail Transfer Protocol.
// Note that I'm using Mailpit locally to receive emails on my local machine. To start Mailpit, run brew services start mailpit. To stop it, run brew services top mailpit.
// Once Mailpit has been started, navigate to port 8025 for the web UI, and use port 1025 for the SMTP server.
