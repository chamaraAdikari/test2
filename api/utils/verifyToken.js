import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "You are not authenticated!" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if(req.user.id === req.params.id || req.user.isAdmin){
           next()
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next,() => {
        if(req.user.isAdmin){
           next()
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
}