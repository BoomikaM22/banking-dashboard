import { Router } from "express";
import { getTransactions, createTransaction, deleteTransaction } from "../controllers/transactionController.js";

const router = Router();

// GET /api/transactions - List all (with optional search query)
router.get("/transactions", getTransactions);

// POST /api/transactions - Create transaction
router.post("/transactions", createTransaction);

// DELETE /api/transactions/:id - Delete transaction
router.delete("/transactions/:id", deleteTransaction);

export default router;
