import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    date: { type: Date, required: true, index: true },
    category: { type: String, default: "Uncategorized", index: true },
    merchant: { type: String, default: "" },
    notes: { type: String, default: "" },
    receiptUrl: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model("Expense", ExpenseSchema);