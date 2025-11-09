import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal } from "drizzle-orm/pg-core";
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
}).extend({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const pantryItems = pgTable("pantry_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
  category: text("category"),
  expiryDate: timestamp("expiry_date"),
  purchaseDate: timestamp("purchase_date").default(sql`now()`),
  notes: text("notes"),
});

export const insertPantryItemSchema = createInsertSchema(pantryItems).omit({
  id: true,
});

export const updatePantryItemSchema = createInsertSchema(pantryItems).omit({
  id: true,
  userId: true,
}).partial();

export type InsertPantryItem = z.infer<typeof insertPantryItemSchema>;
export type UpdatePantryItem = z.infer<typeof updatePantryItemSchema>;
export type PantryItem = typeof pantryItems.$inferSelect;
