import { Request, Response } from "express";
import Nutrients from "../model/nutrients.model";
import NutrientTracker from "../model/nutrientLog.model";

export async function getNutrientsByFoodName(req: Request, res: Response) {
  try {
    const foodName = req.params.foodName;
    const data = await Nutrients.findOne({ foodName: foodName });
    if (!data) {
      res.status(404).json({ message: "Food item not found." });
      return;
    }

    res.status(200).json({
      name: data?.foodName,
      calories: data?.calories,
      protein: data?.protein,
      carbohydrate: data?.carbohydrate,
      fat: data?.fat,
      fiber: data?.fiber,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.name + "\n" + err.message);
    } else {
      console.log(err);
    }
  }
}

export async function getNutrientLogByDate(req: Request, res: Response) {
  try {
    const { userId, date } = req.params;
    console.log(userId, date);
    const queryDate = new Date(date).toDateString();
    // await NutrientTracker.create({
    //   userId: "kevin",
    //   dailyEntries: [
    //     {
    //       date: "2025-04-02T00:00:00.000Z",
    //       nutrients: {
    //         protein: 50,
    //         carbs: 200,
    //         fats: 30,
    //         calories: 1500,
    //       },
    //     },
    //   ],
    // });
    const tracker = await NutrientTracker.findOne({ userId });
    if (!tracker) {
      res.status(400).json({ message: "User doesn't exist" });
      return;
    }
    const log = tracker.dailyEntries.find(
      (entry, _) => entry.date.toDateString() === queryDate
    );
    if (!log) {
      res.status(404).json({
        message: "Record not found",
      });
      return;
    }
    res.status(200).json({
      nutrients: log.nutrients,
    });
  } catch (err) {
    res.status(500).json("Error: " + (err as Error).message);
    if (err instanceof Error) {
      console.log(err.name + "\n" + err.message);
    } else {
      console.log(err);
    }
  }
}
