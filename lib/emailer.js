import nodemailer from "nodemailer";

export const send_email = async (title, message_html) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-2.amazonaws.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "AKIAYZ47N4OAFRO6ZUAS", // generated ethereal user
      pass: "BGBrFd9Q7JT6WQZpt+ANYnl6lgvmaaaCGdw2GwthC5QY", // generated ethereal password
    },
  });

  // send mail with defined transport object
  return await transporter.sendMail({
    from: "Misguided Table Booking <12polluxx@gmail.com>", // sender address
    to: "12polluxx@gmail.com", // list of receivers
    subject: title, // Subject line
    html: message_html, // html body
  });
};
