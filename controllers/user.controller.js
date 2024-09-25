import mongoose from 'mongoose';

import { User } from '../models/user.model.js'

export async function signIn(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email }); //במקום email:email רק email כי זה באותו שם
    if (user) {
        bcrypt.compare(password, user.password, (err, isSame) => {
            if (err)
                return next(new Error(err.message));
            if (isSame) {
                // const token = generateToken(user);
                user.password = "****";
                return res.json(user);
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
        const user = new User({ name, email, password });//??????????????????????????
        await user.save();
        // const token = generateToken(user);
        user.password = "****";
        return res.status(201).json(user);
    } catch (error) {        
        return next({ message: error.message, status: 409 })
    }
}

export async function updateUser(req, res, next) {

}

export async function deleteUser(req, res, next) {

}

/////////////////////////////////
export async function getAllUsers(req, res, next) {
    try {
        console.log("gooddddddddddddddddd");

        // קבלת כל המבחנים ממאגר הנתונים
        const users = await User.find();
        console.log(users);

        // החזרת המבחנים
        res.json(users);
    }

    catch (error) {
        next({ message: error.message, status: 500 })
    }
}