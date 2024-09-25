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

import { Quiz } from '../models/quiz.model.js';
import mongoose from 'mongoose';

export async function addQuiz(req, res, next) {
    console.log("addQuiz");
    try {
        const quizData = req.body

        //את זה לא צריךת הוא מתקבל בכל מקרה כאובייקט
        // .quiz; // הנחה שהנתונים מגיעים בצורה של מחרוזת JSON
        // const quizData = JSON.parse(quizDataString);
        
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

        //לא צריך
        // // טיפול בקטגוריות חדשות (אם יש)
        // const categoryPromises = newQuiz.categories.map(async category => {
        //     // אם יש קטגוריות נוספות, ניתן לעדכן אותן במסד הנתונים כאן
        //     // לדוגמה, אם יש מודל Category, ניתן לבדוק אם הקטגוריה קיימת ולהוסיף אותה
        //     // (הקוד להוספת קטגוריה נשאר לך להוסיף בהתאם למבנה של הקטגוריות בפרויקט שלך)
        // });
        // await Promise.all(categoryPromises);

        return res.status(201).json(newQuiz); // החזרת השאלון שנוסף
    } catch (error) {
        next(error);
    }
}

//עדכון


// export async function updateQuiz(req, res, next) {
//     const id = req.params.id;
    
//     // בדיקת תקValidity של ה-ID
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return next({ message: 'ID is not valid' });
//     }

//     try {
//         // קבלת נתוני השאלון מהבקשה
//         const quizDataString = req.body.quiz; // הנחה שהנתונים מגיעים בצורה של מחרוזת JSON
//         const quizData = JSON.parse(quizDataString);
        
//         // פריסת נתונים
//         const { name, categories, imageUrl, questions, owner } = quizData;

//         // יצירת אובייקט עם נתוני העדכון
//         const updatedQuiz = {
//             name,
//             categories,
//             imageUrl,
//             questions,
//             owner
//         };

//         // עדכון השאלון במסד הנתונים
//         const recipe = await Quiz.findByIdAndUpdate(id, { $set: updatedQuiz }, { new: true, runValidators: true });

//         // בדיקת אם השאלון נמצא
//         if (!recipe) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         // החזרת השאלון המעודכן
//         return res.json(recipe);
//     } catch (error) {
//         next(error);
//     }
// }