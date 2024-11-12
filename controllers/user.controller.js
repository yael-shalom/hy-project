import mongoose from 'mongoose';
import { generateToken, User } from '../models/user.model.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from 'cloudinary';
import Path from 'path'

export async function signIn(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //במקום email:email רק email כי זה באותו שם
    if (user) {
        const isSame = await bcrypt.compare(password, user.password);
        if (isSame) {
            const token = generateToken(user);
            return res.json({ username: user.name, userImg: user.imgUrl, token });
        }
        return next({ message: 'Auth Failed', status: 401 })
    }
    else {
        return next({ message: 'Auth Failed', status: 401 })
    }
}

export async function signUp(req, res, next) {
    const { name, email, password } = req.body;
    let exts_arr = [".png", ".jpg", ".jpeg", ".svg", ".gif"];
    try {
        const image = req.files?.imgUrl;
        let imageData = { secure_url: undefined };
        if (image) {
            if (image.size <= 1024 * 1024 * 2) {
                let extFile = Path.extname(image.name);
                if (exts_arr.includes(extFile)) {
                    imageData = await cloudinary.uploader.upload(image.tempFilePath, { unique_filename: true })
                    console.log(imageData);
                }
                else {
                    return next({ message: error.message, status: 400 })
                }
            }
            else {
                return next({ message: error.message, status: 400 })
            }
        }


        const user = new User({ name, email, password, imgUrl: imageData.secure_url });
        await user.save();
        const token = generateToken(user);
        console.log(user.imgUrl);
        
        return res.status(201).json({ username: user.name, userImg: user.imgUrl, token });
    } catch (error) {
        return next({ message: error.message, status: 409 })
    }
}

export async function updateUser(req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id is not valid', status: 409 })

    if (id !== req.userId)
        return next({ message: 'user can update himself only', status: 403 })

    try {
        let user = req.body;
        const { _id, name, email, password } = user; //unpacking

        if (id !== _id)
            return next({ message: 'there are 2 different id', status: 409 })

        user = await User.findByIdAndUpdate( //find user by id and update him
            _id,
            { $set: { name, email, password } }, //set the parameters sent
            { new: true } //return the new user created
        );

        await user.save();

        user.password = '****';

        return res.json(user);
    } catch (error) {
        next(error)
    }
}

export async function deleteUser(req, res, next) {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return next({ message: 'id is not valid' })

    if (id !== req.userId)
        return next({ message: 'user can delete himself only', status: 403 })

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user)
            return next({ message: 'user not found', status: 404 })
        return res.status(204).send();
    } catch (error) {
        next(error)
    }
}

export async function getAllUsers(req, res, next) {
    try {
        console.log("good");

        // קבלת כל המבחנים ממאגר הנתונים
        const users = await User.find();
        console.log(users);

        // החזרת השאלונים
        res.json(users);
    }

    catch (error) {
        next({ message: error.message, status: 500 })
    }
}