import { Router } from "express";
import { getNutrientsByFoodName } from "../controller/nutrient.controller";

const router = Router();
router.get("/:foodName/", getNutrientsByFoodName);

export default router;
