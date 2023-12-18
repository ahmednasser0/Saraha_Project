import jwt from "jsonwebtoken";

export const GenerateToken = ({
  payload = "",
  signature = process.env.SIGNATURE,
  expiresIn = 30 * 60 * 60 * 24,
} = {}) => {
  const token = jwt.sign(payload, signature, {
    expiresIn: parseInt(expiresIn),
  });
  return token;
};

export const VerifyToken = ({
  token,
  signature = process.env.SIGNATURE,
} = {}) => {
  const Decode = jwt.verify(token, signature);
  return Decode;
};
