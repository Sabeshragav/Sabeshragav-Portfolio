import articleModel from "@/model/articleModel";
import connectMongo from "@/utils/dbConnection";

export async function GET(req) {
  const searchQuery = req.nextUrl.searchParams.get("search");

  try {
    await connectMongo();

    let articleData;

    if (searchQuery) {
      articleData = await articleModel.find({
        $or: [
          { title: new RegExp(searchQuery, "i") },
          { description: new RegExp(searchQuery, "i") },
          { technologies: { $regex: searchQuery, $options: "i" } },
        ],
      });

      return articleData ? Response.json(articleData) : [];
    } else {
      articleData = await articleModel.find({});
      return Response.json(articleData);
    }
  } catch (error) {
    console.log(error);
    return Response.json({ message: error.message });
  }
}
