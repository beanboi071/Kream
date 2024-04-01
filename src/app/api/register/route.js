import { User } from "@/app/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
export async function POST(req) {
  const body = await req.json();
  await mongoose.connect(process.env.DB_MONGO_URL);
  var salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);
  const createdUser = await User.create(body);
  return Response.json(createdUser);

  // console.log("ok");
  // mongoose.connect(process.env.DB_MONGO_URL);
}
