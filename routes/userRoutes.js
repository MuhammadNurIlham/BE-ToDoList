import express from "express";
import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/user', addUser);
router.get('/users', auth, getUsers);
router.get('/user/:id', auth, getUserById);
router.patch('/user/:id', auth, updateUser);
router.delete('/user/:id', auth ,deleteUser);

export default router;