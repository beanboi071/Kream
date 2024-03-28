import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema(
  {
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
  },
  { timestamps: true }
);
UserSchema.post("validate", function (user) {
  var salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
});
export const User = models?.User || model("User", UserSchema);
