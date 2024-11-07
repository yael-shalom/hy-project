import { Schema, model } from "mongoose";

const quizSchema = new Schema({
    //id - auto

    name: { type: String, required: true }, //quiz name

    categories: { type: Schema.Types.ObjectId, ref: 'categories' }, //quiz categories

    date: { type: Date, default: Date.now() }, //creation date

    owner: { //quiz owner
        _id: { type: Schema.Types.ObjectId, ref: 'users' }, //owner id
        name: String //owner name
    },

    isPrivate: { type:Boolean, default:true},

    imageUrl: { type: String }, //quiz's image

    questions: [{ //quiz's questions
        //id - auto
        content: { type: String, required: true }, //question content
        // score: { type: Number }, //answer score
        imageUrl: { type: String }, //question's image
        answers: [{ //question answers
            //id - auto
            content: { type: String, required: true }, //answer content
            isRight: {type: Boolean, default: false}
        }]
    }],
    
});

quizSchema.virtual('score').get(function() {
    const totalQuestions = this.questions.length;
    return 100 / totalQuestions;
});

quizSchema.options.toJSON = {
    virtuals: true,
    transform: function (doc, ret) {
        const { __v, ...rest } = ret; // Destructure _id from ret
        return rest; // Rename _id to id using spread operator
    }
};

export const Quiz = model('quizzes', quizSchema);