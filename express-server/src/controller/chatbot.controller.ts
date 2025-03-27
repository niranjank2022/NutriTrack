import { Request, Response } from "express";
import axios from "axios";

export async function messageChatbot(req: Request, res: Response) {
  try {
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ message: "Message can't be empty!" });
      return;
    }

    // Send image to Flask API
    const response = await axios.post("http://127.0.0.1:3001/chatbot", {
      message,
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error calling Python API:", error);
    res.status(500).json({ message: "Error processing message" });
  }
}
