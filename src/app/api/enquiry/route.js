import enquiryModel from "@/model/enquiryModel";
import connectMongo from "@/utils/dbConnection";
import userModel from "@model/userModel";
import { sendNotificationEmail } from "@services/mail";

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
