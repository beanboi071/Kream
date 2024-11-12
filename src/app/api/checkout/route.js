import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import { MenuItem } from "../../models/MenuItem";
import { Order } from "../../models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try{
    mongoose.connect(process.env.DB_MONGO_URL);

    const { cartProducts, address } = await req.json();
    console.log(cartProducts);
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
  
    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false,
    });
    return new Response("Ok");

  }catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
  
}
