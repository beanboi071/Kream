import { User } from "@/app/models/User";
import { ok } from "assert";
import mongoose from "mongoose";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/libs/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          console.log(credentials);
          const email = credentials?.email;
          const password = credentials?.password;

          await mongoose.connect(process.env.DB_MONGO_URL);

          const user = await User.findOne({ email });
          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordOk = bcrypt.compareSync(password, user.password);
          if (passwordOk) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
