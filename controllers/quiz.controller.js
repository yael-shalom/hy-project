import { Category } from '../models/category.model.js';
import { Quiz } from '../models/quiz.model.js'
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import Path from 'path'



export async function getAllQuizzes(req, res, next) {
    try {
        const userId = req.userId;
        let query = { isPrivate: false };

        if (userId) {
            query = { $or: [{ 'owner._id': userId }, query] };
        }

        // קבלת כל המבחנים ממאגר הנתונים
        const quizzes = await Quiz.find(query);

        // החזרת המבחנים
        res.json(quizzes);
    }

    catch (error) {
        next({ message: error.message, status: 500 })
    }

}

export async function getQuizById(req, res, next) {
    try {
        const quizId = req.params.id;
        const userId = req.userId;

        // מחפשים את המבחן לפי ה-ID
        const quiz = await Quiz.findById(quizId);

        // אם לא נמצא מבחן עם ה-ID הזה
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found.' });
        }

        if (quiz.isPrivate && quiz.owner._id !== userId) {
            return res.status(403).json({ message: 'you have no permission.' });
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
    console.log(req.files);
    let exts_arr = [".png", ".jpg", ".jpeg", ".svg", ".gif"];

    try {
        const image = req.files?.imageUrl;

        let imageData = { secure_url: undefined };
        if (image) {
            if (image.size <= 1024 * 1024 * 2) {
                let extFile = Path.extname(image.name);
                if (exts_arr.includes(extFile)) {
                    imageData = await cloudinary.uploader.upload(image.tempFilePath, { unique_filename: true })
                    image.mv("public/" + image.name, (err) => {
                        if (err)
                            return res.status(401).json({ msg: "error", err })
                        res.json("file upload");
                    });
                }
                else {
                    res.status(400).json("file must be image, png, jpg, jpeg, svg, gif");
                }
            }
            else {
                res.status(400).json("file too big, maximum 2 mb");
            }
        }

        const { name, categories, isPrivate, questions } = req.body;

        // יצירת אובייקט שאלון חדש
        const newQuiz = new Quiz({
            name,
            categories,
            owner: {
                _id: req.userId,
                name: req.username
            },
            isPrivate,
            imageUrl: imageData.secure_url,
            questions
        });

        // שמירה למסד הנתונים
        await newQuiz.save();

        await Category.findByIdAndUpdate(categories,
            { $push: { quizzes: { _id: newQuiz._id, name: newQuiz.name } } }
        );

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
        const userId = req.userId;
        // קבלת נתוני השאלון מהבקשה
        let quizData = req.body;

        console.log(quizData);


        // פריסת נתונים
        const { _id, name, categories, isPrivate, imageUrl, questions } = quizData;
        if (id !== _id) {
            return res.status(409).json({ message: 'id is not same.' });
        }

        const quizSrc = await Quiz.findById(_id);
        const categorySrc = quizSrc.categories;
        // if (userId !== quizSrc.owner._id.toString()) {
        //     return res.status(403).json({ message: 'you have no permission.' });
        // }

        // יצירת אובייקט עם נתוני העדכון
        const updatedQuiz = {
            name,
            categories,
            isPrivate,
            imageUrl,
            questions
        };

        // עדכון השאלון במסד הנתונים
        const quiz = await Quiz.findByIdAndUpdate(
            _id,
            { $set: updatedQuiz },
            { new: true, runValidators: true });

        // בדיקת אם השאלון נמצא
        if (!quiz) {
            return next({ message: 'quiz is not found', status: 404 })
        }

        if (categories !== categorySrc) {
            await Category.findByIdAndUpdate(categorySrc,
                { $pull: { quizzes: { _id: quizSrc._id } } }
            );
            await Category.findByIdAndUpdate(categories,
                { $push: { quizzes: { _id: quiz._id, name: quiz.name } } }
            );
        }

        // החזרת השאלון המעודכן
        return res.json(quiz);
    } catch (error) {
        return next(error);
    }
}

export async function deleteQuiz(req, res, next) {
    try {
        const quizId = req.params.id;
        const result = await Quiz.findByIdAndDelete(quizId);

        if (!result) {
            return next({ message: "quiz not found", status: 404 });
        }

        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
}

export async function getQuizByUserId(req, res, next) {


    try {
        const id = req.params.id;
        const userId = req.userId;

        if (id !== userId) {
            return res.status(403).json({ message: 'you have no permission.' });
        }

        const quizzes = await Quiz.find({ 'owner._id': id });
        return res.json(quizzes);
    }
    catch (error) {
        return next({ message: error.message, status: 500 })
    }
}
