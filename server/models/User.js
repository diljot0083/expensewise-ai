import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: false, default: null },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    googleId: { type: String, sparse: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);