# Troubleshooting Guide

This document outlines common issues encountered when deploying or developing CoolifyStarter and their solutions.

## Deployment Issues

### Coolify Nixpacks: Vite Node.js Version Error
**Error message:**
`You are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.`

**Cause:** 
Modern versions of Vite enforce strict Node.js version requirements that may not align with the default minor versions provided by the `NIXPACKS_NODE_VERSION` environment variable in some Coolify environments. Furthermore, some underlying dependencies (like `rolldown`) may fail to compile native bindings if the environment doesn't meet the version requirements.

**Solution:**
1. Explicitly drop your Vite version in `package.json` back to a compatible version (e.g., `^6.2.3`) instead of allowing unconstrained major upgrades.
2. If using Nixpacks, set the environment variable in Coolify to a specifically accepted version: `NIXPACKS_NODE_VERSION=23`.
3. If using the Dockerfile, ensure the build stage uses a modern Node version (e.g., `FROM node:23-alpine AS builder`). (This project has been pre-configured with this fix).

### Local Storage Not Persisting
**Issue:**
Contact form submissions or other local files disappear after pushing new code or restarting the container.

**Cause:**
Ephemeral Docker containers wipe the filesystem on rebuild unless a Persistent Volume is mounted.

**Solution:**
Follow the steps in the [Managing Data Persistence](PERSISTENCE.md) guide to map the `/app/data` folder to a Persistent Volume in your Coolify dashboard.

### "npm ci" Fails With Lockfile Mismatch
**Issue:**
Deployment fails on the `npm ci` build step with errors like `Invalid: lock file's vite@8.0.11 does not satisfy vite@6.4.2`.

**Cause:**
`npm ci` requires the `package-lock.json` to exactly match `package.json`.

**Solution:**
Delete `package-lock.json` locally and run `npm install` to regenerate it, then commit and push.

### Startup Error: "PathError: Missing parameter name"
**Issue:**
The application crashes on startup with `PathError [TypeError]: Missing parameter name at index 1: *`.

**Cause:**
This is caused by a breaking change in `path-to-regexp` (used by Express 5). Modern versions require wildcard paths to be named (e.g., `*all` instead of `*`).

**Solution:**
In `server.ts`, the catch-all route has been updated to `app.get('*all', ...)`. If you add new catch-all routes, ensure they use the `*all` syntax.

### Server returned invalid response (Status 405 / Empty body)
**Issue:**
Submitting the contact form fails with a "405 Method Not Allowed" or an "Unexpected end of JSON input" error.

**Cause:**
Coolify/Nixpacks might be misdetecting the app as a "static site" because of the `index.html` file in the root. This results in the app being served by a lightweight web server (like Nginx) that doesn't support POST requests to the `/api` routes, instead of running the Node.js Express server.

**Solution:**
1. **Add `nixpacks.toml`:** Ensure there is a `nixpacks.toml` file in the root of your project with the following content to force the Node provider:
   ```toml
   providers = ["node"]

   [start]
   cmd = "npm run start"
   ```
2. **Build Pack:** In Coolify, ensure your "Build Pack" is set to "Nixpacks" or "Dockerfile".
3. **Check Logs:** Verify that your container logs show `Server running on http://0.0.0.0:3000`. If you see Nginx logs instead, the app is being served as static.

### "Unexpected end of JSON input" on Local Dev
**Issue:**
When running `npm run dev`, the contact form fails with this error.

**Cause:**
You might be accessing the frontend on a port that isn't proxying API requests to the backend, or the backend server (the one running `tsx server.ts`) isn't running simultaneously.

**Solution:**
Always use `npm run dev` as configured in `package.json`, which runs the Express server. The Express server then integrates Vite as middleware, ensuring both the frontend and the API are available on the same port (default 3000).

## Application Issues

### Contact Form Emails Not Sending
**Issue:**
The contact form submits successfully (showing a green check and success message), but no email arrives in your inbox.

**Cause:**
The application is designed to succeed gracefully if SMTP is not configured by falling back to local storage only.

**Solution:**
- Verify that `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` are correctly set in your Coolify Environment Variables.
- Check the deployment logs in Coolify. If SMTP is misconfigured, you will see an error logged to the console: `"Failed to send email notification"`.
- Note: Many email providers (like Gmail or Outlook) require you to generate an App-Specific Password rather than using your primary login password for SMTP.

### Admin Login Rejected
**Issue:**
You are unable to log into the `/admin` dashboard ("Invalid passkey").

**Cause:**
The passkey entered does not match the server's running configuration, or the JWT secret is entirely missing.

**Solution:**
- Ensure both `ADMIN_PASSKEY` and `JWT_SECRET` are correctly configured in the Environment Variables tab of your Coolify project.
- **CRITIAL:** After updating or adding environment variables in Coolify, you **must restart or redeploy** the application for the backend Node.js process to pick up the changes.
