import express from "express";
import auth from "../middleware/auth.js";

import { createExpense, listExpenses, getExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.use(auth);

router.post("/", createExpense);
router.get("/", listExpenses);
router.get("/:id", getExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;