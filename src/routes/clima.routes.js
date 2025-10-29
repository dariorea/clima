import express from "express";
import { getClima, getPronostico, weatherLocal } from "../controllers/clima.controller.js";

const router = express.Router();

router.get("/", getClima);
router.get("/", weatherLocal)
router.get("/pronostico", getPronostico)

export default router;
