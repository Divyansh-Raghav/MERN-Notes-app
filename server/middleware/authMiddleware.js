import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware=async(req,res,next)=>{
    const token =req.header('Authorization');
    if(!token) return res.status(401).json({msg:'No token provided, access denied'});
   try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('_id name');
    next();
   }catch (err) {
  res.status(400).json({ msg: 'Invalid token' });
}

}
export default authMiddleware;