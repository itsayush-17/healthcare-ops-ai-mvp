# Test Plan

## Automated Checks

Run:

```bash
npm run validate
```

This validation script checks:

- required project files exist
- JavaScript syntax is valid
- the local server starts
- the landing page loads
- the dashboard loads
- the health endpoint responds

## Manual QA

1. Start the app with `npm start`
2. Open `http://localhost:3000`
3. Confirm landing page sections render correctly
4. Open the dashboard
5. Click different patients in the queue
6. Confirm outreach drafts change with patient context
7. Click `Approve and Send`
8. Confirm inbox updates
9. Click `Mark as Booked`
10. Confirm queue and revenue metrics update
11. Upload `public/sample-patients.csv`
12. Confirm imported patients replace demo data

## Known Gaps

- No unit test framework
- No visual regression testing
- No browser automation
- No accessibility audit yet

## Recommended Next Tests

- Add CSV parsing edge case tests
- Add accessibility review
- Add interaction tests with Playwright or Cypress
- Add smoke tests for production deployment
