import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlsTable = pgTable("urls", {
    id: uuid().primaryKey().defaultRandom(),

    originalUrl: text().notNull(),
    shortCode: text().notNull().unique(),

    userId: uuid()
        .references(() => usersTable.id)
        .notNull(),

    clicks: integer().default(0).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
});