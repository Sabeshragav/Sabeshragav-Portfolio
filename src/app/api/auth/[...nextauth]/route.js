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
        // console.log(profile);

        await connectMongo();

        // Determine the handle based on the provider
        let handle = "email/pass";
        if (account.provider === "google") {
          handle = "google";
        } else if (account.provider === "github") {
          handle = "github";
        }

        // Check if user already exists
        const userExists = await userModel.findOne({ email: profile.email });

        if (!userExists) {
          await userModel.create({
            handle: handle,
            email: profile.email,
            username: profile.name || profile.login,
            image: profile.picture,
            contactStatus: true,
          });
        } else {
          if (userExists.handle !== handle) {
            throw new Error(
              `This email is already registered with a different provider (${userExists.handle}).`
            );
          }
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in: ", error.message);

        return `/error?error=${encodeURIComponent(error.message)}`;
      }
    },
    async redirect({ url, baseUrl }) {
      // console.log("url    ", url);
      // console.log("baseurl    ", baseUrl);

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    error: "/error",
  },
});

export { handler as GET, handler as POST };
