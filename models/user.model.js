// import { required } from "joi";
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    //id - auto

    name: { type: String, required: true }, //user name

    email: { type: String, required: true, unique: true, index: true }, //user mail

    password: { type: String, required: true }, //user password

    score: { type: Number, min: 0 }, //user score

    average: { type: Number }, //user's average

    answeredQuizzes: [{ //quizzes answered by the user
        _id: { type: Schema.Types.ObjectId, ref: 'quizzes' }, //quiz id
        score: { type: Number, min: 0 }, //quiz score
        name: { type: String }, //quiz name
        answers: [{ //answered answers
            questionContent: { type: String }, //question content
            answerContent: { type: String }, //answer content
            score: { type: Number, min: 0 }, //answer score
        }]
    }],

    createdQuizzes: [{ //quizzes created by the user
        _id: { type: Schema.Types.ObjectId, ref: 'quizzes' }, //quiz id
        name: { type: String }, //quiz name
    }]
});

userSchema.pre('save', async function () {
    // this - המשתמש שנשמר בתוך הדטבייס
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// userSchema.pre('')

export function generateToken(user) {
    const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
    const data = { userId: user._id, username: user.name };
    const token = jwt.sign(data, privateKey, { expiresIn: '3h' });
    return token;
}

export const User = model('users', userSchema);