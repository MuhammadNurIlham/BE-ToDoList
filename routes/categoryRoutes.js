import express from "express";
import { addCategory, getCategorys, getCategoryId, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post('/category', addCategory);
router.get('/categories', getCategorys);
router.get('/category/:id', getCategoryId);
router.patch('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;