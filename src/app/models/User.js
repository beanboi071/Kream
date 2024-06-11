import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass?.length || pass.length < 8) {
          new Error("Password must be atleast 8 characters.");
          return false;
        }
      },
    },
    phoneNo: { type: String },
    country: { type: String },
    city: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const User = models?.User || model("User", UserSchema);
