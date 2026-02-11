import express from "express";
import { createShortUrl } from "../controllers/url.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/shorten", authMiddleware, createShortUrl);

export default router;