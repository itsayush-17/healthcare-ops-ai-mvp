# Engineering Decisions

## Why Vanilla JavaScript

The project uses vanilla JavaScript instead of a framework because:

- it loads instantly
- it avoids dependency and build failures
- it is easier to inspect during a live demo
- it keeps the codebase small for hackathon delivery

## Why a Static Node Server

The Node server exists to:

- provide one-command startup
- serve all assets consistently
- allow a simple `/health` endpoint
- keep the app portable across machines

## Why Synthetic Data

Synthetic patient data allows:

- safe demos without PHI
- predictable narratives during judging
- CSV import proof without compliance issues

## Why Human-In-The-Loop Messaging

The project avoids fully autonomous patient outreach because:

- healthcare workflows need operational review
- it is easier to present as a safe MVP
- it keeps the scope aligned to workflow automation instead of clinical decision-making

## Why In-Memory State

This MVP uses browser memory for interaction state because:

- it is sufficient for demo fidelity
- it removes backend complexity
- it makes the product feel responsive during live walkthroughs
