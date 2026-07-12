import { Router } from "express";
import {
  getChatHistory,
  sendMessage,
} from "../controllers/message.controller";

const router = Router();

router.get("/", getChatHistory);

router.post("/", sendMessage);

export default router;