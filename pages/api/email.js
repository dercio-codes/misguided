import { format_email } from "../../lib/standard-email-html-template";
import { send_email } from "../../lib/emailer";

export default async function handler(req, res) {
  const indoor_or_outdoor = req.body["indoor_or_outdoor"];
  const name = req.body["name"];
  const event_name = req.body["event_name"];
  const num_of_people = req.body["num_of_people"];
  const image_link = req.body["image_link"];
  
  const email_html = format_email(name, indoor_or_outdoor, event_name, num_of_people , image_link);

   const headline = `Table Booking From ${name}`

  try {
    await send_email(headline, email_html);
    res.status(200).send({ message: "MAIL_SENT" });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ message: "MAIL_NOT_SENT", err: err });
  }
}