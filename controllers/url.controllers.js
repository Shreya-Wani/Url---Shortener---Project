import { urlsTable } from "../models/url.model.js";
import { db } from "../db/index.js";
import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createShortUrlSchema } from "../validation/request.validation.js";

export const createShortUrl = asyncHandler(async (req, res) => {

  const result = createShortUrlSchema.safeParse(req.body);

  if (!result.success) {
    console.log("VALIDATION ERROR:", result.error);
    throw new ApiError(400, "Validation failed", result.error.format());
  }

  const { originalUrl } = result.data;

  const shortCode = crypto.randomBytes(4).toString("hex");

  const [url] = await db
    .insert(urlsTable)
    .values({
      originalUrl,
      shortCode,
      userId: req.user.userId,
    })
    .returning();

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
        originalUrl: url.originalUrl,
      },
      "Short URL created successfully"
    )
  );
});
