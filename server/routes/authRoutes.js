import express from 'express';
import { register,login } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { registerValidation, loginValidation } from '../validators/authValidators.js';
import { validationResult } from "express-validator";


const router=express.Router();

router.post('/register',registerValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send the first error message found
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  next(); // Go to register controller
},register);


router.post('/login', loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  next();
},login);

router.get('/user', authMiddleware, async(req, res) => {
   try {
    const user = req.user; 
    res.json({ user }); 
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch user" });
  }
});
export default router;