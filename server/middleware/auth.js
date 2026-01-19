import jwt from "jsonwebtoken"
import User from "../models/User.js"

export default async function auth(req, res, next) {
    try {
        const header = req.header.authorization;
        if (!header) return res.status(401).json({ message: "No token" });

        const token = header.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(payload.id).select("-passwordHash");
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}