import { Router } from "express";
import {
  getNutrientsByFoodName,
  getNutrientLogByDate,
} from "../controller/nutrient.controller";

const router = Router();
router.get("/:foodName/", getNutrientsByFoodName);
router.get("/logs/:userId/:date", getNutrientLogByDate);

export default router;
