import express from "express";
import {
  signup,
  login,
  logout,
  sendVerifyOtp,
  verifyOtp,
  sendResetOtp,
  resetPassword,
  getCurrentUser
} from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current-user", protectRoute, getCurrentUser);
router.get("/protected", protectRoute, (req, res) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});
router.post("/send-verify-otp", protectRoute, sendVerifyOtp);
router.post("/verify-otp", protectRoute, verifyOtp);

router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;