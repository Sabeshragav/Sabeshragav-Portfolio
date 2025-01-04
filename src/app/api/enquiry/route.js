import enquiryModel from "@/model/enquiryModel";
import connectMongo from "@/utils/dbConnection";
import userModel from "@model/userModel";

export async function GET() {
  try {
    await connectMongo();
    const enquiryData = await enquiryModel.find();
    return Response.json(enquiryData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    await connectMongo();

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      existingUser.contactStatus = false;
      await existingUser.save();
      await enquiryModel.create({ name, email, message });
      return Response.json({ message: "Enquiry sent successfully !!" });
    }
    return Response.json(
      { message: "No user found with that particular email" },
      {
        status: 404,
      }
    );
  } catch (error) {
    return Response.json(error.message, {
      status: 500,
    });
  }
}
