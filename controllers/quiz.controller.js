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
    try {
        const { name, categories, owner, imageUrl, questions } = req.body;

        // בדיקה אם כל השדות הנדרשים קיימים
        if (!name || !owner || !questions) {
            return res.status(400).json({ message: 'שדות חובה חסרים' });
        }

        // יצירת שאלון חדש
        const newQuiz = new Quiz({
            name,
            categories,
            owner,
            imageUrl,
            questions
        });

        // שמירה למסד הנתונים
        await newQuiz.save();

        return res.status(201).json(newQuiz);
    } catch (error) {
        next({ message: error.message, status: 500 });
    }
}



// את יכולה לבדוק אם כל זה טוב במקום מה שיש למעלה 
// או לבקש מעדי שתשים עין על זה?
// תודה!
// המייל שלי עם שגיאה זנית מבצהריים והפלפון בתיקון אין לי איך לתקשר עם הסביבה!!!!


// import { Quiz } from '../models/quiz.model.js';

// export async function getAllQuizzes(req, res, next) {
//     try {
//         const quizzes = await Quiz.find(); // קבלת כל המבחנים
//         res.json(quizzes); // החזרת המבחנים
//     } catch (error) {
//         next({ message: error.message, status: 500 });
//     }
// }

// export async function getQuizById(req, res, next) {
//     const id = req.params.id;

//     try {
//         const quiz = await Quiz.findById(id); // חיפוש מבחן לפי ID

//         if (!quiz) {
//             return res.status(404).json({ message: 'Quiz not found.' });
//         }

//         res.json(quiz); // החזרת המבחן
//     } catch (error) {
//         next({ message: error.message, status: 500 });
//     }
// }

// export async function addQuiz(req, res, next) {
//     try {
//         const { name, categories, owner, imageUrl, questions } = req.body;

//         // בדיקת שדות חובה
//         if (!name || !owner || !questions) {
//             return res.status(400).json({ message: 'שדות חובה חסרים' });
//         }

//         const newQuiz = new Quiz({ name, categories, owner, imageUrl, questions }); // יצירת שאלון חדש
//         await newQuiz.save(); // שמירה למסד הנתונים

//         return res.status(201).json(newQuiz); // החזרת השאלון שנוסף
//     } catch (error) {
//         next({ message: error.message, status: 500 });
//     }
// }

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