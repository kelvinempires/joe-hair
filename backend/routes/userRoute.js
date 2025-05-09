import express from "express";
import { adminLogin, isAuthenticated, login_verifyOtp, loginUser, logout, registerUser, resetPassword, sendResetOtp, verifyOtp, } from "../controllers/userController.js";
import authUser from "../middleware/auth.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logout);
userRouter.post("/admin", adminLogin);

userRouter.post("/send-verify-otp", authUser, verifyOtp);
userRouter.post("/verify-account", authUser, login_verifyOtp);
userRouter.get("/is-auth", authUser, isAuthenticated);
userRouter.post("/send-reset-otp", sendResetOtp);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
