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
