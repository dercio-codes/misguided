import { format_email } from "../../lib/standard-email-html-template";
import { send_email } from "../../lib/emailer";

export default async function handler(req, res) {
  const email = req.body["email"];
  const name = req.body["name"];
  const cell = req.body["cell"];
  const message = req.body["message"];

  const email_html = format_email(name, email, cell, message);

   const headline = `Contact Request from ${name}`

  try {
    await send_email(headline, email_html);
    res.status(200).send({ message: "MAIL_SENT" });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ message: "MAIL_NOT_SENT", err: err });
  }
}