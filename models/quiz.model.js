import { required } from "joi";
import { Schema, model } from "mongoose";
import { type } from "os";

const quizSchema = new Schema({
    //id - auto
    name: {type: String, required: true},
    categories: {type: [String], default: ["שונות"]},
    questions: [{
        //id - auto
        content: {type: String, required:true},
        imageUrl: {type: String},
        answers: [{
            //id - auto
            content: {type: String, required:true},
            score: {type: Number}
        }]
    }]
})

export const Quiz = model('quizzes', quizSchema);

//id type: schema.type.objectId
//date: default
//req.body.xxx - (name, id ...)