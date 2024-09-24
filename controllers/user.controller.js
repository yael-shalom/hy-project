import mongoose from 'mongoose';
import path from 'path';

import { User } from '../models/user.model.js'

export async function signIn(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne(email); //????????????????????????????????????????????????????
    if (user) {
        bcrypt.compare(password, user.password, (err, isSame) => {
            if (err)
                return next(new Error(err.message));
            if (isSame) {
                const token = generateToken(user);
                user.password = "****";
                return res.send({ user, token });
            }
            return next({ message: 'Auth Failed-user is not found', status: 401 })
        })
    }
    else {
        return next({ message: 'Auth Failed', status: 401 })
    }
}

export async function signUp(req, res, next) {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password, });//??????????????????????????
        await user.save();
        const token = generateToken(user);
        user.password = "****";
        return res.status(201).json({ user, token });
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }

}