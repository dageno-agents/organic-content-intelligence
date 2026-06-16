# SEO Content Funnel

An open-source content diagnostics framework for understanding whether search traffic is actually being captured by content pages.

SEO Content Funnel connects Search Console, GA4-style page behavior, query intent clusters, content coverage, data quality checks, and optional AI/GEO signals into one practical workflow:

1. Find high-risk content pages.
2. Understand which search intents they attract.
3. Diagnose where the content fails to answer that intent.
4. Separate page-level conversion weakness from query-level evidence.
5. Generate an optimization task draft only when data quality is good enough.

This project is intentionally generic. It does not include any private customer data, proprietary scoring weights, internal prompts, or hosted Dageno workflows.

## What It Helps You Answer

- Which pages are losing search visibility?
- Which pages get impressions but fail to convert or engage?
- Which query clusters have demand but poor content coverage?
- Which articles may be stale because product facts, pricing, screenshots, or FAQs changed?
- Which pages show AI referral or crawler activity?
- Which search intents are covered well across the entire content library?

## Core Concepts

### Page Funnel

A page-level view that combines:

- GSC metrics: impressions, clicks, CTR, Position
- GA4-style metrics: organic sessions, engagement rate, CTA clicks, key events
- Content diagnostics: query clusters, content coverage, stale content signals
- Data quality: whether the system can safely recommend action

### Query Cluster

A group of search queries with similar intent. Query clusters explain what users are trying to do, but they do not provide exact conversion attribution.

### GA4 Page Performance

GA4 data is treated as page-level performance only. The framework does not claim that a specific query cluster directly caused a conversion.

### Data Quality

Every recommendation reads from a shared object:

```json
{
  "quality_grade": "High",
  "reason_codes": []
}
```

Recommended action logic:

| Grade | UI Action |
| --- | --- |
| High | Generate task draft |
| Medium | Needs verification |
| Low | Diagnostics only |
| Invalid | No judgment |

## Open-Core Friendly Boundary

Recommended open-source scope:

- Frontend dashboard
- Mock data and schemas
- GSC / GA4 adapter interfaces
- URL normalization
- Data quality framework
- Basic scoring formula examples
- Query cluster and intent overview data model

Recommended closed or hosted scope:

- Customer data
- Proprietary scoring weights
- Internal LLM prompts
- Brand knowledge base content
- Team workflow, approval, and publishing automation
- Hosted sync infrastructure

## Quick Start

This demo has no build step and no external dependencies.

```bash
cd outputs/seo-content-funnel
npm run dev
```

Then open:

```text
http://localhost:4173/public/
```

You can also run a fixture check:

```bash
npm run check
```

## Project Structure

```text
seo-content-funnel/
  README.md
  LICENSE
  CONTRIBUTING.md
  package.json
  public/
    index.html
  src/
    app.js
    styles.css
    mock-data.js
    scoring.js
    url-normalize.js
  schemas/
    data-quality.schema.json
    page-funnel.schema.json
  docs/
    data-api-spec.md
    architecture.md
    roadmap.md
  examples/
    gsc-request.json
    ga4-run-report-request.json
  scripts/
    validate-fixtures.mjs
```

## API Alignment

This project is designed around:

- Google Search Console Search Analytics API
- Google Analytics Data API `properties.runReport`
- Server or edge logs for AI crawler activity
- Optional brand knowledge base imports

See [docs/data-api-spec.md](docs/data-api-spec.md).

## License

MIT
