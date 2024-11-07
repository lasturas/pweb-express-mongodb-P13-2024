import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

// Route untuk registrasi
router.post("/register", register);

// Route untuk login
router.post("/login", login);

export default router;
