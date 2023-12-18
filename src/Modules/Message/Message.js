import messagemodel from "../../../DataBase/MessageModel.js";
import usermodel from "../../../DataBase/usermodel.js";

export const GetMessage = async (req, res, next) => {
  const messageList = await messagemodel.find({ receiver_ID: req.user._id });
  res.json({ Message: "Done", messageList });
};

export const SendMessage = async (req, res, next) => {
  const { receiver_ID } = req.params;
  const { Message } = req.body;

  const user = await usermodel.findById(receiver_ID);

  if (!user) {
    return next(new Error("In-valid User", { cause: 404 }));
  } else {
    const createdMessage = await messagemodel.create({ receiver_ID, Message });
    return res.status(201).json({ Message: "Done", createdMessage });
  }
};

export const DeleteMessage = async (req, res, next) => {
  const { id } = req.params;
  const message = await messagemodel.deleteOne({
    _id: id,
    receiver_ID: req.user._id,
  });
  return message.deletedCount
    ? res.status(200).json({ Message: "Done" })
    : next(new Error("In_valid Message or Owner", { cause: 404 }));
};
