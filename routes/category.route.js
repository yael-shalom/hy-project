import express from 'express'
import { getAllCategories, getQuizzesByCategoryId } from '../controllers/category.controller.js'
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getAllCategories);
router.get('/:id', getQuizzesByCategoryId);
//add category

export default router