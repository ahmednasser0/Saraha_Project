import { Router } from "express";
import * as userController from "../user.js";
import { auth } from "../../../../MiddleWare/authorization.middle.js";
import { asynchandeller } from "../../../../Utilis/asyncHandeller.js";
import validation from "../../../../MiddleWare/validation.js";
import * as validators from "../user.validation.js";
import {
  filevalidation,
  uploadfile,
} from "../../../../Utilis/MulterCloudinary.js";

const router = Router();

router.get("/getuser", asynchandeller(userController.getuser));
router.get(
  "/profile",
  asynchandeller(auth),
  asynchandeller(userController.profile)
);
router.put(
  "/updatepassword",
  auth,
  validation(validators.uservalidation),
  asynchandeller(userController.UpdatePassword)
);
router.get(
  "/:id/profile",
  validation(validators.shareProfile),
  asynchandeller(userController.shareProfile)
);

router.delete("/deleteuser", auth, asynchandeller(userController.deleteUser));
router.put("/updateuser", auth, asynchandeller(userController.UpdateUser));

router.patch(
  "/profilepic",
  auth,
  uploadfile(filevalidation.image).single("image"),
  asynchandeller(userController.profilepic)
);
router.patch(
  "/profilecovpic",
  uploadfile(filevalidation.image).array("image"),
  auth,
  asynchandeller(userController.profileCovpic)
);

router.patch(
  "/multerprofilepic",
  auth,
  uploadfile("user/profile", filevalidation.image).single("image"),
  asynchandeller(userController.multerprofilepic)
);

export default router;
