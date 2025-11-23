import express from "express";
import * as carsController from "../controllers/carsControllers.js";

const carsRouter = express.Router();

carsRouter.get("/cars", carsController.getAllCars);

export default carsRouter;