import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken";
import db from "./src/lib/db.js"; // Note: .js extension for ESM if running directly via tsx, or just "./src/lib/db"
import cron from "node-cron";

// ESM Support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  // --- MIGRATION: JSON to SQLite ---
  const submissionsFile = path.join(dataDir, 'submissions.json');
  try {
    const stats = await fs.stat(submissionsFile);
    if (stats.isFile()) {
      console.log("Found legacy submissions.json, migrating to SQLite...");
      const data = await fs.readFile(submissionsFile, 'utf-8');
      const legacySubmissions = JSON.parse(data);
      
      const insert = db.prepare('INSERT OR IGNORE INTO submissions (id, timestamp, firstName, lastName, email, message) VALUES (?, ?, ?, ?, ?, ?)');
      const migrationTransaction = db.transaction((subs) => {
        for (const sub of subs) {
          insert.run(sub.id, sub.timestamp, sub.firstName, sub.lastName, sub.email, sub.message);
        }
      });
      
      migrationTransaction(legacySubmissions);
      console.log(`Migrated ${legacySubmissions.length} records.`);
      
      // Rename to backup
      await fs.rename(submissionsFile, path.join(dataDir, 'submissions.json.bak'));
      console.log("Legacy file backed up to submissions.json.bak");
    }
  } catch (e) {
    // No legacy file found, which is fine
  }

  // --- CRON JOBS ---
  // Heartbeat every hour
  cron.schedule('0 * * * *', () => {
    const timestamp = new Date().toISOString();
    db.prepare('INSERT INTO system_logs (timestamp, event, details) VALUES (?, ?, ?)')
      .run(timestamp, 'HEARTBEAT', 'System is healthy');
    console.log(`[CRON] Heartbeat logged at ${timestamp}`);
  });

  // Daily cleanup (example: delete logs older than 30 days)
  cron.schedule('0 0 * * *', () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const result = db.prepare('DELETE FROM system_logs WHERE timestamp < ?').run(thirtyDaysAgo.toISOString());
    console.log(`[CRON] Daily cleanup: Deleted ${result.changes} old log entries.`);
  });

  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;
      
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const id = Date.now().toString();
      const timestamp = new Date().toISOString();

      // SQL Insert
      const stmt = db.prepare('INSERT INTO submissions (id, timestamp, firstName, lastName, email, message) VALUES (?, ?, ?, ?, ?, ?)');
      stmt.run(id, timestamp, firstName, lastName, email, message);

      // Send Email via SMTP if configured
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_PORT === '465',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: `"Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to self or admin email
            subject: `New Contact from ${firstName} ${lastName}`,
            text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
          });
          console.log("Email notification sent successfully.");
        } catch (emailError) {
          console.error("Failed to send email notification:", emailError);
          // We don't throw here to ensure the user still gets a success response, 
          // as the submission was successfully saved locally.
        }
      } else {
        console.log("SMTP not fully configured (missing host, user, or pass). Skipping email notification. Submission saved locally.");
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin Login
  app.post("/api/admin/login", (req, res) => {
    const { passkey } = req.body;
    if (!process.env.ADMIN_PASSKEY || !process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Admin passkey or JWT secret not configured on server" });
    }

    if (passkey === process.env.ADMIN_PASSKEY) {
      const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token, success: true });
    } else {
      res.status(401).json({ error: "Invalid passkey" });
    }
  });

  // Admin Middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "JWT secret not configured" });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid or expired token" });
    }
  };

  // Get Submissions
  app.get("/api/admin/submissions", requireAdmin, async (req, res) => {
    try {
      const submissions = db.prepare('SELECT * FROM submissions ORDER BY timestamp DESC').all();
      res.json(submissions);
    } catch (e) {
      res.status(500).json({ error: "Error fetching submissions" });
    }
  });

  // Delete Submission
  app.delete("/api/admin/submissions/:id", requireAdmin, async (req, res) => {
    try {
      const stmt = db.prepare('DELETE FROM submissions WHERE id = ?');
      const result = stmt.run(req.params.id);
      
      if (result.changes > 0) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Submission not found" });
      }
    } catch (e) {
      res.status(500).json({ error: "Error deleting submission" });
    }
  });

  // Get Health Stats
  app.get("/api/admin/health", requireAdmin, async (req, res) => {
    try {
      const submissionCount = db.prepare('SELECT count(*) as count FROM submissions').get() as { count: number };
      const logCount = db.prepare('SELECT count(*) as count FROM system_logs').get() as { count: number };
      const lastLogs = db.prepare('SELECT * FROM system_logs ORDER BY timestamp DESC LIMIT 5').all();
      
      res.json({
        database: 'SQLite',
        submissions: submissionCount.count,
        logs: logCount.count,
        lastLogs
      });
    } catch (e) {
      res.status(500).json({ error: "Error fetching health stats" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Determine path based on dist folder locations
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));

    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
