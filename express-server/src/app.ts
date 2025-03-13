import express, { Application } from "express";
import foodsRouter from "./route/food.route";
import nutrientsRouter from "./route/nutrient.route";
import mongoose from "mongoose";
import config from "./config";

const app: Application = express();

app.use(express.json());
app.use("/apis/foods/", foodsRouter);
app.use("/apis/nutrients/", nutrientsRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

mongoose
  .connect(config.MONGODB_URI!)
  .then(() => console.log("Database connected successfully!"))
  .catch(() => console.log("Error: Database connection failed!"));

export default app;
