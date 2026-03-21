import express from "express";
import { getInsights } from "../controllers/aiController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/insights", auth, getInsights);

export default router;