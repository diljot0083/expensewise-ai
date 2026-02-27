import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email });

        if (exist) return res.status(400).json({ message: "Email already used" });

        const hashed = await bcrypt.hash(password, 12);

        const newUser = new User({ name, email, passwordHash: hashed });
        await newUser.save();

        return res.status(200).json({ message: "User registered" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            accessToken,
            user: { id: user._id, name: user.name, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "No Refresh token" });

        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(payload.id).select("_id role");

        if (!user)
            return res.status(401).json({ message: "User not found" });

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET, 
            { expiresIn: "15m" }
        );

        res.json({ accessToken });

    } catch (error) {
        res.status(401).json({ message: "Invalid Refresh Token" })
    }
};

export const logout = async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "lax",
    });

    res.json({ message: "Logged out" });
};