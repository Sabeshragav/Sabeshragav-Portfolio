import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", { httpOnly: true, maxAge: 0, path: "/" });

    return response;
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}
