// src/app.js (ESM)
import express from "express";
import cors from "cors";
import carsRouter from "./routes/carsRoutes.js";

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api", carsRouter);

export default app;
