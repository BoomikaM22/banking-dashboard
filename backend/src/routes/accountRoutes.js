import { Router } from "express";
import { getAccounts, createAccount, getAccountStatement } from "../controllers/accountController.js";

const router = Router();

// GET /api/accounts - View all accounts (balances)
router.get("/accounts", getAccounts);

// POST /api/accounts - Open new account
router.post("/accounts", createAccount);

// GET /api/accounts/:id/statement - Account statement
router.get("/accounts/:id/statement", getAccountStatement);

export default router;
