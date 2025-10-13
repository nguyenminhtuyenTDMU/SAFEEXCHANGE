import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface WalletOwner {
  id: string;
  name: string;
  address: string;
}

export interface TransferLog {
  id: string;
  timestamp: Date;
  from: string;
  to: string;
  message: string;
  success: boolean;
}

export const walletOwnerSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
});

export const transferLogSchema = z.object({
  id: z.string(),
  timestamp: z.date(),
  from: z.string(),
  to: z.string(),
  message: z.string(),
  success: z.boolean(),
});

export type WalletOwnerType = z.infer<typeof walletOwnerSchema>;
export type TransferLogType = z.infer<typeof transferLogSchema>;
