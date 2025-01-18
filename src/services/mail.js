import nodemailer from "nodemailer";

export async function sendNotificationEmail(name, email, message, handle) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "sabeshragav289@gmail.com",
    subject: "Sabeshragav's Portfolio Enquiry",
    html: `
        <h1>New Enquiry</h1>
        <p><strong>Name :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Handle :</strong> ${handle}</p>
        <p><strong>Message :</strong> ${message}</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
}
