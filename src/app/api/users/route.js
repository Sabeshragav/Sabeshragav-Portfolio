import userModel from "@model/userModel";
import connectMongo from "@utils/dbConnection";

export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("id");
  try {
    await connectMongo();

    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(existingUser), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
