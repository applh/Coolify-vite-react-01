# Architecture Overview

CoolifyStarter is built using a modern, fast, and scalable full-stack project structure.

## Frontend Stack

- **Framework:** React 19
- **Build Tool:** Vite 6
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (`motion/react`)
- **Icons:** Lucide React
- **SEO Elements:** React Helmet Async (`react-helmet-async`)

## Backend Stack (Express)

- **Runtime:** Node.js 23+ (Recommended)
- **Framework:** Express.js
- **Persistence:** Local JSON File Storage (`/data/submissions.json`) &mdash; *Upgrade to SQLite is planned for robust relational data.*
- **Authentication:** Custom Passkey logic with `jsonwebtoken`
- **Mail:** `nodemailer` for SMTP integrations

## Bundling Strategy

To minimize the number of HTTP requests and improve initial load performance when served through HTTP/2 or HTTP/3, the application is configured to output a single JavaScipt file and a single CSS file.

Modifications in `vite.config.ts`:
- `cssCodeSplit: false`: Forces all CSS into a single file.
- `manualChunks: undefined`: Disables code splitting to generate fewer JS files.
- `lazy` loading of routes in `App.tsx` has been replaced with direct imports to bundle everything into a single JS file.

## Styling and Theming

The application uses Tailwind CSS. The theme configuration is defined in `/src/index.css`.
Standard variables are used for primary, accent, and base background colors to ensure consistent and easily modifiable theming.

Accessibility improvements include using `#c084fc` for primary colors on dark backgrounds for sufficient contrast ratios.

## Security

The project includes pre-configured security headers:
- **Static Deployment:** The `nginx.conf` includes headers like `CSP`, `X-Frame-Options`, and `HSTS`.
- **Full-Stack Deployment:** When running via the Node.js `Dockerfile` runner, security is handled by Express. It is recommended to add the `helmet` package for production environments.

These guards protect against common web vulnerabilities like XSS, Clickjacking, and MIME-sniffing.
