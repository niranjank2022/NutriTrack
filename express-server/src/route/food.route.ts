import { Router } from "express";
import { detectFoodVolumeByImage } from "../controller/food.controller";

const router = Router();
router.post("/detect/", detectFoodVolumeByImage);

export default router;
