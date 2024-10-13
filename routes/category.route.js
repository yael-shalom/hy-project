import express from 'express'
import { getAllCategories, addCategory, getCategoryById } from '../controllers/category.controller.js'
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getAllCategories);
// router.get('/:id', getQuizzesByCategoryId);
router.get('/:id', getCategoryById);
router.post('/', addCategory)
//add category

export default router