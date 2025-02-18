import express from "express";
import {
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

// product routes
productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getProductById);

export default productRouter;
