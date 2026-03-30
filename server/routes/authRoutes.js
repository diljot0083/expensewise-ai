import express from "express"
import { register, login, refreshToken, logout, googleCallback } from "../controllers/authController.js"
import auth from "../middleware/auth.js"
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.post("/logout", logout);
router.get("/me", auth, (req, res) => {
    res.json(req.user);
});

router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    googleCallback
);

export default router;