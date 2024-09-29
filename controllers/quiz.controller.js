// import { Category } from '../models/category.model.js'
// import path from 'path';

 import { Quiz } from '../models/quiz.model.js'
 import mongoose from 'mongoose';


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

export async function addQuiz(req, res, next) {
    console.log("addQuiz");
    try {
        const quizData = req.body
        
        const imageName = req.file ? req.file.filename : null; // קבלת שם התמונה אם קיימת
        const { name, categories, owner, questions } = quizData;

        // יצירת אובייקט שאלון חדש
        const newQuiz = new Quiz({
            name,
            categories,
            owner,
            imageUrl: imageName ? `${req.protocol}://${req.get('host')}/images/${imageName}` : null,
            questions
        });

        // שמירה למסד הנתונים
        await newQuiz.save();

        return res.status(201).json(newQuiz); // החזרת השאלון שנוסף
    } catch (error) {
        next(error);
    }
}

//עדכון


export async function updateQuiz(req, res, next) {
    const id = req.params.id;
    
    // בדיקת תקValidity של ה-ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next({ message: 'ID is not valid' });
    }

    try {
        // קבלת נתוני השאלון מהבקשה
        let quizData = req.body;
        // פריסת נתונים
        const { _id, name, categories, imageUrl, questions } = quizData;

        // יצירת אובייקט עם נתוני העדכון
        const updatedQuiz = {
            name,
            categories,
            imageUrl,
            questions,
            owner
        };

        // עדכון השאלון במסד הנתונים
        const quiz = await Quiz.findByIdAndUpdate(
            _id, 
            { $set: updatedQuiz }, 
            { new: true, runValidators: true });

        // בדיקת אם השאלון נמצא
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        // החזרת השאלון המעודכן
        return res.json(quiz);
    } catch (error) {
        next(error);
    }
}