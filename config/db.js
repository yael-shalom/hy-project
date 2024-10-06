import mongoose from "mongoose";

export function DBconnect()
{
    const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
    mongoose.connect(db).then(() => console.log("mongo DB connected"))
    .catch(error => console.log("mongo DB error", error.message));
}