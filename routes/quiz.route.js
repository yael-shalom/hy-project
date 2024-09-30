import express from 'express'
import { getAllQuizzes, addQuiz, getQuizById, updateQuiz } from '../controllers/quiz.controller.js'
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);
router.post('/addquiz', addQuiz);
router.patch('/:id',isAuth, updateQuiz);

export default router