import nodemailer from "nodemailer";

export const send_email = async (title, message_html) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "AKIAYZ47N4OAD6PJ2I7K", // generated ethereal user
      pass: "BD4gVmfWfmMZpOhSDo6tfLrZ30nvSRxF/8WrJLiRiKDJ", // generated ethereal password
    },
  });

  // send mail with defined transport object
  return await transporter.sendMail({
    from: "Misguided Emailer <12polluxx@gmail.com>", // sender address
    to: "12polluxx@gmail.com", // list of receivers
    subject: title, // Subject line
    html: message_html, // html body
  });
};