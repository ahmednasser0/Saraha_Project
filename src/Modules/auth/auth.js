import { Compare, Hash } from "../../../Utilis/HashandCompare.js";
import usermodel from "../../../DataBase/usermodel.js";
import { GenerateToken, VerifyToken } from "../../../Utilis/GenerateToken.js";
import sendEmail from "../../../Utilis/sendEmail.js";

export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (user) {
    return next(new Error("This Email is Exist"), { cause: 409 });
  }

  const token = GenerateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN,
    expiresIn: 60 * 60,
  });
  const newtoken = GenerateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN,
    expiresIn: 60 * 60 * 24 * 30,
  });
  const refreshlink = `${req.protocol}://${req.headers.host}/auth/NewConfirmEmail/${newtoken}`;
  const link = `${req.protocol}://${req.headers.host}/auth/ConfirmEmail/${token}`;
  const html = `<a href="${link}">Click Here to Confirm Your Email</a>
  <br><br>
  <a href="${refreshlink}">Request New Email</a>
  `;
  const info = await sendEmail({
    to: email,
    subject: "Confirm Email",
    html: html,
  });
  if (!info) {
    return next(new Error("In-Valid Email", { cause: 400 }));
  }
  const HashValue = Hash({ plaintext: password });
  const CreateUser = await usermodel.create({
    username,
    email,
    password: HashValue,
  });
  return res.status(201).json({ Message: "Done", user: CreateUser._id });
};

export const Signin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });
  if (!user) {
    return next(new Error("This Email is not Exist"));
  }
  if (!user.confirmationEmail == true) {
    return next(new Error("Please Confirm Your Email", { cause: 404 }));
  }

  const match = Compare({ plaintext: password, HashValue: user.password });
  if (!match) {
    return next(new Error("In-Valid User"));
  }
  const token = GenerateToken({
    payload: { id: user._id, isloggedin: true, role: user.role },
  });
  user.status = "online";
  await user.save();
  return res.status(200).json({ Message: "Done", token });
};

export const ConfirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const { email } = VerifyToken({ token, signature: process.env.EMAIL_TOKEN });
  const user = await usermodel.updateOne(
    { email },
    { confirmationEmail: true }
  );
  return user.modifiedCount
    ? res.status(200).redirect("https://mail.google.com/mail/u/1/#inbox")
    : res.status(404).send("Not Registered Account");
};

export const newconfireEmail = async (req, res, next) => {
  const { token } = req.params;
  const { email } = VerifyToken({
    token,
    signature: process.env.EMAIL_TOKEN,
  });
  const refreshtoken = GenerateToken({
    payload: { email },
    signature: process.env.EMAIL_TOKEN,
    expiresIn: 60 * 2,
  });
  const link = `${req.protocol}://${req.headers.host}/auth/ConfirmEmail/${refreshtoken}`;
  const refreshlink = `${req.protocol}://${req.headers.host}/auth/NewConfirmEmail/${token}`;
  const html = `<a href="${link}">Click Here to Confirm Your Email</a>
  <br><br>
  <a href="${refreshlink}">Request New Email</a>
  `;
  const info = await sendEmail({
    to: email,
    subject: "Confirm Email",
    html: html,
  });
  if (!info) {
    return next(new Error("Regected Email", { cause: 404 }));
  }
  return res.status(200).send("<p>Please check you email</p>");
};
