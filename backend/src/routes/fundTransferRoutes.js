import { Router } from "express";
import { transferFunds } from "../controllers/fundTransferController.js";

const router = Router();

// POST /api/transfer - Transfer funds
router.post("/transfer", transferFunds);

export default router;
