# Contact Form Implementation Plan

This document outlines the implementation plan to upgrade our static frontend application into a Full-Stack Architecture (Express + Vite) to securely save contact form submissions on the server's local storage and send email notifications.

## Phase 1: Architecture Transition (Full-Stack)

**Objective:** Add an Express.js backend to manage API routes and interact with the server's file system, rather than relying solely on client-side code.

1. **Server Setup:**
   - Create a `server.ts` entry point running Express.
   - Configure Vite middleware to serve the React frontend during development and serve static files (from `dist`) in production.
   - Update `package.json` scripts (e.g., `dev` and `start`) to run the Express server.

## Phase 2: Local Server Storage Management

**Objective:** Persist contact form submissions safely on the local server storage.

1. **Storage Mechanism:**
   - Implement a lightweight local database like **SQLite** (using `better-sqlite3` or `sqlite3`) or a robust JSON-based file storage (e.g., saving to a `data/submissions.json` file).
   - *Coolify Consideration:* To prevent data loss when the container rebuilds or restarts, ensure the `/data` or database directory is mounted as a Persistent Volume in your Coolify project settings.
2. **API Endpoint (`POST /api/contact`):**
   - Create an endpoint that receives the form payload (`firstName`, `lastName`, `email`, `message`).
   - Validate the payload securely on the backend before processing.
   - Write the validated data, along with a timestamp, to the local server storage mechanism.

## Phase 3: Email Notification Integration

**Objective:** Send email notifications securely from the backend without exposing API keys to the browser.

1. **Email Service Setup:**
   - Use a backend library like `nodemailer` to connect to an SMTP server, or utilize a transactional email service SDK (like Resend, SendGrid, or Postmark).
2. **Environment Configuration:**
   - Store secure credentials in the server backend via `.env` (configured safely through Coolify's environment variables dashboard).
     ```env
     SMTP_HOST=smtp.example.com
     SMTP_PORT=587
     SMTP_USER=user@example.com
     SMTP_PASS=super_secret_password
     ```
3. **Backend Integration:**
   - Update the `POST /api/contact` endpoint to trigger the email service to alert site administrators immediately after the submission is written to local storage.

## Phase 4: Frontend Submission Logic

**Objective:** Connect the React frontend to the new backend API.

1. **UI States:**
   - Add `isSubmitting`, `isSuccess`, and `isError` status states to the form in `/src/pages/Contact.tsx`.
2. **API Integration:**
   - Replace the default form submission with a `fetch('/api/contact', ...)` POST request passing the form fields as JSON.
3. **User Feedback:**
   - Disable the submit button and show a loading spinner while waiting for the server response.
   - Clear the form fields upon a successful response and display a success banner.
   - Display a clear error notification if the backend rejects the submission or fails to connect.
