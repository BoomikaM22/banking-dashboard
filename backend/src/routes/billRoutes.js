import { Router } from "express";
import { getBills, payBill } from "../controllers/billController.js";

const router = Router();

// GET /api/bills - List all bills
router.get("/bills", getBills);

// POST /api/bills/:id/pay - Pay a bill
router.post("/bills/:id/pay", payBill);

export default router;
