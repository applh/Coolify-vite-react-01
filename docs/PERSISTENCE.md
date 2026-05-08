# Managing Data Persistence in Coolify

When deploying full-stack applications on Coolify, it's crucial to understand that Docker containers are ephemeral. If your application restarts, is redeployed, or if the server reboots, any data written to the container's isolated file system will be permanently lost.

To prevent data loss for local database files (like SQLite) or JSON storage files (like our Contact Form submissions), you must configure **Persistent Volumes** in Coolify.

## What is a Persistent Volume?

A Persistent Volume maps a directory on your actual host server (where Coolify is installed) to a directory inside the Docker container running your application. 

When your Node.js application writes a file to the mounted directory inside the container, Docker immediately writes that file to the host machine. When the container restarts, Coolify securely remounts the host directory, ensuring the data remains exactly as you left it.

## Setting Up Persistent Volumes in Coolify

Follow these steps to configure persistent storage for your project:

### 1. Identify the Container Path
First, you need to know where your application expects to read and write its data. 
In the CoolifyStarter full-stack template, the data directory is configured to be:
`/app/data`

*(Note: If you use a custom path in `server.ts`, make sure the paths match).*

### 2. Configure the Volume in the Coolify Dashboard
1. Go to your Coolify Dashboard.
2. Select your Project and Environment.
3. Open the **Resource/Application** you want to configure.
4. Navigate to the **Storages** tab.
5. Setup a new volume by providing the required information:
   - **Name:** Pick a recognizable name (e.g., `coolify-starter-data`).
   - **Container Path:** The path inside the container: `/app/data`
   - **Host Path:** (Optional) Leave this empty to let Coolify automatically manage the host path via a Named Volume (Recommended). If you want to store files in a specific directory on your server, enter the absolute path here (e.g., `/opt/coolify-data/my-app/data`).

### 3. Deploy/Restart
After configuring the persistent volume:
1. Save the Storage settings.
2. Restart your application container from the Coolify dashboard or trigger a new deployment.
3. The application will now read and write its persistent data to the mounted volume safely.

## Validating Persistence

To test that your persistence is working:
1. Submit a Contact Form through the web interface (this writes a JSON entry to `data/submissions.json`).
2. Go to the Coolify dashboard and manually **Restart** your application.
3. Access your server or use an API to check if the submissions are still intact. If they are, your volume is configured correctly!

## Important Considerations

- **Permissions:** If you specify a custom Host Path, ensure that the Docker daemon and the user running inside the container have read/write access to that host location.
- **Backups:** Having a Persistent Volume mitigates temporary container deletion, but you are still responsible for backing up the underlying data on your host server. You can use Coolify's built-in backup tools (primarily designed for managed databases, but scriptable for volumes) or an external server backup service.
- **Nixpacks Configurations:** By default, Nixpacks sets the application's working directory to `/app`. Ensure your relative server paths map safely to the container path configured in Coolify.
