import connectedb from "./DataBase/connection.js";
import userRouter from "./src/Modules/user/controller/user.router.js";
import MessageRouter from "./src/Modules/Message/Controller/message.router.js";
import authRouter from "./src/Modules/auth/controller/auth.router.js";
import { GlobalErrorHandling } from "./Utilis/asyncHandeller.js";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const initapp = (app, express) => {
  app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
  app.use(express.json({}));
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", MessageRouter);
  app.use("/*", (req, res, next) => {
    res.json({ Message: "Error 404" });
  });
  connectedb();

  app.use(GlobalErrorHandling);
};

export default initapp;
