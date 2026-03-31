import "./config/env.js";

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js"
import aiRoutes from "./routes/aiRoutes.js";
import passport from "passport";
import "./config/passport.js";

const port = process.env.PORT || 5000;

const app = express();

connectDB();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/ai", aiRoutes);

app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
});