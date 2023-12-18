import bcrypt from "bcryptjs";

export const Hash = ({ plaintext = "", salt = process.env.SALT } = {}) => {
  const HashResult = bcrypt.hashSync(plaintext, parseInt(salt));
  return HashResult;
};

export const Compare = ({ plaintext = "", HashValue } = {}) => {
  const match = bcrypt.compareSync(plaintext, HashValue);
  return match;
};
