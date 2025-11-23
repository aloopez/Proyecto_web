// server/src/routes/cars.routes.js
import { Router } from "express";
import { getCars, createCar } from "../controllers/carros.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/carros", getCars);
router.post("/carros", authRequired, createCar);

export default router;