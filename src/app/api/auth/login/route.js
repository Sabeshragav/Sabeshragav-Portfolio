import { NextResponse } from "next/server";
import userModel from "@model/userModel";
import connectMongo from "@utils/dbConnection";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    // console.log(email, password);

    await connectMongo();

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return NextResponse.json("No email found. Try Signing Up.", {
        status: 404,
      });
    }

    if (existingUser.handle !== "email/pass") {
      return NextResponse.json(
        `The given email is registered using ${
          existingUser.handle === "google" ? "Google" : "Github"
        }`,
        {
          status: 401, //unauthorized
        }
      );
    } else {
      const validPassword = await bcryptjs.compare(
        password,
        existingUser.password
      );

      if (!validPassword) {
        return NextResponse.json("Incorrect password", {
          status: 401,
        });
      }

      const tokenData = {
        name: existingUser.email,
        userId: existingUser._id,
      };

      const token = jwt.sign(tokenData, process.env.JWT_KEY, {
        expiresIn: "1d",
      });

      // return new NextResponse(JSON.stringify(token), {
      //   status: 200,
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax;`,
      //   },
      // });

      const response = NextResponse.json(token);
      response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 86400,
        path: "/",
      });

      return response;
    }
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}
