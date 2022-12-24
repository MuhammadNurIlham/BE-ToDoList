import express from "express";
import { addTodo, getTodos, getTodoId, updateTodo, deleteTodo } from "../controllers/todoController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/todo', auth, addTodo);
router.get('/todos', auth, getTodos);
router.get('/todo/:id', auth, getTodoId);
router.patch('/todo/:id', auth, updateTodo);
router.delete('/todo/:id', auth, deleteTodo);

export default router;