# Agent Guide

This guide is for coding agents and engineers extending the repository.

## First Read

1. `README.md`
2. `docs/page-walkthrough.md`
3. `docs/data-api-spec.md`
4. `docs/architecture.md`
5. `src/mock-data.js`

## Non-Negotiable Product Rules

### 1. Do Not Invent Query-Level Conversion Attribution

GA4 data is page-level performance.

Query clusters explain user intent and content fit. They do not prove exact conversions from a query cluster.

Use these labels only:

- `estimated`
- `directional`

### 2. Keep Data Quality Shared

All surfaces must read the same data quality object:

```json
{
  "quality_grade": "High",
  "reason_codes": []
}
```

Do not hard-code different reason codes in different tables.

### 3. Keep Query-to-Content Mapping Expandable

The Single Page Diagnosis view should show Query Cluster Evidence by default.

Query-to-Content Mapping belongs in an expanded row or drawer.

### 4. Keep AI Referrals and Crawler Logs Separate

AI referrals come from analytics.

Crawler logs come from server, edge, CDN, or firewall logs.

Do not infer crawler access from GA4.

### 5. Keep Private Data Out of the Open Core

Do not commit:

- API keys
- Customer URLs
- Customer analytics exports
- Internal prompts
- Proprietary scoring weights
- Private brand knowledge base content

## Current Demo Architecture

```text
public/index.html
  -> src/app.js
    -> src/mock-data.js
    -> src/scoring.js
    -> src/url-normalize.js
```

The demo is intentionally dependency-free. Keep it easy to run.

## Useful Commands

```bash
npm run dev
npm run check
```

## Suggested Implementation Order

1. Add schema or mock data first.
2. Update validation in `scripts/validate-fixtures.mjs`.
3. Update UI rendering.
4. Update documentation.
5. Run `npm run check`.

## Where to Add Things

| Change | File |
| --- | --- |
| New page-level fields | `src/mock-data.js`, `schemas/page-funnel.schema.json` |
| Data quality logic | `src/scoring.js`, `schemas/data-quality.schema.json` |
| URL normalization rules | `src/url-normalize.js` |
| Product behavior | `docs/page-walkthrough.md` |
| Data source contract | `docs/data-api-spec.md` |
| Architecture explanation | `docs/architecture.md` |

## Done Means

- The demo loads.
- `npm run check` passes.
- README or docs explain the change.
- New fields do not break the attribution boundary.
- No private data is added.
