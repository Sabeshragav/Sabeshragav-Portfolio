import userModel from "@model/userModel";
import connectMongo from "@utils/dbConnection";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      // console.log("before", session);

      await connectMongo();

      const sessionUser = await userModel.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      // console.log("after", session);
      return session;
    },
    async signIn({ profile }) {
      try {
        // console.log(profile);

        await connectMongo();

        // check if user already exists
        const userExists = await userModel.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await userModel.create({
            handle: "google",
            email: profile.email,
            username: profile.name,
            image: profile.picture,
            contactStatus: true,
          });
        }

        return true;
      } catch (error) {
        console.error("Error checking if user exists: ", error.message);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // console.log("url    ", url);
      // console.log("baseurl    ", baseUrl);
      // If `url` is from the same origin, use it; otherwise, fallback to `baseUrl`
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
