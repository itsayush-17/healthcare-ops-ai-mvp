# Data Model

## Patient Record

The dashboard operates on a normalized patient record object with these fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | number | Unique local identifier |
| `name` | string | Patient name |
| `age` | number | Patient age |
| `condition` | string | Primary clinical context |
| `segment` | string | Workflow bucket such as `diabetes`, `discharge`, `primary-care` |
| `riskScore` | number | Priority score from 0-100 |
| `overdueDays` | number | Number of days overdue |
| `gapType` | string | Description of care gap |
| `preferredChannel` | string | Outreach channel |
| `lastVisit` | string | ISO-like date string |
| `dischargeDate` | string | Optional discharge date |
| `annualScreeningDue` | string | Optional due date |
| `revenueAtRisk` | number | Estimated revenue tied to recovery |
| `coordinator` | string | Assigned care coordinator |
| `insurance` | string | Payer or billing context |
| `language` | string | Preferred language |

## Inbox Record

| Field | Type | Description |
| --- | --- | --- |
| `patientId` | number | Linked patient identifier |
| `name` | string | Patient name |
| `status` | string | `replied` or `booked` |
| `channel` | string | Outreach channel used |
| `message` | string | Simulated response or booking note |

## Derived Metrics

The product computes:

- queue size
- high-priority patient count
- outreach sent count
- bookings count
- recovered revenue

## CSV Schema

Expected headers:

```csv
name,age,condition,segment,riskScore,overdueDays,gapType,preferredChannel,lastVisit,dischargeDate,annualScreeningDue,revenueAtRisk,coordinator,insurance,language
```

## Priority Logic

Patients are sorted using:

- risk score
- overdue days
- revenue at risk

This is a simple heuristic for the MVP and should become configurable in production.
