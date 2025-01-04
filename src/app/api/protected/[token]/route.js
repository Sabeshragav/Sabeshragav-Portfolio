import userModel from "@model/userModel";
import connectMongo from "@utils/dbConnection";
import jwt from "jsonwebtoken";

export async function GET(req, context) {
  try {
    const { params } = context;
    const { token } = await params;

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return new Response(
        JSON.stringify({
          message: "You are not allowed to access this resource.",
        }),
        {
          status: 403,
        }
      );
    }

    await connectMongo();

    const existingUser = await userModel
      .findById(decoded.userId)
      .select("-password");

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
