import { Router } from "express";
import AuthController from "../Controller/AuthController.js";
const router=Router()
router.post('/auth/register', AuthController.register);
export default router;