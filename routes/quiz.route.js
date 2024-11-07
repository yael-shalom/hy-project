import express from 'express'
import { getAllQuizzes, addQuiz, getQuizById, updateQuiz, getQuizByUserId, deleteQuiz, getImage } from '../controllers/quiz.controller.js'
import { getUser, isAuth } from '../middlewares/auth.js';

const router = express.Router();
router.get('/', getUser, getAllQuizzes);
router.get('/:id', getUser, getQuizById);
router.get('/owner/:id', isAuth, getQuizByUserId);
router.post('/', isAuth, addQuiz);//להוסיף isAuth
router.patch('/:id', isAuth, updateQuiz);//להוסיף isAuth
router.delete('/:id', isAuth, deleteQuiz);//להוסיף isAuth

export default router