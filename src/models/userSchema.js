import mongoose from "mongoose";

const schemaOptions = {
  versionKey: false,
  timestamps: true,
};
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  schemaOptions
);

const User = mongoose.model("User", userSchema);
export default User;
