// server/src/routes/cars.routes.js
import { Router } from "express";
import { getCars, createCar } from "../controllers/carros.controller.js";

const router = Router();

router.get("/carros", getCars);
router.post("/carros", createCar);

export default router;