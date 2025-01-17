import userModel from "@model/userModel";
import connectMongo from "@utils/dbConnection";
import bcryptjs from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    // console.log({ name, email, password });

    await connectMongo();
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return Response.json("Email already exists. Try Logging In.", {
        status: 404,
      });
    }

    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await userModel.create({
      username: name,
      email,
      password: hashedPassword,
      image: "/icons/profile.png",
      contactStatus: true,
      handle: "email/pass",
    });

    return Response.json("User registered", {
      status: 201, //Created or added
    });
  } catch (error) {
    console.error(error.message);

    return Response.json(error.message, {
      status: 500,
    });
  }
}
