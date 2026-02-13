import { urlsTable } from "../models/url.model.js";
import { db } from "../db/index.js";
import crypto from "crypto";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createShortUrlSchema } from "../validation/request.validation.js";
import { eq, sql, count, desc } from "drizzle-orm"; 

export const createShortUrl = asyncHandler(async (req, res) => {

  const result = createShortUrlSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError(400, "Validation failed", result.error.format());
  }

  const { originalUrl, customCode } = result.data;

  let shortCode;

  if (customCode) {
    //check custom code exists
    const existing = await db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, customCode));

    if (existing.length > 0) {
      throw new ApiError(409, "Custom code already in use");
    }

    shortCode = customCode;

  } else {
    shortCode = crypto.randomBytes(4).toString("hex");
  }

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
        shortUrl: `${process.env.BASE_URL || `${req.protocol}://${req.get("host")}`}/${shortCode}`,
        originalUrl: url.originalUrl,
      },
      "Short URL created successfully"
    )
  );
});

export const redirectToOriginalUrl = asyncHandler(async (req, res) => {

  const { shortCode } = req.params;

  const [url] = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, shortCode));

  if (!url) {
    throw new ApiError(404, "Short URL not found");
  }

  await db
    .update(urlsTable)
    .set({
      clicks: sql`${urlsTable.clicks} + 1`,
    })
    .where(eq(urlsTable.shortCode, shortCode));

  return res.redirect(url.originalUrl);
});

export const getUserUrls = asyncHandler(async (req, res) => {
  const userId = req.user?.userId; // Safe access
  if (!userId) {
    throw new ApiError(401, "User context missing");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const offset = (page - 1) * limit;

  const urls = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, userId))
    .orderBy(desc(urlsTable.createdAt))
    .limit(limit)
    .offset(offset);

  const total = await db
    .select({ count: count() })
    .from(urlsTable)
    .where(eq(urlsTable.userId, userId));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        currentPage: page,
        totalUrls: total[0].count,
        totalPages: Math.ceil(total[0].count / limit),
        urls: urls.map((url) => ({
          id: url.id,
          shortUrl: `${process.env.BASE_URL || `${req.protocol}://${req.get("host")}`}/${url.shortCode}`,
          originalUrl: url.originalUrl,
          clicks: url.clicks,
          createdAt: url.createdAt,
          updatedAt: url.updatedAt,
        })),
      },
      "User URLs retrieved successfully"
    )
  );
});

export const deleteUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  const [url] = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.id, id));

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.userId !== userId) {
    throw new ApiError(403, "You are not allowed to delete this URL");
  }

  await db
    .delete(urlsTable)
    .where(eq(urlsTable.id, id));

  return res.status(200).json(
    new ApiResponse(200, null, "URL deleted successfully")
  );

});
