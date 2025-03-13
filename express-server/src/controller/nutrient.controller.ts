import { Request, Response } from "express";
import Nutrients from "../model/nutrients.model";

export async function getNutrientsByFoodName(req: Request, res: Response) {
  try {
    const foodName = req.params.foodName;
    const data = await Nutrients.findOne({ foodName: foodName });
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
