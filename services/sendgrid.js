import { SENDGRID_API_KEY } from "constants/shop.js";
const sgMail = require("@sendgrid/mail");

export const sendEmail = (data) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  try {
    const sgMail = require("@sendgrid/mail");
    return sgMail.send(data);
  } catch (e) {
    console.log("There was an error sending the email", e);
  }
};
