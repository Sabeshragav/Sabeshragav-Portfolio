import articleModel from "@/model/articleModel";
import connectMongo from "@/utils/dbConnection";

export async function GET(req, context) {
  try {
    const { params } = context;

    const { articleId } = await params;

    await connectMongo();

    const article = await articleModel.findOne({ _id: articleId });

    return Response.json(article);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
