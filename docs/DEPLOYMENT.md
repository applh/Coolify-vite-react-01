# Deployment Guide

CoolifyStarter is designed to be deployed on Coolify. Depending on your needs, you can deploy it as a static front-end or as a full-stack Node.js application.

## Application Setup

1. Push this repository to your GitHub account (or GitLab/Bitbucket).
2. In your Coolify dashboard, go to **Projects** -> **Add New Resource**.
3. Select **Public repository** or **Private repository** depending on your setup.
4. Enter your Git URL and branch.

## Recommended Deployment (Full-Stack Docker)

This is the default configuration. The root `Dockerfile` uses a multi-stage build to compile the React assets and then a Node.js runner to serve them via Express.

1. **Build Pack:** Set to **Docker** in Coolify.
2. **Internal Port:** Set to `3000`.
3. **Environment:** Ensure `NODE_ENV=production` is set.
4. **Node Version:** The build uses Node 23-alpine. If deploying on a server with limited Node versions, ensure compatibility.

### Benefits of Docker Runner
- **API Support:** All `/api/*` routes for the contact form and admin dashboard work out of the box.
- **Persistence:** Local JSON files in `/app/data` can easily be mapped to Persistent Volumes.
- **Unified Logic:** No separate NGINX configuration is required for routing.

## Alternative Deployment (Static NGINX)

If you only need the frontend and plan to use an external API (or no API at all), you can modify the `Dockerfile` back to an NGINX-only runner or use Nixpacks.

> [!WARNING]
> If you use a static NGINX deployment, the contact form backend and admin dashboard will NOT work unless you point the frontend API calls to a separate backend instance.

1. Modify `Dockerfile` to end with `FROM nginx:alpine`.
2. Set internal port to `80`.
3. Use `nginx.conf` for SPA routing.

## Deployment via Nixpacks

Nixpacks is an excellent alternative that automatically detects your project type.

1. **Build Pack:** Set to **Nixpacks** in Coolify.
2. **Settings:** Set `NIXPACKS_NODE_VERSION=23`.
3. **Port:** Set to `3000`.

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