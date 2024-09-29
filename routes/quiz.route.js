import express from 'express'
import { getAllQuizzes } from '../controllers/quiz.controller.js'
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getAllQuizzes);

export default router