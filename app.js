import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';


// my routes
import userRouter from './routes/user.route.js';
import quizRouter from './routes/quiz.route.js';
import categoryRouter from './routes/category.route.js';
import uploadRouter from './routes/upload.js';

import { pageNotFound, serverNotFound } from './middlewares/handleErrors.js';
import { dbConnect } from './config/db.js';
import fileUpload from 'express-fileupload';

dbConnect();

//יוצר שרת
const app = express();

//יוצרים את ה-body של ה-req
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//עושה הדפסות שיהיה קל לדבג
app.use(morgan("dev"));

// app.use(cors({origin:"קליינט אמיתי"})); 
//מאפשר גישה לכולם לפני ההגשה לשנות לנ"ל
app.use(cors());

//בשביל להעלות תמונות
app.use('/images', express.static('uploads'))
app.use(fileUpload({
  useTempFiles:true,
  limits: { fileSize: 1024 * 1024 * 5 }
}))

app.use("/users", userRouter);
app.use("/quizzes", quizRouter);
app.use("/categories", categoryRouter);
app.use("/upload", uploadRouter);

//של השגיאות, אם לא מצא נתיב יגיע לזה
app.use(pageNotFound);
app.use(serverNotFound);// עבור כל השגיאות של ה-next

//מריץ את השרת
const port = process.env.PORT || 555;
app.listen(port, () => {
  console.log("running at http://localhost:" + port);
});