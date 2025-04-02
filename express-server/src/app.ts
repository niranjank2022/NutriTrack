import express, { Application } from "express";
import cors from "cors";
import authRouter from "./route/auth.route";
import foodsRouter from "./route/food.route";
import nutrientsRouter from "./route/nutrient.route";
import chatbotRouter from "./route/chatbot.route";
import mongoose from "mongoose";
import config from "./config";

const app: Application = express();

app.use(express.json({ limit: "10mb" })); // Default is "100kb"
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use("/auth/", authRouter);
app.use("/foods/", foodsRouter);
app.use("/nutrients/", nutrientsRouter);
app.use("/chatbot/", chatbotRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

mongoose
  .connect(config.MONGODB_URI!)
  .then(() => console.log("Database connected successfully!"))
  .catch(() => console.log("Error: Database connection failed!"));

export default app;
