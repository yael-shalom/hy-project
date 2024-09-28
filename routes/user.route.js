import express from 'express'
import { signIn, signUp, getAllUsers, updateUser, deleteUser } from '../controllers/user.controller.js'

const router = express.Router();
router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/', getAllUsers);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router