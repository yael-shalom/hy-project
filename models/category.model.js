import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    //_id - auto
    name: { type: String, required: true }, //category name
    quizzes: [{ _id: { type: Schema.Types.ObjectId, ref: 'quizzes', required: true }, name: { type: String, required: true } }]
})

export const Category = model('categories', categorySchema);
