const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const { co } = require("@fullcalendar/core/internal-common");
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

const adminEmails = ["dadasaurusrex12@gmail.com"];

// const adminEmails = ["jrakisits@gmail.com", "addiesmith76@yahoo.com"];

exports.sendEmailNotification = functions.firestore
  .document("posts/{docId}")
  .onCreate((snap, context) => {
    const notification = snap.data();

    if (notification.emailsToNotify) {
      let emailAddresses = [];
      notification.emailsToNotify.forEach((emailAddress) => {
        emailAddresses.push(emailAddress);
      });

      let emailBody = createAnnouncementEmailBody(notification);

      authData
        .sendMail({
          from: SENDER_EMAIL,
          to: `${emailAddresses.join(", ")}`, // notification is the firebase document. So I can have an array of emails to send to in the announcement document and loop through them and call send mail on each one. For example: notification.emails.forEach(email => sendMail(email))
          subject: `${notification.title}`, // notification.subject
          html: `${emailBody}`,
        })
        .then((res) => {
          console.log("Successfully sent email.");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

function createAnnouncementEmailBody(notification) {
  let emailBody = `<p>${notification.message}</p></br>`;
  if (notification.fileURLs) {
    notification.fileURLs.forEach((fileURL) => {
      emailBody += `<img src="${fileURL}" style="width: 300px; border-radius: 4px;"><br/>`;
    });
  }

  if (notification.videoURLs) {
    notification.videoURLs.forEach((videoURL) => {
      emailBody += `<video controls style="width: 300px; border-radius: 4px;" src="${videoURL}">
        There was a problem displaying this video. Please reach out to Jaden
          for help.
      </video><br/>`;
    });
  }

  emailBody += `<br/>- ${notification.createdByUserName}`;

  emailBody += `<br/><a href="https://crimsoncanyonresort.us/">Crimson Canyon Resort</a>`;

  return emailBody;
}

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
          html: `<p>Your email, ${notification.email}, has just been approved to create an account at Crimson Canyon Resort.</br><a href="https://crimsoncanyonresort.us/"><br/>Create an account here</a>`,
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
          html: `<p>Your email, ${notification.email}, has just been approved to create an account at Crimson Canyon Resort.</br><a href="https://crimsoncanyonresort.us/"><br/>Create an account here</a>`,
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
           <br/><br/><a href="https://crimsoncanyonresort.us/">View their reservation here</a>`,
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
           <br/><br/><a href="https://crimsoncanyonresort.us/">View their reservation here</a>`,
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
           <br/><br/><a href="https://crimsoncanyonresort.us/">View more reservations here</a>`,
      })
      .then((res) => {
        console.log("Successfully sent email.");
      })
      .catch((err) => {
        console.log(err);
      });
  });

// Email sent when someone sends a chat message
exports.sendEmailChatMessage = functions.firestore
  .document("reservation-chat-messages/{docId}")
  .onUpdate((snap, context) => {
    console.log("Sending email for chat message.");
    const notification = snap.data();

    let emailAddresses = [];

    // If an admin sent the email, send it to the user who created the reservation.
    // Otherwise, send it to the admins.

    console.log("notification.userEmail: ", notification.userEmail);
    if (adminEmails.includes(notification.userEmail)) {
      console.log("Sending to user.");
      emailAddresses.push(notification.emailOfUserWhoCreatedReservation);
    } else {
      console.log("Sending to admins.");
      adminEmails.forEach((emailAddress) => {
        emailAddresses.push(emailAddress);
      });
    }

    console.log("emailAddresses: ", emailAddresses);

    authData
      .sendMail({
        from: SENDER_EMAIL,
        to: `${emailAddresses.join(", ")}`,
        subject: `${notification.userName} just messaged you about a reservation!`, // notification.subject
        html: `<p>${notification.userName} just sent the following message regarding a reservation:</br>
          "${notification.message}"
           <br/><br/><a href="https://crimsoncanyonresort.us/">Crimson Canyon Resort</a>`,
      })
      .then((res) => {
        console.log("Successfully sent email.");
      })
      .catch((err) => {
        console.log(err);
      });
  });
