import { Request, Response } from "express";
import axios from "axios";

export async function detectFoodVolumeByImage(req: Request, res: Response) {
  try {
    const { images } = req.body;
    if (!images) {
      res.status(400).json({ message: "No image provided" });
      return;
    }

    // Send image to Flask API
    const response = await axios.post("http://127.0.0.1:3001/predict", {
      images,
    });

    res.status(201).json(response.data);
  } catch (error: any) {
    console.error("Error calling Python API:", error);
    res.status(500).json({ message: "Error processing image" });
  }
}
