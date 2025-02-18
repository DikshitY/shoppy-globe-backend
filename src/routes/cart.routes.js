import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

// cart routes
cartRouter.get("/cart", authMiddleware, getCart);
cartRouter.post("/cart", authMiddleware, addToCart);
cartRouter.put("/cart/:id", authMiddleware, updateCart);
cartRouter.delete("/cart/:id", authMiddleware, removeFromCart);

export default cartRouter;
