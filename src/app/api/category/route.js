import { Category } from "@/app/models/Category";
import mongoose from "mongoose";
export async function POST(req) {
  const data = await req.json();
  const categoryData = { name: data.name };
  await mongoose.connect(process.env.DB_MONGO_URL);

  const result = await Category.create(categoryData);
  return Response.json(result);
}
export async function GET() {
  await mongoose.connect(process.env.DB_MONGO_URL);

  const categories = await Category.find();
  return Response.json(categories);
}
export async function PUT(req) {
  const { name, _id } = await req.json();
  await mongoose.connect(process.env.DB_MONGO_URL);
  console.log(_id, name);
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
}
export async function DELETE(req) {
  mongoose.connect(process.env.DB_MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  await Category.deleteOne({ _id });

  return Response.json(true);
}
