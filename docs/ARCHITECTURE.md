# Architecture Overview

CoolifyStarter is built using a modern, fast, and scalable frontend stack.

## Frontend Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (`motion/react`)
- **Icons:** Lucide React
- **SEO Elements:** React Helmet Async (`react-helmet-async`)

## Backend Stack (Express)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Persistence:** Local JSON File Storage (`/data/submissions.json`)
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

The `nginx.conf` is pre-configured with several security headers:
- `X-Frame-Options`
- `X-XSS-Protection`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Content-Security-Policy`

These headers protect the application against common web vulnerabilities.
