# AI Prompting Guide for Full-Stack Deployments

This guide provides the exact context and prompts needed to instruct an AI coding assistant (like Gemini, Claude, or GPT) to build and maintain this project, specifically optimized for **Coolify**, **Nixpacks**, and **Full-Stack Express + Vite** environments.

## The "Golden Rule" of Full-Stack Prompts

When working with an AI, the most common failure mode is the AI assuming the app is a **Client-Side Only (SPA)** app. Because `index.html` is in the root, many build systems (Nixpacks, Cloudflare, Vercel) will try to serve it as a static site, breaking your backend API.

**Always include this context in your first prompt:**
> "This is a Full-Stack application using Express as the backend and Vite for the frontend. The backend serves the frontend as middleware. Do NOT treat this as a static site."

---

## 1. Initial Project Setup Prompt

If you are starting from scratch, use this prompt to get the architecture right:

```text
Build a Full-Stack React application using:
- Vite for the frontend
- Express for the backend
- TypeScript for both
- Tailwind CSS starting from @import "tailwindcss"
- A single entry point (server.ts) that uses Vite middleware in dev and serves static files in production.

Requirements:
1. Express must run on port 3000.
2. The server must handle SPA routing (redirecting all non-API 404s to index.html).
3. Use Express 5 syntax for wildcard routes (e.g., app.get('*all', ...)).
4. Include a package.json with "dev": "tsx server.ts" and "start": "node server.ts".
```

---

## 2. Deployment Reliability (Nixpacks/Coolify)

If your deployment is failing with 405 errors (Method Not Allowed) on POST requests, it means a web server (like Caddy or Nginx) is intercepting the request before it hits Node.

**Prompt to fix deployment detection:**
```text
The deployment server is misdetecting my app as a static site and using Caddy/Nginx to serve it, resulting in 405 errors on POST requests. 

Please:
1. Create a nixpacks.toml file that explicitly sets 'providers = ["node"]'.
2. Set the start command to 'npm run start'.
3. Ensure server.ts listens on 0.0.0.0:3000.
```

---

## 3. Troubleshooting Common AI Errors

### The "PathError: Missing parameter name"
AI often writes `app.get('*', ...)` which breaks in **Express 5 / path-to-regexp v10**.

**Correction Prompt:**
```text
The server is crashing with "PathError: Missing parameter name at index 1: *". 
This is because Express 5 requires named wildcards. Please update the catch-all route in server.ts to use app.get('*all', ...).
```

### The "JSON Parse Error" (Contact Form)
If the frontend receives HTML instead of JSON (usually a 404 or 500 page from the proxy), it will crash.

**Correction Prompt:**
```text
The contact form is throwing "Unexpected end of JSON input". 
1. Update the frontend fetch logic to first get 'response.text()', then try to 'JSON.parse()'. 
2. If parsing fails, throw an error showing the raw response text so I can debug the server's output.
```

---

## 4. Tips for Success

- **Be Explicit about Port 3000**: Most AI Studio and Coolify environments default to port 3000. If the AI uses a random port or environment variable without a fallback, the preview will break.
- **Middleware Order**: Always remind the AI that **API routes must come BEFORE the Vite middleware/Static serving**.
- **Package Management**: If the AI adds a library, remind it to use `npm install` and check `package.json` to ensure it didn't accidentally downgrade `vite` or `express`.
- **Docker vs Nixpacks**: If using a custom Dockerfile, ensure the AI uses a multi-stage build that includes `npm run build` and copies both `dist` and `server.ts` to the final image.
