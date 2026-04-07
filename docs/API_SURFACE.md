# API Surface

## Current Endpoints

### `GET /`
Returns the landing page.

### `GET /dashboard.html`
Returns the interactive MVP dashboard.

### `GET /health`
Returns a simple JSON health check.

Example response:

```json
{
  "status": "ok",
  "app": "PulsePath AI"
}
```

## Static Assets

The server also exposes files inside `public/`, including:

- `styles.css`
- `app.js`
- `dashboard.js`
- `sample-patients.csv`

## Future API Direction

In a production version, the next backend endpoints would likely include:

- `POST /patients/import`
- `GET /patients`
- `GET /care-gaps`
- `POST /outreach/send`
- `POST /bookings`
- `GET /analytics/summary`
