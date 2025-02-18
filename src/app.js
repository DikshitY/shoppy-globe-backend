import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = new express();
app.use(cors());
app.use(express.json());

// function called for connecting to DB
connectDB();

// all api routes defined
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);

export default app;
