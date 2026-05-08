import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

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
      if (process.env.SMTP_HOST && process.env.SMTP_USER) {
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
      } else {
        console.log("SMTP not configured. Skipping email notification. Submission saved locally.");
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ error: "Internal server error" });
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
