import express from "express";
import { adminLogin, loginUser, logout, registerUser } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logout);
userRouter.post("/admin", adminLogin);

export default userRouter;
