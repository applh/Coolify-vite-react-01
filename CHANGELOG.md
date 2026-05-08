# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-05-08

### Fixed
- **Contact Form**: Resolved "Unexpected end of JSON input" and "405 Method Not Allowed" errors by ensuring the backend correctly handles POST requests and Express 5 wildcard syntax (`*all`).
- **Deployment**: Added `nixpacks.toml` to force Node.js detection and prevent misidentification as a static site in Coolify/Nixpacks.
- **Server**: Updated Express catch-all route to be compatible with `path-to-regexp` v10 (used in Express 5).

### Added
- **Full-Stack Support**: Integrated Express backend with Vite middleware for a seamless dev and production experience.
- **Documentation**: Added comprehensive troubleshooting guides for deployment and common runtime issues.
