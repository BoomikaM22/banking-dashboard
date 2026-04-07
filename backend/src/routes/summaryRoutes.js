import { Router } from "express";
import { getSummary } from "../controllers/summaryController.js";

const router = Router();

// GET /api/summary - Summary statistics
router.get("/summary", getSummary);

export default router;
