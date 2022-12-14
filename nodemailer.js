"use strict";
require('dotenv').config()
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(email) {
  // // Generate test SMTP service account from ethereal.email
  // // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PWD
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL, // sender address
    to: email, // list of receivers
    subject: "Registro de bienestar ✔", // Subject line
    text: "Registro a la base de datos de bienestar", // plain text body
    html: "<b>Registro exitoso usando Node.js</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}



// sendMail('testbienbd1@gmail.com').then(rta=>{
//     console.log('enviando');
// }).catch(console.error);
 module.exports = sendMail