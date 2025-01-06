import { NextResponse } from "next/server";
import articleModel from "@/model/articleModel";
import connectMongo from "@/utils/dbConnection";

export async function GET(req, context) {
  try {
    const { params } = context;

    const { articleId } = await params;

    await connectMongo();

    const article = await articleModel.findOne({ _id: articleId });
    // console.log(article);

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
