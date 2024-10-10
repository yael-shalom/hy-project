import mongoose from "mongoose";

export function dbConnect() {
    const db = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

    mongoose.connect(db)
        .then(() => console.log("mongo DB connected"))
        .catch(error => {
            console.log("mongo DB error", error.message);
            process.exit(1); // close server with error code 1
        });
}