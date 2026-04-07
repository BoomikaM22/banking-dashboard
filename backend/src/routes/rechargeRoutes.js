import { Router } from "express";
import { recharge } from "../controllers/rechargeController.js";

const router = Router();

// POST /api/recharge - Recharge / Quick Pay
router.post("/recharge", recharge);

export default router;
