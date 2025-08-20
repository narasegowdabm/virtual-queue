import asyncHandler from "../utilis/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js"
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const register = asyncHandler(async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body;
       
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ msg: 'User already exists' });
        }
        // Encrypt password
    
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, phone, password: hashedPassword });
        await user.save();
        return res.status(200).json({msg : "User registered successfully"})
        
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})
//! Login the user
export const login = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ msg: 'Invalid credentials' });
        }
        // Check password
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ msg: 'Invalid credentials' });
        }
         
         // Create JWT token
         const payload = { user: { id: user._id } };
    
         jwt.sign(payload, process.env.SECRET, { expiresIn: 3600}, (err, token) => {
           if (err) {
             console.error(err.message);
             return res.status(500).json({ msg: 'Error generating token' });
           }
           // Set token in HTTP-only cookie
           res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000 // 1 hour
        });
           res.status(200).json({msg: 'Login Successful',  token, user : {userId : user._id} });
         });

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

export const logout = asyncHandler(async (req, res, next) => {
    res
        .status(200)
        .cookie("doctorToken", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        .json({
            success: true,
            message: "User logged out Successfully"
        });
})