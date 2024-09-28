import express from 'express'
import { signIn, signUp, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller.js'
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();
router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/', getAllUsers);
router.patch('/:id', isAuth, updateUser);
router.delete('/:id', isAuth, deleteUser);

export default router