import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// my routes
// import userRouter from './routes/user.route.js';
// import categoryRouter from './routes/category.route.js';
// import recipeRouter from './routes/recipe.route.js';

import { pageNotFound, serverNotFound } from './middlewares/handleErrors.js'; 
import 'dotenv/config';
import './config/db.js';

//יוצר שרת
const app = express();

//יוצרים את ה-body של ה-req
app.use(json()); 
app.use(urlencoded({ extended: true }));

//עושה הדפסות שיהיה קל לדבג
app.use(morgan("dev")); 

// app.use(cors({origin:"קליינט אמיתי"})); 
//מאפשר גישה לכולם לפני ההגשה לשנות לנ"ל
app.use(cors());

app.get('/', (req, res) => {
  res.send("wellcome");
});
// app.use("/users", userRouter);
// app.use("/categories", categoryRouter);
// app.use("/recipes",recipeRouter);

//בשביל להעלות תמונות
app.use('/images',express.static('uploads'))

//של השגיאות, אם לא מצא נתיב יגיע לזה
app.use(pageNotFound);
app.use(serverNotFound);// עבור כל השגיאות של ה-next

//מריץ את השרת
const port = process.env.PORT || 555;
app.listen(port, () => {
  console.log("running at http://localhost:" + port);
});