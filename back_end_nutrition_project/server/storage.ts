import { type User, type InsertUser, type PantryItem, type InsertPantryItem, type UpdatePantryItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Pantry operations
  getPantryItems(userId: string): Promise<PantryItem[]>;
  getPantryItem(id: string, userId: string): Promise<PantryItem | undefined>;
  createPantryItem(item: InsertPantryItem): Promise<PantryItem>;
  updatePantryItem(id: string, userId: string, updates: UpdatePantryItem): Promise<PantryItem | undefined>;
  deletePantryItem(id: string, userId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private pantryItems: Map<string, PantryItem>;

  constructor() {
    this.users = new Map();
    this.pantryItems = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Pantry operations
  async getPantryItems(userId: string): Promise<PantryItem[]> {
    return Array.from(this.pantryItems.values()).filter(
      (item) => item.userId === userId
    );
  }

  async getPantryItem(id: string, userId: string): Promise<PantryItem | undefined> {
    const item = this.pantryItems.get(id);
    if (item && item.userId === userId) {
      return item;
    }
    return undefined;
  }

  async createPantryItem(insertItem: InsertPantryItem): Promise<PantryItem> {
    const id = randomUUID();
    const item: PantryItem = {
      id,
      name: insertItem.name,
      userId: insertItem.userId,
      quantity: insertItem.quantity,
      unit: insertItem.unit,
      category: insertItem.category ?? null,
      expiryDate: insertItem.expiryDate ?? null,
      purchaseDate: insertItem.purchaseDate ?? new Date(),
      notes: insertItem.notes ?? null,
    };
    this.pantryItems.set(id, item);
    return item;
  }

  async updatePantryItem(
    id: string,
    userId: string,
    updates: UpdatePantryItem
  ): Promise<PantryItem | undefined> {
    const item = await this.getPantryItem(id, userId);
    if (!item) {
      return undefined;
    }

    const updatedItem: PantryItem = {
      ...item,
      ...updates,
    };
    this.pantryItems.set(id, updatedItem);
    return updatedItem;
  }

  async deletePantryItem(id: string, userId: string): Promise<boolean> {
    const item = await this.getPantryItem(id, userId);
    if (!item) {
      return false;
    }
    return this.pantryItems.delete(id);
  }
}

export const storage = new MemStorage();
