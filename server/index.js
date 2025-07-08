import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import rateLimit from "express-rate-limit";
import notesRouter from './routes/notes.js';

// dotenv.config();
const app=express();
const PORT= process.env.PORT||5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/notes',notesRouter)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per 15 minutes
  message: "⚠️ Too many requests, please try again later.",
});

app.use(limiter);

app.use("/api/auth", rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: "⚠️ Too many login/register attempts. Try again later.",
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(err => console.error('MongoDB connection error:', err));
