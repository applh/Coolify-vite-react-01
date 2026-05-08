# Deployment Guide

CoolifyStarter is designed to be deployed on Coolify. Depending on your needs, you can deploy it as a static front-end or as a full-stack Node.js application.

## Application Setup

1. Push this repository to your GitHub account (or GitLab/Bitbucket).
2. In your Coolify dashboard, go to **Projects** -> **Add New Resource**.
3. Select **Public repository** or **Private repository** depending on your setup.
4. Enter your Git URL and branch.

## Static Deployment (Default via Dockerfile)

For serving pure static assets, the repository includes a customized `Dockerfile`.

1. In your Coolify project configuration, set the Build Pack to **Docker**.
2. Coolify will read the `Dockerfile` present in the root.
3. The multi-stage build outputs a static NGINX image containing your compiled SPA.
4. Set the internal port to `80`.

### NGINX Capabilities

- **SPA Fallback:** Rewrites missing files to `index.html` to support client-side routing.
- **Aggressive Caching:** Static assets are cached for 1 year.
- **Gzip Compression:** Enabled for text-based assets to reduce payload size.
- **Security:** Injects strong security headers (CSP, X-Frame-Options, etc.).

## Full-Stack Deployment (Node.js via Nixpacks)

If you plan to implement API routes (like the planned backend-managed contact form), you will deploy using Express.js instead of NGINX.

1. Ensure your `package.json` has a `start` script configured (e.g., `"start": "node server.js"`).
2. In Coolify, change the Build Pack to **Nixpacks**. Coolify will automatically detect the Node.js project.
3. Ensure the exposed port in Coolify matches your Express server port (usually `3000`).

## Managing the Application in Coolify

### 1. Environment Variables
Secure credentials (like SMTP credentials for email processing) should never be committed to Git.
- Navigate to the **Environment Variables** tab of your Coolify project.
- Add your variables (e.g., `SMTP_HOST`, `SMTP_USER`).
- Once added, restarting the application will inject these into the container's `process.env`.

### 2. Persistent Volumes (For Local Storage)
When running full-stack applications that write files locally (e.g., SQLite databases or JSON storage files), you must persist the folder so data isn't lost during deployments.
- Go to the **Storages** tab in your Coolify project.
- Add a new storage volume.
- Mount the volume to a specific directory inside the container (e.g., `/app/data`).
- Update your application code to read/write from `/app/data` instead of the root directory.

### 3. Continuous Deployment
- Under the **Webhooks** section, Coolify provides an endpoint to link to your GitHub repository.
- When enabled, pushing to your main branch will automatically trigger a new zero-downtime deployment.