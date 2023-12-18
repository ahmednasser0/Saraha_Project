import { Router } from "express";
import * as messageRouter from "../Message.js";
import { asynchandeller } from "../../../../Utilis/asyncHandeller.js";
import { auth } from "../../../../MiddleWare/authorization.middle.js";
import validation from "../../../../MiddleWare/validation.js";
import *as validators from '../Message.validation.js'
const router = Router();

router.post("/:receiver_ID",validation(validators.SendMessage),asynchandeller(messageRouter.SendMessage))
router.get("/GetMessage" , auth , asynchandeller(messageRouter.GetMessage))
router.delete("/:id",auth,messageRouter.DeleteMessage)

export default router;
