import { Router } from "express";
import { getAnnouncements } from "../controllers/announcementController.js";

const router = Router();

// GET /api/announcements - List all announcements
router.get("/announcements", getAnnouncements);

export default router;
