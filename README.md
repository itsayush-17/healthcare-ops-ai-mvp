# PulsePath AI

PulsePath AI is a healthcare operations MVP that helps outpatient clinics detect care gaps, prioritize patient follow-ups, approve outreach, and track bookings from a single dashboard.

## Why this idea

The product is designed around a commercially strong healthcare AI wedge:

- Narrow buyer: outpatient clinics and care management teams
- Clear ROI: recover missed visits, reduce coordinator time, surface revenue at risk
- Safer scope: workflow automation instead of diagnosis
- Expansion path: chronic care, post-discharge, preventive screenings, refill programs

## What's included

- Marketing landing page
- Interactive MVP dashboard
- Demo patient panel with care-gap prioritization
- AI-style outreach drafts for SMS, WhatsApp, and voice
- Inbox simulation and booking conversion flow
- Pricing narrative and commercial positioning
- Demo script and submission support docs
- Pitch deck copy and judges FAQ
- Submission email draft and resume template
- Technical architecture, data model, API, testing, and roadmap docs

## Run locally

```bash
npm start
```

Or on Windows:

```bash
run.bat
```

Then open [http://localhost:3000](http://localhost:3000).

A ready-to-demo upload file is available at `public/sample-patients.csv`.

## Validate the project

```bash
npm run validate
```

This checks required files, JavaScript syntax, server startup, the landing page, the dashboard, and the `/health` endpoint.

## CSV import format

The dashboard accepts CSV uploads with these headers:

```csv
name,age,condition,segment,riskScore,overdueDays,gapType,preferredChannel,lastVisit,dischargeDate,annualScreeningDue,revenueAtRisk,coordinator,insurance,language
```

Example segment values:

- `diabetes`
- `discharge`
- `primary-care`

## Hackathon narrative

PulsePath AI is positioned as:

- A care-gap intelligence layer for clinics
- A workflow product with human approval before outreach
- A software business with subscription pricing and expansion potential

## Technical docs

- `docs/TECHNICAL_ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/API_SURFACE.md`
- `docs/ENGINEERING_DECISIONS.md`
- `docs/TEST_PLAN.md`
- `docs/IMPLEMENTATION_ROADMAP.md`

## Project structure

- `server.js` - zero-dependency static server and health endpoint
- `scripts/validate.js` - validation script
- `run.bat` - Windows launcher
- `public/index.html` - landing page
- `public/dashboard.html` - interactive MVP
- `public/styles.css` - shared visual system
- `public/dashboard.js` - queue, inbox, analytics, and CSV logic
- `docs/` - pitch, product, and technical materials
