import express from 'express'
import { getAllQuizzes, addQuiz, getQuizById, updateQuiz, getQuizByUserId } from '../controllers/quiz.controller.js'
import { getUser, isAuth } from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getUser, getAllQuizzes);
router.get('/:id', getUser, getQuizById);
router.get('/owner/:id', isAuth, getQuizByUserId);
router.post('/', addQuiz);//להוסיף isAuth
router.patch('/:id', isAuth, updateQuiz);

export default router