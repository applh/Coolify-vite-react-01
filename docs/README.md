# CoolifyStarter Documentation

Welcome to the documentation for CoolifyStarter. This project is a highly optimized, production-ready React application template designed specifically for seamless deployment on self-hosted Coolify instances.

## Table of Contents

- [Feature Overview](FEATURES.md)
- [Architecture Overview](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Managing Data Persistence](PERSISTENCE.md)
- [Troubleshooting Guide](TROUBLESHOOTING.md)
- [Contact Form Implementation Plan](CONTACT_FORM_PLAN.md)

## Key Features

- **Full-Stack Node.js Architecture:** Express backend with a React SPA frontend.
- **Secure Admin Dashboard:** Passkey and JWT-based authentication `/admin` area.
- **Contact Form with SMTP:** Validated form that emails administrators and locally persists messages.
- **React 19 & Vite:** Lightning fast development and optimized production builds.
- **Tailwind CSS v4:** Utility-first styling with high-contrast accessibility.
- **Coolify Ready:** Nixpacks and Dockerfile deployment options out-of-the-box.

## Quick Start

1. **Clone & Install:**
   ```bash
   git clone <your-repo>
   cd <your-repo>
   npm install
   ```

2. **Configure Environment:**
   Copy `.env.example` to `.env` and fill in your details:
   - `ADMIN_PASSKEY`: Used to access the admin panel.
   - `JWT_SECRET`: For signing auth tokens.
   - `SMTP_*`: Required for email notifications.

3. **Core Requirements:**
   - **Node.js:** 23.x or higher is recommended for the best experience with Vite 6 and React 19 features.
   - **Persistence:** Ensure `/app/data` is mounted to a volume in production to prevent data loss.

## Folder Structure

- `/src`: Contains the main application source code.
  - `/components`: Reusable UI components.
  - `/pages`: Route-level components.
- `/public`: Static assets served directly (e.g., robots.txt, sitemap.xml).
- `/docs`: Project documentation.
