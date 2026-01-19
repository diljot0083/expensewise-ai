import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js"

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

connectDB();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
});