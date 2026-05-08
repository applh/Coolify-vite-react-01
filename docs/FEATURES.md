# Feature Overview

CoolifyStarter has evolved from a static frontend template into a robust, full-stack application capable of securely capturing user data, sending notifications, and providing administration tools out of the box.

## 1. Full-Stack Foundation
- **Frontend Stack:** Built with React 19, Vite, and Tailwind CSS v4 for a lightning-fast developer experience.
- **Backend Stack:** Includes an integrated Express.js server. During development, it acts as middleware with Vite for hot-reloading. In production, it statically serves the UI while seamlessly handling backend API endpoints.
- **Single-Bundle Optimization:** Configured to compile JavaScript and CSS into single, optimized files to minimize HTTP requests and speed up Time to Interactive (TTI).

## 2. Secure Contact & Notification System
- **Local Data Persistence:** The contact form POSTs data to the Express backend where it is safely stored in a local `data/submissions.json` file. This prevents dependency on external database services.
- **SMTP Email Integration:** Utilizing `nodemailer`, the backend automatically dispatches email notifications to site owners securely using environment-protected SMTP credentials (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`).
- **Fail-Safe Processing:** If SMTP is misconfigured or fails, the submission is still logged securely to the local persistent file system.

## 3. Protected Admin Environment
- **Passkey Authentication:** Secures the `/admin` path using a highly secure, passwordless-style environmental `ADMIN_PASSKEY`. No database is needed for user provisioning.
- **JWT Authorization:** Upon successful login, a JSON Web Token (signed with a securely injected `JWT_SECRET`) is issued and stored in `localStorage` for stateless, secure session retention.
- **Submission Management:** The admin dashboard reads from the locally persisted JSON file, allowing site owners to view contact messages with timestamps and securely delete old messages.

## 4. UI/UX & Accessibility
- **Accessible Color Palette:** High-contrast text colors (`#c084fc` on dark backgrounds) improve readability and meet strict web accessibility standards.
- **Fluid Animations:** Interface transitions and list entrances are powered by `motion/react` for a polished feel.
- **SEO Ready:** Integration with `react-helmet-async` for managing complex document headers, canonical URLs, and Open Graph meta-tags.

## 5. Planned Dynamic Features
- **SQLite Database:** Replacing JSON files with a relational database for high-concurrency and complex querying.
- **Cron Task Management:** Integrated job scheduling for automated tasks like backups, report generation, or data cleanup.
- **Advanced Dashboard:** Expanded analytics and system health monitoring in the Admin area.
