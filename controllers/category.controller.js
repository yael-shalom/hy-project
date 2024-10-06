import { Category } from '../models/category.model.js';
import mongoose from 'mongoose';

export async function getAllCategories(req, res, next) {

    try {
        // קבלת כל המבחנים ממאגר הנתונים
        const categories = await Category.find();

        // החזרת הקטגוריות
        res.json(categories);
    }

    catch (error) {
        return next({ message: error.message, status: 500 })
    }
}

export async function getQuizzesByCategoryId(req, res, next) {

    const id = req.params.id;

    try {
        //ID מחפשים את הקטגוריה לפי ה
        const category = await Category.findById(id);

        //הזה ID אם לא נמצאה קטגוריה עם ה
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // מחזירים את המבחנים
        res.json(category.quizzes);
    }
    catch (error) {
        return next({ message: error.message, status: 500 })
    }
}
