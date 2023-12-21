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

const authData = nodemailer.createTransport(transportInfo);

const testAdminEmails = [
  "mounteerjaden@gmail.com",
  "dadasaurusrex12@gmail.com",
];

const adminEmails = ["jrakisits@gmail.com", "addiesmith76@yahoo.com"];

exports.sendEmailNotification = functions.firestore
  .document("posts/{docId}")
  .onCreate((snap, context) => {
    const notification = snap.data();

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

exports.sendEmailReservationCreated = functions.firestore
  .document("reservations/{docId}")
  .onCreate((snap, context) => {
    const notification = snap.data();

    let emailAddresses = [];
    adminEmails.forEach((emailAddress) => {
      emailAddresses.push(emailAddress);
    });

    authData
      .sendMail({
        from: SENDER_EMAIL,
        to: `${emailAddresses.join(", ")}`,
        subject: `New Reservation Created by ${notification.familyName}!`, // notification.subject
        html: `<p>A new reservation has been booked by ${notification.familyName} at Crimson Canyon Resort.</br>
          They are staying ${notification.arrivalDate.month}/${notification.arrivalDate.day}/${notification.arrivalDate.year} through ${notification.departureDate.month}/${notification.departureDate.day}/${notification.departureDate.year}.
          <br/> Their plans for food are "${notification.plansForFood}".
          <br/> They will be bringing ${notification.numberOfVehicles} vehicles.
          <br/> Additional info: ${notification.additionalInfo}
           <br/><br/><a href="https://crimson-canyon-resort-prod.web.app/">View their reservation here</a>`,
      })
      .then((res) => {
        console.log("Successfully sent email.");
      })
      .catch((err) => {
        console.log(err);
      });
  });

exports.sendEmailReservationUpdated = functions.firestore
  .document("reservations/{docId}")
  .onUpdate((snap, context) => {
    const notification = snap.data();

    let emailAddresses = [];
    adminEmails.forEach((emailAddress) => {
      emailAddresses.push(emailAddress);
    });

    authData
      .sendMail({
        from: SENDER_EMAIL,
        to: `${emailAddresses.join(", ")}`,
        subject: `Reservation Updated by ${notification.familyName}!`, // notification.subject
        html: `<p>A reservation has been updated by ${notification.familyName} at Crimson Canyon Resort.</br>
          They are staying ${notification.arrivalDate.month}/${notification.arrivalDate.day}/${notification.arrivalDate.year} through ${notification.departureDate.month}/${notification.departureDate.day}/${notification.departureDate.year}.
          <br/> Their plans for food are "${notification.plansForFood}".
          <br/> They will be bringing ${notification.numberOfVehicles} vehicles.
          <br/> Additional info: ${notification.additionalInfo}
           <br/><br/><a href="https://crimson-canyon-resort-prod.web.app/">View their reservation here</a>`,
      })
      .then((res) => {
        console.log("Successfully sent email.");
      })
      .catch((err) => {
        console.log(err);
      });
  });

exports.sendEmailReservationDeleted = functions.firestore
  .document("reservations/{docId}")
  .onDelete((snap, context) => {
    const notification = snap.data();

    let emailAddresses = [];
    adminEmails.forEach((emailAddress) => {
      emailAddresses.push(emailAddress);
    });

    authData
      .sendMail({
        from: SENDER_EMAIL,
        to: `${emailAddresses.join(", ")}`,
        subject: `Reservation Canceled by ${notification.familyName}!`, // notification.subject
        html: `<p>The following reservation reservation has been cancelled by ${notification.familyName} at Crimson Canyon Resort.</br>
          They were staying ${notification.arrivalDate.month}/${notification.arrivalDate.day}/${notification.arrivalDate.year} through ${notification.departureDate.month}/${notification.departureDate.day}/${notification.departureDate.year}.
          <br/> Their plans for food were "${notification.plansForFood}".
          <br/> They were bringing ${notification.numberOfVehicles} vehicles.
          <br/> Additional info: ${notification.additionalInfo}
           <br/><br/><a href="https://crimson-canyon-resort-prod.web.app/">View more reservations here</a>`,
      })
      .then((res) => {
        console.log("Successfully sent email.");
      })
      .catch((err) => {
        console.log(err);
      });
  });
