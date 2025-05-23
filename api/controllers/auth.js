import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const { password, img, ...otherDetails } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            ...otherDetails,
            password: hash,
            img: img || "", // Handle image URL
        });

        const savedUser = await newUser.save();
        const { password: pass, ...userData } = savedUser._doc;
        
        res.status(200).json({
            success: true,
            message: "User has been created",
            user: userData
        });
    } catch(err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.identifier }) || 
                     await User.findOne({ username: req.body.identifier });
        
        if (!user) 
            return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) 
            return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        const { password, ...otherDetails } = user._doc;
        res.status(200)
            .json({ 
                details: otherDetails,  // Wrap user details in 'details' property
                isAdmin: user.isAdmin,
                token 
            });
    } catch (err) {
        next(err);
    }
};