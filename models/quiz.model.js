import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    //id - auto
    name: { type: String, required: true },
    categories: { type: [String], default: ["שונות"] },
    date: { type: Date, default: Date.now() },
    owner: {
        _id: { type: Schema.Types.ObjectId, ref: 'users' },
        name: String
    },
    questions: [{
        //id - auto
        content: { type: String, required: true },
        imageUrl: { type: String },
        answers: [{
            //id - auto
            content: { type: String, required: true },
            score: { type: Number }
        }]
    }],
})

export const Quiz = model('quizzes', quizSchema);

//id type: schema.type.objectId
//date: default
//req.body.xxx - (name, id ...)