import express from "express";
import { addTodo, getTodos, getTodoId, updateTodo, deleteTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post('/todo', addTodo);
router.get('/todos', getTodos);
router.get('/todo/:id', getTodoId);
router.patch('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

export default router;