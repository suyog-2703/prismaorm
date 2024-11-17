import { Router } from "express";
import AuthController from "../Controller/AuthController.js";
import authMiddleware from "../middleware/Authenticate.js";
import ProfileController from "../Controller/ProfileController.js";
const router=Router()
router.post('/auth/register', AuthController.register);
router.post('/auth/login',AuthController.login)
router.get('/profile', authMiddleware, ProfileController.index)
export default router;