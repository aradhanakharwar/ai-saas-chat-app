import express from "express";
import { sendMessage, getChats } from "../controllers/chatController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/chat", authMiddleware, sendMessage);
router.get("/chats", authMiddleware, getChats);

export default router;