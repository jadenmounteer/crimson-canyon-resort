const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
require("dotenv").config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

const transportInfo = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
};

exports.sendEmailNotification = functions.firestore
  .document("posts/{docId}")
  .onCreate((snap, context) => {
    const notification = snap.data();

    let authData = nodemailer.createTransport(transportInfo);

    authData
      .sendMail({
        from: SENDER_EMAIL,
        to: "mounteerjaden@gmail.com", // notification is the firebase document. So I can have an array of emails to send to in the announcement document and loop through them and call send mail on each one. For example: notification.emails.forEach(email => sendMail(email))
        subject: "Hello from Crimson Canyon Resort", // notification.subject
        html: `<h1>${notification.createdByUserName} just posted an announcement</h1></br><p>${notification.message}</p></br>- <a href="https://crimson-canyon-resort-prod.web.app/">Crimson Canyon Resort</a>`,
      })
      .then((res) => {
        console.log("Successfully sent email.");
      })
      .catch((err) => {
        console.log(err);
      });
  });

// TODO send email when email is added approved to create account without a request being sent
exports.sendEmailApprovalNotification = functions.firestore
  .document("accessRequests/{docId}")
  .onCreate((snap, context) => {
    const notification = snap.data();

    if (notification.approved) {
      let authData = nodemailer.createTransport(transportInfo);

      authData
        .sendMail({
          from: SENDER_EMAIL,
          to: `${notification.email}`,
          subject: "Your email has been approved!", // notification.subject
          html: `<p>Your email, ${notification.email}, has just been approved to create an account at Crimson Canyon Resort.</br><a href="https://crimson-canyon-resort-prod.web.app/"><br/>Create an account here</a>`,
        })
        .then((res) => {
          console.log("Successfully sent email.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

exports.sendEmailApprovalNotification2 = functions.firestore
  .document("accessRequests/{docId}")
  .onUpdate((snap, context) => {
    const notification = snap.data();

    if (notification.approved) {
      let authData = nodemailer.createTransport(transportInfo);

      authData
        .sendMail({
          from: SENDER_EMAIL,
          to: `${notification.email}`,
          subject: "Your email has been approved!", // notification.subject
          html: `<p>Your email, ${notification.email}, has just been approved to create an account at Crimson Canyon Resort.</br><a href="https://crimson-canyon-resort-prod.web.app/"><br/>Create an account here</a>`,
        })
        .then((res) => {
          console.log("Successfully sent email.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
