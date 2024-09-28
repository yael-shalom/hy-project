import jwt from "jsonwebtoken";

export async function isAuth(req, res, next) {
    try {
        const { authorization } = req.headers;
        const [, token] = authorization.split(' ');
        const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
        const data = jwt.verify(token, privateKey);
        req.user_id = data.user_id; //details who's create the token
        next();
    } catch (error) {
        next({ message: error, status: 401 })
    }
}