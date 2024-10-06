import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    //id - auto

    name: { type: String, required: true }, //category name

    quizzes: [{type: Schema.Types.ObjectId, ref: 'quizzes' }]
    
})

export const Category = model('categories', categorySchema);
