import mongoose from "mongoose";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";
export async function PUT(req) {
  const data = await req.json();
  await mongoose.connect(process.env.DB_MONGO_URL);
  const sessionUser = await getServerSession(authOptions);
  const email = sessionUser.user.email;
  console.log({ sessionUser, data });
  if ("name" in data) {
    const result = await User.updateOne({ email }, { name: data.name });
    console.log(result);
    return Response.json(true);
  }
  return null;
}
