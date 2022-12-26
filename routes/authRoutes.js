import express from "express";
import { register, login, checkAuth } from "../controllers/authController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', auth, checkAuth);

export default router;