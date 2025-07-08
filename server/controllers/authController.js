import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Register User
export const register=async(req,res)=>{
    const {name,email,password}=req.body;
      console.log("➡️ Incoming register request with email:", email);
    try{
        const existingUser=await User.findOne({email});
        console.log("🔍 Existing user found:", existingUser);
        if(existingUser) return res.status(400).json({msg:"User already Exists"});
        const hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashPassword});
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1d',
});
        res.status(201).json({token, user: { id: user._id, name: user.name }});
    }catch(err){
        res.status(500).json({msg:"Server Error"});
    }
}

//Login User
export const login=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user) return res.status(400).json({msg:"User not found"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Password"});

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.json({token,user:{id:user._id,name:user.name}});

    }catch(err){
        res.status(500).json({msg:"Server Error"});
    }
}