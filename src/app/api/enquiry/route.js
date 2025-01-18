import enquiryModel from "@/model/enquiryModel";
import connectMongo from "@/utils/dbConnection";
import userModel from "@model/userModel";
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
    subject: "New Enquiry Received",
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

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    await connectMongo();

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return Response.json(
        { message: "No user found with that particular email" },
        {
          status: 404,
        }
      );
    }

    if (existingUser.contactStatus === true) {
      existingUser.contactStatus = false;
      await existingUser.save();
      await enquiryModel.create({ name, email, message });

      const handle = existingUser.handle;
      await sendNotificationEmail(name, email, message, handle);

      return Response.json({ message: "Enquiry sent successfully !!" });
    } else {
      return Response.json(
        { message: "Your message has already been sent." },
        {
          status: 403,
        }
      );
    }
  } catch (error) {
    console.error(error);

    return Response.json(error.message, {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const enquiryData = await enquiryModel.find();
    return Response.json(enquiryData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
