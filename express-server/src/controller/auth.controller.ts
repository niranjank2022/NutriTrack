import { Request, Response } from "express";
import Users from "../model/users.model";

export async function signin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(201).json({
      userId: user._id,
      message: "Sign in successful",
    });
  } catch (error) {
    res.status(500).json({ message: "signin: Server side error occurred" });
  }
}

export async function signup(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User already exists" });
      return;
    }

    await Users.create({ email, password });
    res.status(201).json({
      userId: user._id,
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "signup: Server side error occurred" });
  }
}
