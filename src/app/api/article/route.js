import { NextResponse } from "next/server";
import articleModel from "@/model/articleModel";
import connectMongo from "@/utils/dbConnection";

export async function POST(req) {
  try {
    const techData = await req.json();
    // console.log("line8", techData);

    await connectMongo();

    const matchedArticles = await articleModel
      .find({ technologies: { $in: techData } })
      .select("_id")
      .sort({ order: -1 });

    const ids = matchedArticles.slice(0, 4).map((article) => article._id);

    if (ids.length > 0) {
      return NextResponse.json(ids, { status: 200 });
    }

    return NextResponse.json({
      message: "No matching articles found",
      status: 204,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
