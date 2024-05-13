import { sendEmail } from "services/sendgrid"
import { SENDGRID_TO_EMAIL, SENDGRID_FROM_EMAIL } from "constants/shop.js"

export default async (req, res) => {
  const {
    name,
    email,
    companyName,
  } = req.body;

  if (!name || !email || !companyName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const msg = `Name: ${name}\r\n Email: ${email}\r\n Company: ${companyName}`;
  const data = {
    to: SENDGRID_TO_EMAIL,
    from: SENDGRID_FROM_EMAIL,
    subject: `${name} sent you a message from Active Source LAB Contact Form`,
    text: msg,
    html: msg.replace(/\r\n/g, "<br>"),
  };
  try {
    await sendEmail(data);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: `There was an error sending your message. ${err}` });
  }
}