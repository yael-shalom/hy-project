import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    //id - auto

    name: { type: String, required: true }, //quiz name

    categories: { type: [String], default: ["שונות"] }, //quiz categories

    date: { type: Date, default: Date.now() }, //creation date

    owner: { //quiz owner
        _id: { type: Schema.Types.ObjectId, ref: 'users' }, //owner id
        name: String //owner name
    },

    imageUrl: { type: String }, //quiz's image

    questions: [{ //quiz's questions
        //id - auto
        content: { type: String, required: true }, //question content
        imageUrl: { type: String }, //question's image
        answers: [{ //question answers
            //id - auto
            content: { type: String, required: true }, //answer content
            score: { type: Number } //answer score
        }]
    }],
    
})

export const Quiz = model('quizzes', quizSchema);

//id type: schema.type.objectId
//date: default
//req.body.xxx - (name, id ...)