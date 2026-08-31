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

// const transporter = nodemailer.createTestAccount({
//   host: "localhost",
//   port: 8025,
//   secure: false,
// });

async function emailTest(req, res) {
  console.log("This is the email test function.");

  res.send("This is the email route.");

  // try {
  //   const emailTestData = await transporter.sendMail({
  //     from: '"rhys-test" <rhys@test.com>',
  //     to: "email@test.com",
  //     subject: "Hello there!",
  //     text: "This is the text property",
  //     html: "<p>And this is the html property</p>",
  //   });
  //   console.log("The email has been sent successfullly.");
  // } catch (error) {
  //   console.log("Something has gone wrong.", error);
  // }

  //   const info = await transporter.sendMail({
  //     from: '"Example Team" <team@example.com>', // sender address
  //     to: "alice@example.com, bob@example.com", // list of recipients
  //     subject: "Hello", // subject line
  //     text: "Hello world?", // plain text body
  //     html: "<b>Hello world?</b>", // HTML body
  //   });
}

module.exports = emailTest;
