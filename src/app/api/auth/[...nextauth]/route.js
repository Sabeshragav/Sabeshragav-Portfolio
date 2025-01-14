import userModel from "@model/userModel";
import connectMongo from "@utils/dbConnection";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
    async signIn({ profile, account }) {
      try {
        // console.log(account);
        console.log(profile);

        await connectMongo();

        // Determine the handle based on the provider
        let handle = "email/pass"; // Default
        if (account.provider === "google") {
          handle = "google";
        } else if (account.provider === "github") {
          handle = "github";
        }

        // Check if user already exists
        const userExists = await userModel.findOne({ email: profile.email });

        // If not, create a new document and save user in MongoDB
        if (!userExists) {
          await userModel.create({
            handle: handle,
            email: profile.email,
            username: profile.name || profile.login,
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
