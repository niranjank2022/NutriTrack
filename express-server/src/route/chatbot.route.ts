import { Router } from "express";
import { messageChatbot } from "../controller/chatbot.controller";

const router = Router();
router.post("/", messageChatbot);

export default router;
