import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema(
  {
    Message: {
      type: String,
      required: true,
    },
    receiver_ID: {
      type: Types.ObjectId,
      ref: "userinfo",
      required:true
    },
  },
  { timestamps: true }
);

const messagemodel = model("messageinfo", messageSchema);

export default messagemodel;
