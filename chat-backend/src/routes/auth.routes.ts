import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserCount,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/count", getUserCount);

export default router;
