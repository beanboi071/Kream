import mongoose from "mongoose";

import { User } from "@/app/models/User";
export async function POST(req) {
  console.log("api called");

  const img = await req.formData();
  console.log(img);
  return Response.json(true);
}
