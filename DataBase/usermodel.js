import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    confirmationEmail: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "male", "female"],
    },
    age: Number,
    profilePic: {
      type: String,
    },
    coverpic: [],
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    status: {
      type: String,
      default: "offline",
      enum: ["online", "offline", "blocked"],
    },
    Picid: String,
  },
  { timestamps: true }
);

const usermodel = model("userinfo", userSchema);

export default usermodel;
