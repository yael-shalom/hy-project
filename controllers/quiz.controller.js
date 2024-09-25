// import mongoose from 'mongoose';
// import { Recipe } from '../models/recipe.model.js'
// import { Category } from '../models/category.model.js'
// import path from 'path';

 import { Quiz } from '../models/quiz.model.js'


export async function getAllQuizzes(req, res, next) {

    try 
    
    {
        // קבלת כל המבחנים ממאגר הנתונים
        const quizzes = await Quiz.find();

        // החזרת המבחנים
        res.json(quizzes);
    } 
    
    catch (error) 
    {
        next({ message: error.message, status: 500 })
    }

}

export async function getQuizById(req, res, next) {
    
    const  id = req.params.id;

    try {
        // מחפשים את המבחן לפי ה-ID
        const quiz = await Quiz.findById(id);

        // אם לא נמצא מבחן עם ה-ID הזה
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        // מחזירים את המבחן
        res.json(quiz);
    } 
    catch (error) {
        next({ message: error.message, status: 500 })
    }
}