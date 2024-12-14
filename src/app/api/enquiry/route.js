import enquiryModel from "@/model/enquiryModel";
import connectMongo from "@/utils/dbConnection";

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
    const enquiryData = await req.json();
    await connectMongo();
    await enquiryModel.create(enquiryData);
    return Response.json({ message: "Enquiry sent successfully !!" });
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
