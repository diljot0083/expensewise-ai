import Expense from "../models/Expense.js";
import mongoose from "mongoose";

export const createExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { amount, currency, date, category, merchant, notes, receiptUrl } = req.body;

        if (!amount || !date) return res.status(400).json({ message: "Amount and date required" })

        const expense = await Expense.create({
            userId,
            amount,
            currency: currency || "INR",
            date: new Date(date),
            category: category || "Uncatergorized",
            merchent: merchant || "",
            notes: notes || "",
            receiptUrl: receiptUrl || null
        });
        res.status(201).json(expense);
    } catch (error) {
        console.error("createdExpense:", error);
        res.status(500).json({ message: "Server error" })
    }
};

export const listExpenses = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
            from, to, category, merchant, min, max, q,
            page = 1, limit = 20, sort = "-date"
        } = req.query;

        const filter = { userId: mongoose.Types.ObjectId(userId) };

        if (from || to) {
            filter.date = {};
            if (from) filter.date.$gte = new Date(from);
            if (to) filter.date.$lte = new Date(to);
        }

        if (category) filter.category = category;
        if (merchant) filter.merchant = { $regex: merchant, $options: "i" };
        if (min) filter.amount = { ...(filter.amount || {}), $gte: Number(min) };
        if (max) filter.amount = { ...(filter.amount || {}), $lte: Number(max) };
        if (q) filter.$or = [
            { merchant: { $regex: q, $options: "i" } },
            { notes: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } }
        ];

        const skip = (Number(page) - 1) * Number(limit);
        const [items, total] = await Promise.all([
            Expense.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
            Expense.countDocuments(filter)
        ]);

        res.json({
            items,
            meta: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error("listExpenses:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });

        const expense = await Expense.findOne({ _id: id, userId });
        if (!expense) return res.status(404).json({ message: "Not found" });

        res.json(expense);
    } catch (error) {
        console.error("getExpense:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const update = { ...req.body };

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });

        delete update.userId;
        delete update._id;

        const expense = await Expense.findOneAndUpdate(
            { _id: id, userId },
            { $set: update },
            { new: true }
        );

        if (!expense) return res.status(404).json({ message: "Not found" });

        res.json(expense);
    } catch (error) {
        console.error("updateExpense:", error);
        res.status(500).json({message: "Server error"});
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid id" });

        const result = await Expense.findOneAndDelete({ _id: id, userId });
        if (!result) return res.status(500).json({ message: "Not found" });

        res.json({ message: "Deleted" });
    } catch (error) {
        console.error("deleteExpense:", error);
        res.status(500).json({ message: "Server error" });
    }
};