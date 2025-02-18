import express from "express";
import { logIn, register } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// auth routes
authRouter.post("/register", register);
authRouter.post("/login", logIn);

export default authRouter;
