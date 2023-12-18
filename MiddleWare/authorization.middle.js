import usermodel from "../DataBase/usermodel.js";
import { VerifyToken } from "../Utilis/GenerateToken.js";

export const auth = async (req, res, next) => {
  
    const { authorization } = req.headers;
    if (!authorization?.startsWith(process.env.BEARER_KEY)) {
      return res.json({ Message: "authorization is required" });
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
      return res.json({ Message: "Token is required" });
    }
    const decoded = VerifyToken({ token });
    
    if (!decoded?.id) {
      res.json({ Message: "In-valid User id" });
    }
    const authUser = await usermodel
      .findById(decoded.id)
      .select("username email status role");
    if (!authUser) {
      return res.json({ Message: "Not registered User" });
    }
    req.user = authUser;
    return next();
  
};
