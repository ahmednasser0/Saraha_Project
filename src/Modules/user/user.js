import usermodel from "../../../DataBase/usermodel.js";
import Cloudinary from "../../../Utilis/Cloudinary.js";
import { Compare, Hash } from "../../../Utilis/HashandCompare.js";
import {
  filevalidation,
  uploadfile,
} from "../../../Utilis/MulterCloudinary.js";

export const getuser = async (req, res, next) => {
  const user = await usermodel.find();
  res.json({ Message: "Done", user });
};

export const profile = async (req, res, next) => {
  const user = await usermodel
    .findById(req.user._id)
    .select("-password -createdAt -updatedAt -__v");
  return res.json({ Message: "Done", user });
};

export const UpdatePassword = async (req, res, next) => {
  const { oldpassword, newpassword } = req.body;
  const user = await usermodel.findById(req.user._id);
  const match = Compare({ plaintext: oldpassword, HashValue: user.password });
  if (!match) {
    return next(new Error("Password Didnt match"));
  }
  const hashpassword = Hash({ plaintext: newpassword });
  user.password = hashpassword;
  await user.save();
  res.status(200).json({ Message: "Done" });
};

export const shareProfile = async (req, res, next) => {
  const user = await usermodel
    .findById(req.params.id)
    .select("username email role status");
  if (!user) {
    return next(new Error("In-valid user", { cause: 404 }));
  }
  res.status(200).json({ Message: "Done", user });
};

export const deleteUser = async (req, res, next) => {
  const user = await usermodel.findByIdAndDelete(req.user._id);
  return res.status(200).json({ Message: "Done", user });
};

export const UpdateUser = async (req, res, next) => {
  const user = await usermodel.findByIdAndUpdate(
    req.user._id,
    {
      username: req.body.username,
      email: req.body.email,
      address: req.body.email,
    },
    { new: true }
  );
  return res.status(200).json({ Message: "Done", user });
};

// export const profilepic = async (req, res, next) => {
//   if (!req.file) {
//     return next(new Error("in-valid format", { cause: 400 }));
//   }
//   const user = await usermodel.findByIdAndUpdate(
//     req.user._id,
//     { profilepic: req.file.dest },
//     { new: true }
//   );
//   res.json({ Message: "Done", user });
// };

export const profilepic = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("File is required", { cause: 400 }));
  }
  const { secure_url, public_id } = await Cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `user/${req.user._id}/profile`,
    }
  );
  const user = await usermodel.findByIdAndUpdate(
    req.user._id,
    { profilePic: secure_url, Picid: public_id },
    { new: false }
  );
  await Cloudinary.uploader.destroy(user.Picid);
  res.json({ Message: "Done", user });
};

export const profileCovpic = async (req, res, next) => {
  if (!req.files?.length) {
    return next(new Error("file is required", { cause: 400 }));
  }
  const coverpic = [];
  for (const file of req.files) {
    const { secure_url, public_id } = await Cloudinary.uploader.upload(
      file.path,
      { folder: `user/${req.user._id}/profile/cover` }
    );
    coverpic.push({ secure_url, public_id });
  }

  const user = await usermodel.findByIdAndUpdate(
    req.user._id,
    { coverpic },
    { new: true }
  );
  res.json({ Message: "Done", user });
};

export const multerprofilepic = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("File is required", { cause: 400 }));
  }
  const user = await usermodel.findByIdAndUpdate(
    req.user._id,
    { profilePic: req.file.dest },
    { new: true }
  );
  res.status(200).json({ Message: "Done", user });
};
