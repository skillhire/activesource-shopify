import { sendEmail } from "services/sendgrid";
import { SENDGRID_TO_EMAIL, SENDGRID_FROM_EMAIL } from "constants/shop.js";

export default async (req, res) => {
  const { name, email, companyName, product } = req.body;

  let errors = null;
  switch (true) {
    case !name:
      errors = { ...errors, name: "Name is required." };
    case !companyName:
      errors = { ...errors, company: "Company Name is required." };
    case !product:
      errors = { ...errors, product: "Product is required." };
    case !email:
      errors = { ...errors, email: "Email is required." };
    case !/^\S+@\S+\.\S+$/.test(email):
      errors = { ...errors, email: "Email is not valid." };
  }

  if (errors !== null) {
    return res.status(400).json({ message: "Your information is not valid.", errors });
  }

  const msg = `Name: ${name}\r\n Email: ${email}\r\n Company: ${companyName}\r\n Product: ${product}`;
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
};
