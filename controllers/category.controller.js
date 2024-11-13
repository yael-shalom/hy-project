import { Category, categoryValidator } from '../models/category.model.js';
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

export async function addCategory(req, res, next) {
    console.log("addCategory");
    try {
        const result = categoryValidator.validate(req.body);

        if (result.error) {
            return next({ message: result.error, status: 409 });
        }

        const categoryData = req.body

        const {name, quizzes} = categoryData;

        // יצירת אובייקט קטגוריה חדש
        const newCategory = new Category({
            name,
            quizzes
        });

        // שמירה למסד הנתונים
        await newCategory.save();

        return res.status(201).json(newCategory); // החזרת הקטגוריה שנוספה
    } catch (error) {
        next(error);
    }
}

export async function getCategoryById(req, res, next) {

    const id = req.params.id;

    try {
        // מחפשים את הקטגוריה לפי ה-ID
        const category = await Category.findById(id);

        // אם לא נמצא מבחן עם ה-ID הזה
        if (!category) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        // מחזירים את הקטגוריה
        res.json(category);
    }
    catch (error) {
        next({ message: error.message, status: 500 })
    }
}