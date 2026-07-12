import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserCount,
  getUsers,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/count", getUserCount);
router.get("/users", getUsers);

export default router;
