import { Router } from "express";
import { login, register, logout, verifyEmail } from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);

// router.get("/profile", authRequired, profile); // Esto lo habilitaremos luego cuando hagamos el middleware

export default router;