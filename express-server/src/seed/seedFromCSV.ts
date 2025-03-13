import mongoose from "mongoose";
import csvParser from "csv-parser";
import fs from "fs";
import path from "path";
import Nutrients from "../model/nutrients.model";
import config from "../config";

async function seedDatabase() {
  try {
    const filePath = path.join(__dirname, "nutrients.csv");
    const nutrients: any[] = [];

    await mongoose.connect(config.MONGODB_URI!);

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        nutrients.push({
          foodName: (row.foodName as string).trim().toLowerCase(),
          calories: parseFloat(row.calories),
          protein: parseFloat(row.protein),
          carbohydrate: parseFloat(row.carbohydrate),
          fat: parseFloat(row.fat),
          fiber: parseFloat(row.fiber),
        });
      })
      .on("end", async () => {
        try {
          await Nutrients.deleteMany({});
          await Nutrients.insertMany(nutrients);
          console.log("Database seeded successfully");

          await mongoose.connection.close();
        } catch (err) {
          console.error("Error inserting data:", err);
        }
      })
      .on("error", (err) => {
        console.error("Error reading CSV:", err);
      });
  } catch (err) {
    console.error("Error occurred while seeding", err);
  }
}

seedDatabase();
