const nodemailer = require('nodemailer')
// const { google } = require("googleapis");
// const OAuth2 = google.auth.OAuth2;
require('dotenv').config();

// const createTransporter = async () => {
//   const oauth2Client = new OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     "https://developers.google.com/oauthplayground"
//   );

//   oauth2Client.setCredentials({
//     refresh_token: process.env.REFRESH_TOKEN
//   });

//   const accessToken = await new Promise((resolve, reject) => {
//     oauth2Client.getAccessToken((err, token) => {
//       if (err) {
//         reject();
//       }
//       resolve(token);
//     });
//   });

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: process.env.EMAIL,
//       accessToken,
//       clientId: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       refreshToken: process.env.REFRESH_TOKEN
//     }
//   });

//   return transporter;
// }

// const sendEmail = async (emailOptions) => {
//   let emailTransporter = await createTransporter();
//   await emailTransporter.sendMail(emailOptions);
// };

// console.log("Mailing ready!")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASS, // generated ethereal password
    },
  });

transporter.verify().then(() => {
    console.log("Mailing ready!")
})

module.exports = transporter;