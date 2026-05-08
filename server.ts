import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken";

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

  // API routes
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, message } = req.body;
      
      if (!firstName || !lastName || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Save to local storage
      const submissionsFile = path.join(dataDir, 'submissions.json');
      let submissions: any[] = [];
      try {
        const data = await fs.readFile(submissionsFile, 'utf-8');
        submissions = JSON.parse(data);
      } catch (e) {
        // File doesn't exist yet or is empty
      }

      const newSubmission = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        firstName,
        lastName,
        email,
        message
      };

      submissions.push(newSubmission);
      await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));

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
    const submissionsFile = path.join(dataDir, 'submissions.json');
    try {
      const data = await fs.readFile(submissionsFile, 'utf-8');
      res.json(JSON.parse(data));
    } catch (e) {
      res.json([]);
    }
  });

  // Delete Submission
  app.delete("/api/admin/submissions/:id", requireAdmin, async (req, res) => {
    const submissionsFile = path.join(dataDir, 'submissions.json');
    try {
      const data = await fs.readFile(submissionsFile, 'utf-8');
      let submissions: any[] = JSON.parse(data);
      submissions = submissions.filter(s => s.id !== req.params.id);
      await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
      res.json({ success: true });
    } catch (e) {
      res.status(500).json({ error: "Error deleting submission" });
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

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
