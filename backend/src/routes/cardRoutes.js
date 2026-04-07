import { Router } from "express";
import { getCards } from "../controllers/cardController.js";

const router = Router();

// GET /api/cards - List all cards
router.get("/cards", getCards);

export default router;
