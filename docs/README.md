# CoolifyStarter Documentation

Welcome to the documentation for CoolifyStarter. This project is a highly optimized, production-ready React application template designed specifically for seamless deployment on self-hosted Coolify instances.

## Table of Contents

- [Feature Overview](FEATURES.md)
- [Architecture Overview](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Managing Data Persistence](PERSISTENCE.md)
- [Contact Form Implementation Plan](CONTACT_FORM_PLAN.md)

## Key Features

- **Full-Stack Node.js Architecture:** Express backend with a React SPA frontend.
- **Secure Admin Dashboard:** Passkey and JWT-based authentication `/admin` area.
- **Contact Form with SMTP:** Validated form that emails administrators and locally persists messages.
- **React 19 & Vite:** Lightning fast development and optimized production builds.
- **Tailwind CSS v4:** Utility-first styling with high-contrast accessibility.
- **Coolify Ready:** Nixpacks and Dockerfile deployment options out-of-the-box.

## Local Development

To get started with local development:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Folder Structure

- `/src`: Contains the main application source code.
  - `/components`: Reusable UI components.
  - `/pages`: Route-level components.
- `/public`: Static assets served directly (e.g., robots.txt, sitemap.xml).
- `/docs`: Project documentation.
