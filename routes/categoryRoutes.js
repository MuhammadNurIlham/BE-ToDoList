import express from "express";
import { addCategory, getCategorys, getCategoryId, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/category', auth, addCategory);
router.get('/categories', auth, getCategorys);
router.get('/category/:id', auth, getCategoryId);
router.patch('/category/:id', auth, updateCategory);
router.delete('/category/:id', auth, deleteCategory);

export default router;