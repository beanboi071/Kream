import mongoose from "mongoose";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/models/User";
export async function PUT(req) {
  const data = await req.json();
  await mongoose.connect(process.env.DB_MONGO_URL);
  const sessionUser = await getServerSession(authOptions);
  const email = sessionUser.user.email;
  if ("name" in data) {
    const result = await User.updateOne({ email }, data);

    return Response.json(true);
  }
  return null;
}
export async function GET() {
  await mongoose.connect(process.env.DB_MONGO_URL);
  const sessionUser = await getServerSession(authOptions);
  const email = sessionUser.user.email;
  return Response.json(await User.findOne({ email }));
}
