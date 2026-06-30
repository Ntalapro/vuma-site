import { pgTable, serial, doublePrecision, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sharedLocationsTable = pgTable("shared_locations", {
  id: serial("id").primaryKey(),
  label: text("label"),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  accuracy: doublePrecision("accuracy"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertSharedLocationSchema = createInsertSchema(sharedLocationsTable).omit({
  id: true,
  createdAt: true,
});
export type InsertSharedLocation = z.infer<typeof insertSharedLocationSchema>;
export type SharedLocation = typeof sharedLocationsTable.$inferSelect;
