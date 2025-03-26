import { Request, Response } from "express";
import Users from "../model/users.model";

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json({
    message: "Sign in successful",
  });
}

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, password });
  if (user) {
    res.status(404).json({ message: "User already requests" });
    return;
  }

  await Users.create({ email, password });
  res.status(200).json({
    message: "Account created successfully",
  });
}
