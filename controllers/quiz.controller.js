// import mongoose from 'mongoose';
// import { Recipe } from '../models/recipe.model.js'
// import { Category } from '../models/category.model.js'
// import path from 'path';


// צריך את {  כמו שהיא עשתה?}
import Quiz from '../models/quiz.model.js'; // ודא שיש לך את המודל המתאים


export async function getAllQuiz(req, res, next) {
    try {
        // קבלת כל המבחנים ממאגר הנתונים
        const quizzes = await Quiz.find();

        // החזרת המבחנים
        res.json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

