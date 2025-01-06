import { NextResponse } from "next/server";
import userModel from "@model/userModel";
import connectMongo from "@utils/dbConnection";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const cookies = req.cookies.get("token");
    if (!cookies) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const token = cookies.value;

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded);
    await connectMongo();

    const existingUser = await userModel
      .findById(decoded.userId)
      .select("-password");

    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ user: existingUser }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
