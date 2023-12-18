import { Router } from "express";
import * as AuthController from "../auth.js";
import { asynchandeller } from "../../../../Utilis/asyncHandeller.js";
import validation from "../../../../MiddleWare/validation.js";
import * as validators from "../auth.validation.js";
const router = Router();

router.post(
  "/signup",
  validation(validators.SignupSchema),
  asynchandeller(AuthController.Signup)
);
router.post(
  "/login",
  validation(validators.LoginSchema),
  asynchandeller(AuthController.Signin)
);

router.get("/ConfirmEmail/:token", asynchandeller(AuthController.ConfirmEmail));
router.get(
  "/NewConfirmEmail/:token",
  asynchandeller(AuthController.newconfireEmail)
);

export default router;
