const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "hau0recruit0app@gmail.com",
        pass: "rdtu bola xacw ahov",
      },
      // tls: {
      //   rejectUnauthorized: false,
      // },
    });
    await transporter.sendMail({
      from: "hau0recruit0app@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log(error);
  }
};
export default sendEmail;
