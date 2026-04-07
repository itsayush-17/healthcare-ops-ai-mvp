# Technical Architecture

## Overview

PulsePath AI is a zero-dependency Node.js web application designed for fast local demos and hackathon reliability.

## Runtime

- Frontend: static HTML, CSS, and vanilla JavaScript
- Server: Node.js HTTP server
- Storage: in-memory browser state for demo interactions
- Data input: local CSV upload

## Architecture

1. `server.js` serves static assets from `public/`
2. `public/index.html` presents the landing page and commercial narrative
3. `public/dashboard.html` hosts the interactive MVP workspace
4. `public/dashboard.js` manages patient queue logic, outreach generation, inbox updates, and CSV import
5. `public/styles.css` provides the shared design system

## Request Flow

1. Browser requests `/`
2. Node server resolves the asset path and returns the static file
3. Dashboard JavaScript loads demo data into in-memory state
4. User actions update the queue, inbox, and analytics live in the browser

## Technical Rationale

- No external dependencies reduces install risk during judging
- Static assets keep the demo portable
- In-memory state makes the interaction fast and predictable
- CSV import creates a realistic path for synthetic EHR-style demos

## Current Limitations

- No persistent database
- No authentication
- No real messaging integration
- No EHR integration
- No backend analytics store

## Production Upgrade Path

- Replace in-memory state with a database-backed API
- Add role-based authentication
- Introduce audit logging for outreach actions
- Integrate scheduling, CRM, or EHR connectors
- Move prioritization into configurable backend services
