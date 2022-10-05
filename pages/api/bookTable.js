import { send_email } from "../../lib/emailer";
import { format_booking_email } from "../../lib/booking-html-template";

export default async function handler(req, res) {
//   const indoor_or_outdoor = req.body["indoor_or_outdoor"];
//   const name = req.body["name"];
//   const event_name = req.body["event_name"];
//   const num_of_people = req.body["num_of_people"];
//   const image_link = req.body["image_link"];
    const name = req.body["name"]
    const tel = req.body["tel"]
    const requested_artist = req.body["requested_artist"]
    const event_date = req.body["event_date"]
    const event_name = req.body["event_name"]
    const event_location = req.body["event_location"]
    const hospitality = req.body["hospitality"]
    const email = req.body["email"]
    const set_time = req.body["set_time"]
    const duration = req.body["duration"]
    const budget = req.body["budget"]

  const formattedData = {
    name,
    tel,
    requested_artist,
    event_date,
    event_name,
    event_location,
    hospitality,
    email,
    set_time,
    duration,
    budget
  }
  
  const email_html = format_booking_email(formattedData);

   const headline = `Artist Booking From ${name}`

  try {
    await send_email(headline, email_html);
    res.status(200).send({ message: "MAIL_SENT" });
  } catch (err) {
    console.log(err.message);
    res.status(200).send({ message: "MAIL_NOT_SENT", err: err });
  }
}