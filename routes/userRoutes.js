import express from "express";
import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/user', addUser);
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;