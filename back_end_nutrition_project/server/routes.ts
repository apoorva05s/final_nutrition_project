import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { hashPassword, comparePassword, generateToken } from "./auth";
import { authenticateToken, type AuthRequest } from "./middleware";
import { insertUserSchema, insertPantryItemSchema, updatePantryItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
      }

      const { username, password } = result.data;

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
      });

      const token = generateToken(user);

      res.status(201).json({
        user: { id: user.id, username: user.username },
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const { username, password } = result.data;

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user);

      res.json({
        user: { id: user.id, username: user.username },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await storage.getUser(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ id: user.id, username: user.username });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Pantry routes
  app.get("/api/pantry", authenticateToken, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const items = await storage.getPantryItems(req.userId);
      res.json(items);
    } catch (error) {
      console.error("Get pantry items error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/pantry", authenticateToken, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const result = insertPantryItemSchema.safeParse({
        ...req.body,
        userId: req.userId,
      });

      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
      }

      const item = await storage.createPantryItem(result.data);
      res.status(201).json(item);
    } catch (error) {
      console.error("Create pantry item error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/pantry/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;
      const result = updatePantryItemSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
      }

      const updatedItem = await storage.updatePantryItem(id, req.userId, result.data);
      if (!updatedItem) {
        return res.status(404).json({ message: "Pantry item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      console.error("Update pantry item error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/pantry/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { id } = req.params;
      const deleted = await storage.deletePantryItem(id, req.userId);

      if (!deleted) {
        return res.status(404).json({ message: "Pantry item not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Delete pantry item error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
