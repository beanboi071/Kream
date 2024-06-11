import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";

export async function POST(req) {
  mongoose.connect(process.env.DB_MONGO_URL);
  const data = await req.json();

  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}

export async function PUT(req) {
  mongoose.connect(process.env.DB_MONGO_URL);

  const { _id, ...data } = await req.json();
  await MenuItem.findByIdAndUpdate(_id, data);
}

export async function GET() {
  mongoose.connect(process.env.DB_MONGO_URL);
  return Response.json(await MenuItem.find());
}

export async function DELETE(req) {
  mongoose.connect(process.env.DB_MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  await MenuItem.deleteOne({ _id });
}
