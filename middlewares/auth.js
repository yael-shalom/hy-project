import jwt from "jsonwebtoken";

export async function getUser(req, res, next) {
    try {
        const { authorization } = req.headers;
        const [, token] = authorization.split(' ');
        const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
        const data = jwt.verify(token, privateKey);
        req.userId = data.userId; // details who's create the token
        req.username = data.username;
    } catch (error) {
    }
    next();
}

export async function isAuth(req, res, next) {
    try {
        const { authorization } = req.headers;
        const [, token] = authorization.split(' ');
        const privateKey = process.env.JWT_SECRET || 'JWT_SECRET';
        const data = jwt.verify(token, privateKey);
        req.userId = data.userId; // details who's create the token
        req.username = data.username;
        next();
    } catch (error) {
        next({ message: error, status: 401 })
    }
}