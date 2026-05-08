# Implementation Plan: Dynamic Features

This plan outlines the steps required to transition CoolifyStarter from static JSON storage to a relational SQLite database and to introduce an integrated Cron management system for automated tasks.

## Phase 1: SQLite Persistence Integration

Currently, the application uses `/data/submissions.json` for storage. Moving to SQLite will provide better concurrency, reliability, and querying capabilities.

### Steps:
1.  **Install Dependencies:**
    *   `better-sqlite3` for performance or `sqlite3` for standard Node.js support.
    *   `drizzle-orm` or `prisma` (optional but recommended for type safety).
2.  **Schema Definition:**
    *   Initialize a `database.sqlite` file in the `/data` directory.
    *   Create tables: `submissions`, `settings`, `audit_logs`.
3.  **Migration Script:**
    *   Build a one-time migration utility in `server.ts` that reads the existing `submissions.json` and imports data into the `submissions` table.
4.  **Refactor Server Routes:**
    *   Update `POST /api/contact` to insert into SQLite.
    *   Update `GET /api/admin/submissions` to query SQLite with optional search/filtering.
    *   Update `DELETE /api/admin/submissions/:id` to use SQL delete commands.

---

## Phase 2: Cron Management System

Integrated scheduling allows the application to handle background tasks without relying on external triggers.

### Steps:
1.  **Install Library:**
    *   `node-cron` for standard cron syntax.
2.  **Define Tasks:**
    *   **Data Backups:** Export SQLite database to a ZIP file every 24 hours.
    *   **Cleanup:** Delete submissions older than 90 days.
    *   **Health Checks:** Log system performance metrics every hour.
3.  **Admin UI Integration:**
    *   Add a "Tasks" tab to the Admin Dashboard.
    *   Display the status and next run time for all registered cron jobs.
    *   (Optional) Add buttons to triggered tasks manually for debugging.

---

## Phase 3: Advanced Admin Capabilities

1.  **Dashboard Analytics:**
    *   Visualize submission trends using charts (e.g., messages per day).
2.  **System Logs:**
    *   Record admin logins and deletions in an `audit_logs` table.
3.  **Dynamic Configuration:**
    *   Allow updating site settings (e.g., maintenance mode, notification emails) directly from the dashboard, saved in the `settings` table in SQLite.

---

## Summary of Changes
| Feature | Old Method | New Method | Benefit |
| :--- | :--- | :--- | :--- |
| **Storage** | `json` files | `sqlite` | Scalability & Data Integrity |
| **Scheduling** | None | `node-cron` | Automation |
| **Management** | Manual edits | Web Dashboard | Accessibility & Speed |

---

## Phase 4: Visit Analytics & Robot Tracking

This system provides internal insights into how users and automated crawlers (robots) interact with your application without relying on third-party scripts (like Google Analytics).

### Core Features:
- **Middleware Tracking:** Intercept every request to log path, user-agent, and IP hash (for privacy).
- **Robot Identification:** Detect common bots (Googlebot, Bingbot, GPTBot, etc.) via User-Agent strings.
- **Admin Toggle:** Enable/Disable analytics collection globally from the Admin Dashboard.
- **Performance Optimization:** Use a "Batch Write" strategy or debounced increments in SQLite to minimize Disk I/O.

### Steps:
1.  **Database Extension:**
    *   Add `page_views` table: `id, path, is_robot, user_agent, timestamp`.
    *   Add `analytics_config` table or a key in `settings` for the "Disabled" toggle.
2.  **Middleware Logic (`server.ts`):**
    ```typescript
    const analyticsMiddleware = (req, res, next) => {
      if (settings.get('analytics_enabled') !== 'true') return next();
      
      const ua = req.headers['user-agent'] || '';
      const isRobot = /bot|crawler|spider|slurp|search/i.test(ua);
      
      // Log to SQLite (async, don't block response)
      db.prepare('INSERT INTO page_views ...').run(...);
      next();
    };
    ```
3.  **Admin UI Integration:**
    *   **Analytics Tab:** Show cards for "Total Visits," "Top Pages," and "Robot Activity %."
    *   **Controls:** A Toggle Switch (Radix UI / shadcn style) to kill the middleware storage logic.

### Modularity & Security:
- **Privacy:** IPs will be hashed with a salt (stored in `.env`) before being saved to ensure GDPR/CCPA compliance.
- **Modularity:** Analytics logic will reside in `src/services/analyticsService.ts` to keep `server.ts` clean.
- **Security:** Analytics data is restricted to the `requireAdmin` middleware, ensuring only authenticated managers see traffic patterns.

