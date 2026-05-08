# CoolifyStarter Documentation

Welcome to the documentation for CoolifyStarter. This project is a highly optimized, production-ready React application template designed specifically for seamless deployment on self-hosted Coolify instances.

## Table of Contents

- [Architecture Overview](ARCHITECTURE.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Contact Form Implementation Plan](CONTACT_FORM_PLAN.md)

## Key Features

- **React 19 & Vite:** Lightning fast development and optimized production builds.
- **Tailwind CSS v4:** Utility-first styling with minimal CSS bundle sizes.
- **Coolify Ready:** Pre-configured Dockerfile and NGINX configurations.
- **Performance Optimized:** Single CSS/JS bundle configuration, caching headers, and DNS prefetching.
- **Accessible & SEO Friendly:** Semantic HTML, high contrast colors, React Helmet for meta tags, and robots.txt/sitemap included.
- **Fully Responsive:** Mobile-first design that scales perfectly to desktop.

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
