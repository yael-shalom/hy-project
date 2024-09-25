import express from 'express'
import { signIn, signUp, getAllUsers } from '../controllers/user.controller.js'
// import { isAdmin } from '../middlewares/auth.js'

const router = express.Router();
router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/', getAllUsers)

export default router