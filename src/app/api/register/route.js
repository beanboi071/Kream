import { User } from "@/app/models/User";
import mongoose from "mongoose";

export async function POST(req){
    const body = await req.json();
    await mongoose.connect(process.env.DB_MONGO_URL);
    const createdUser = await User.create(body);
    return Response.json(createdUser);

    
    // console.log("ok");
    // mongoose.connect(process.env.DB_MONGO_URL);
  
}